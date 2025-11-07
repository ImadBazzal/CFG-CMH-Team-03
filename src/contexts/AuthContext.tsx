import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import institutionsData from "@/data/institutions.json";
import usersData from "@/data/users.json";

interface Institution {
  id: number;
  name: string;
  city: string;
  state: string;
  diCode: string;
}

interface User {
  email: string;
  role: "admin" | "institution";
  institution?: Institution;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "admin" | "institution", institutionId?: number) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, role: "admin" | "institution", institutionId?: number): boolean => {
    // Accept any non-empty credentials
    if (!email.trim() || !password.trim()) {
      return false;
    }

    if (role === "admin") {
      const userData = { email, role: "admin" as const, name: "Admin User" };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/admin");
      return true;
    } else {
      if (!institutionId) return false;
      const institution = institutionsData.find((i) => i.id === institutionId);
      if (institution) {
        const userData = { email, role: "institution" as const, institution };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/institution");
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
