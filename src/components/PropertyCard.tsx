import { Heart, Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Property, formatPrice } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

const PropertyCard = ({ property, isSaved, onToggleSave }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl bg-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {/* Image */}
      <Link to={`/property/${property.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground border-0">
          {property.listingType === "rent" ? "For Rent" : "For Sale"}
        </Badge>
        <Badge variant="secondary" className="absolute left-3 top-10 mt-1 capitalize">
          {property.propertyType}
        </Badge>
      </Link>

      {/* Save Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleSave(property.id);
        }}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm transition-colors hover:bg-card"
        aria-label={isSaved ? "Remove from saved properties" : "Save property"}
      >
        <Heart
          className={`h-4 w-4 transition-colors ${isSaved ? "fill-accent text-accent" : "text-muted-foreground"}`}
        />
      </button>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1 font-display text-xl font-bold text-foreground">
          {formatPrice(property.price, property.listingType)}
        </div>
        <Link to={`/property/${property.id}`}>
          <h3 className="mb-2 text-sm font-medium text-foreground line-clamp-1 hover:text-accent transition-colors">
            {property.title}
          </h3>
        </Link>
        <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{property.address}, {property.location}</span>
        </div>
        <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5" /> {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" /> {property.area.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
