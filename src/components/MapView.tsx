import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Property, formatPrice } from "@/lib/mockData";

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl: undefined })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  onPropertyClick?: (id: string) => void;
  onBoundsChange?: (bounds: L.LatLngBounds) => void;
  className?: string;
  selectedId?: string;
}

const MapView = ({
  properties,
  center = [39.8283, -98.5795],
  zoom = 4,
  onPropertyClick,
  onBoundsChange,
  className = "h-[400px]",
  selectedId,
}: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    if (onBoundsChange) {
      mapRef.current.on("moveend", () => {
        if (mapRef.current) {
          onBoundsChange(mapRef.current.getBounds());
        }
      });
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    properties.forEach((p) => {
      const marker = L.marker([p.latitude, p.longitude])
        .addTo(mapRef.current!)
        .bindPopup(
          `<div style="min-width:180px">
            <img src="${p.images[0]}" style="width:100%;height:100px;object-fit:cover;border-radius:6px;margin-bottom:6px" />
            <strong style="font-size:13px">${formatPrice(p.price, p.listingType)}</strong>
            <p style="font-size:11px;margin:2px 0;color:#666">${p.title}</p>
            <p style="font-size:10px;color:#999">${p.address}, ${p.location}</p>
          </div>`,
          { maxWidth: 220 }
        );

      if (onPropertyClick) {
        marker.on("click", () => onPropertyClick(p.id));
      }

      if (selectedId === p.id) {
        marker.openPopup();
      }

      markersRef.current.push(marker);
    });
  }, [properties, selectedId, onPropertyClick]);

  return <div ref={containerRef} className={`rounded-xl ${className}`} />;
};

export default MapView;
