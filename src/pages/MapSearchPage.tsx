import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { Property } from "@/lib/mockData";
import L from "leaflet";
import { List, MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapSearchPage = () => {
  const { allProperties } = useProperties();
  const { isSaved, toggleSaved } = useSavedProperties();
  const [visibleProperties, setVisibleProperties] = useState<Property[]>(allProperties);
  const [selectedId, setSelectedId] = useState<string>();
  const [showList, setShowList] = useState(true);

  const handleBoundsChange = useCallback(
    (bounds: L.LatLngBounds) => {
      const inBounds = allProperties.filter((p) =>
        bounds.contains(L.latLng(p.latitude, p.longitude))
      );
      setVisibleProperties(inBounds);
    },
    [allProperties]
  );

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Side Panel */}
        <aside
          className={`${
            showList ? "flex" : "hidden md:flex"
          } w-full flex-col overflow-y-auto border-r border-border bg-background p-4 md:w-96`}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">
              {visibleProperties.length} Properties
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setShowList(false)}
            >
              <MapIcon className="mr-1 h-4 w-4" /> Map
            </Button>
          </div>
          <div className="space-y-4">
            {visibleProperties.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`cursor-pointer rounded-xl transition-shadow ${
                  selectedId === p.id ? "ring-2 ring-accent" : ""
                }`}
              >
                <PropertyCard property={p} isSaved={isSaved(p.id)} onToggleSave={toggleSaved} />
              </div>
            ))}
            {visibleProperties.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No properties in this area. Try zooming out.
              </p>
            )}
          </div>
        </aside>

        {/* Map */}
        <div className={`${showList ? "hidden md:block" : "block"} flex-1 relative`}>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 z-10 md:hidden"
            onClick={() => setShowList(true)}
          >
            <List className="mr-1 h-4 w-4" /> List
          </Button>
          <MapView
            properties={allProperties}
            onPropertyClick={setSelectedId}
            onBoundsChange={handleBoundsChange}
            selectedId={selectedId}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MapSearchPage;
