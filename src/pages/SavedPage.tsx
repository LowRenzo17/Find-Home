import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { properties } from "@/lib/mockData";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SavedPage = () => {
  const { savedIds, isSaved, toggleSaved } = useSavedProperties();
  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="mb-2 font-display text-2xl font-bold md:text-3xl">Saved Properties</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {savedProperties.length} {savedProperties.length === 1 ? "property" : "properties"} saved
        </p>

        {savedProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-lg font-semibold">No saved properties yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse listings and tap the heart icon to save your favorites.
            </p>
            <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/listings">Browse Listings</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} isSaved={isSaved(p.id)} onToggleSave={toggleSaved} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SavedPage;
