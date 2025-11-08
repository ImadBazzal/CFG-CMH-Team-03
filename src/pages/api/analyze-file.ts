import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import Anthropic from "@anthropic-ai/sdk";

// Disable body parser for file uploads
export const config = {
  api: { bodyParser: false }
};

const upload = multer({ dest: "/tmp" });
const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

// Wrap multer in a promise for Next.js
const runMulter = (req: any, res: any) =>
  new Promise((resolve, reject) => {
    upload.single("file")(req, res, (err: any) =>
      err ? reject(err) : resolve(null)
    );
  });

export default async function handler(req: any, res: NextApiResponse) {
  await runMulter(req, res);

  const filePath = req.file.path;
  const fileBuffer = fs.readFileSync(filePath);

  // Extract text from PDF
  const pdfText = await pdfParse(fileBuffer);
  const text = pdfText.text;

  // Claude prompt to convert extracted text -> JSON updates
  const extractionPrompt = `
You are an AI that analyzes transcript/course audit text and returns ONLY JSON.
Detect required updates to database. Output must be an array:

[
  {"course":"CMSC131","field":"cut_credits","value":3},
  {"course":"CMSC132","field":"instructor","value":"Dr. Smith"}
]

Extract ONLY valid course changes. No natural language.

Transcript:
${text}

JSON:
  `;

  const result = await anthropic.messages.create({
    model: "claude-3.5-sonnet",
    max_tokens: 500,
    messages: [{ role: "user", content: extractionPrompt }]
  });

  let actions;
  try {
    actions = JSON.parse(result.content[0].text);
  } catch {
    return res.json({ reply: "Could not extract changes from file." });
  }

  // Build summary
  let summary = "Detected these updates:\n";
  actions.forEach((a: any) => {
    summary += `• ${a.course}: ${a.field} = ${a.value}\n`;
  });
  summary += "Confirm? (yes/no)";

  // Send summary + structured updates to frontend
  return res.json({ reply: summary, actions });
}
