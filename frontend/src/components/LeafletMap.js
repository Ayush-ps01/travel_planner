import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons path issues in CRA
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LeafletMap = ({ query, height = '300px', zoom = 12 }) => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mapStyle = useMemo(() => ({ height, width: '100%', borderRadius: '0.5rem' }), [height]);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    // Nominatim geocoding (OpenStreetMap)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    fetch(url, { headers: { 'Accept-Language': 'en' } })
      .then(r => r.json())
      .then(results => {
        if (Array.isArray(results) && results.length > 0) {
          const { lat, lon, display_name } = results[0];
          setCoords({ lat: parseFloat(lat), lng: parseFloat(lon), name: display_name });
        } else {
          setError('Location not found');
        }
      })
      .catch(() => setError('Failed to load map'))
      .finally(() => setLoading(false));
  }, [query]);

  if (!query) return null;

  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden border border-neon-teal/20">
      <div className="bg-gradient-to-r from-neon-teal/10 to-neon-purple/10 px-4 py-3 border-b border-neon-teal/20">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">Map: {query}</span>
          <span className="text-xs text-dark-300">(OpenStreetMap)</span>
        </div>
      </div>

      <div style={mapStyle}>
        {loading && (
          <div className="w-full h-full flex items-center justify-center text-dark-300">
            Loading map…
          </div>
        )}
        {error && (
          <div className="w-full h-full flex items-center justify-center text-red-400">
            {error}
          </div>
        )}
        {coords && (
          <MapContainer center={[coords.lat, coords.lng]} zoom={zoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[coords.lat, coords.lng]} icon={defaultIcon}>
              <Popup>
                {coords.name || query}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default LeafletMap;
