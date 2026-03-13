import { useParams, Link } from "react-router-dom";
import { getPropertyById, formatPrice } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import ContactForm from "@/components/ContactForm";
import MapView from "@/components/MapView";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { Bed, Bath, Maximize, Calendar, Heart, Share2, ArrowLeft, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id || "");
  const { isSaved, toggleSaved } = useSavedProperties();

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-32">
          <h1 className="font-display text-2xl font-bold">Property Not Found</h1>
          <p className="mt-2 text-muted-foreground">The property you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link to="/listings">Browse Listings</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-6">
        {/* Back button */}
        <Link to="/listings" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Listings
        </Link>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className="bg-accent text-accent-foreground border-0">
                  {property.listingType === "rent" ? "For Rent" : "For Sale"}
                </Badge>
                <Badge variant="secondary" className="capitalize">{property.propertyType}</Badge>
              </div>
              <h1 className="font-display text-2xl font-bold md:text-3xl">{property.title}</h1>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {property.address}, {property.location}
              </div>
              <div className="mt-3 flex items-center gap-4">
                <span className="font-display text-3xl font-bold text-accent">
                  {formatPrice(property.price, property.listingType)}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleSaved(property.id)}
                  >
                    <Heart className={`h-4 w-4 ${isSaved(property.id) ? "fill-accent text-accent" : ""}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-4 gap-4 rounded-xl bg-card p-5 shadow-card">
              {[
                { icon: Bed, value: property.bedrooms, label: "Bedrooms" },
                { icon: Bath, value: property.bathrooms, label: "Bathrooms" },
                { icon: Maximize, value: `${property.area.toLocaleString()} sqft`, label: "Area" },
                { icon: Calendar, value: property.yearBuilt, label: "Year Built" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <item.icon className="mb-1 h-5 w-5 text-accent" />
                  <span className="font-display text-lg font-bold">{item.value}</span>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="rounded-xl bg-card p-5 shadow-card">
              <h2 className="mb-3 font-display text-lg font-semibold">About This Property</h2>
              <p className="leading-relaxed text-muted-foreground">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="rounded-xl bg-card p-5 shadow-card">
              <h2 className="mb-3 font-display text-lg font-semibold">Amenities</h2>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-success" /> {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl bg-card p-5 shadow-card">
              <h2 className="mb-3 font-display text-lg font-semibold">Location</h2>
              <MapView
                properties={[property]}
                center={[property.latitude, property.longitude]}
                zoom={14}
                className="h-[300px]"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <ContactForm agent={property.agent} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
