import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CollegeMap = () => (
  <MapContainer center={[39.5, -98.35]} zoom={4} style={{ height: "100vh", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
  </MapContainer>
);

export default CollegeMap;
