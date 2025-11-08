import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import collegesData from "../data/university_data_geocoded.json";

const CollegeMap = () => {
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <MapContainer center={[39.8283, -98.5795]} zoom={4}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {collegesData.map((college, idx) =>
          college.lat && college.lng ? (
            <Marker key={idx} position={[college.lat, college.lng]}>
              <Popup>
                <b>{college["School Name"]}</b><br />
                {college.City}, {college.State}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default CollegeMap;