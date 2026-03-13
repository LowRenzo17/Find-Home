import { useState } from "react";
import { Search, MapPin, DollarSign, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (filters: { searchQuery: string; listingType: string; propertyType: string }) => void;
  variant?: "hero" | "compact";
}

const SearchBar = ({ onSearch, variant = "hero" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [listingType, setListingType] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    onSearch({ searchQuery: query, listingType, propertyType });
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-card p-2 shadow-card">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search location, address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border-0 pl-9 shadow-none"
          />
        </div>
        <Button onClick={handleSearch} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-card p-3 shadow-elevated md:p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="City, neighborhood, or address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-9"
          />
        </div>
        <Select value={listingType} onValueChange={setListingType}>
          <SelectTrigger>
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Buy or Rent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sale">Buy</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
          </SelectContent>
        </Select>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <Home className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} className="bg-accent text-accent-foreground hover:bg-accent/90 h-10">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
