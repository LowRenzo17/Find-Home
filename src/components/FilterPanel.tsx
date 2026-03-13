import { PropertyFilters } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface FilterPanelProps {
  filters: PropertyFilters;
  onUpdate: (partial: Partial<PropertyFilters>) => void;
  onReset: () => void;
  onClose?: () => void;
}

const FilterPanel = ({ filters, onUpdate, onReset, onClose }: FilterPanelProps) => {
  return (
    <div className="space-y-6 rounded-xl bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Filters</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onReset}>
            Clear all
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Location</Label>
        <Input
          placeholder="City or area"
          value={filters.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">
          Price Range: ${filters.minPrice.toLocaleString()} — ${filters.maxPrice.toLocaleString()}
        </Label>
        <Slider
          defaultValue={[0, 5000000]}
          value={[filters.minPrice, filters.maxPrice]}
          max={5000000}
          step={50000}
          onValueChange={([min, max]) => onUpdate({ minPrice: min, maxPrice: max })}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Bedrooms</Label>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((n) => (
            <Button
              key={n}
              variant={filters.bedrooms === n ? "default" : "outline"}
              size="sm"
              className={`flex-1 ${filters.bedrooms === n ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}`}
              onClick={() => onUpdate({ bedrooms: n })}
            >
              {n === 0 ? "Any" : `${n}+`}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Bathrooms</Label>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((n) => (
            <Button
              key={n}
              variant={filters.bathrooms === n ? "default" : "outline"}
              size="sm"
              className={`flex-1 ${filters.bathrooms === n ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}`}
              onClick={() => onUpdate({ bathrooms: n })}
            >
              {n === 0 ? "Any" : `${n}+`}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Property Type</Label>
        <Select value={filters.propertyType} onValueChange={(v) => onUpdate({ propertyType: v === "all" ? "" : v })}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Listing Type</Label>
        <Select value={filters.listingType} onValueChange={(v) => onUpdate({ listingType: v === "all" ? "" : v })}>
          <SelectTrigger>
            <SelectValue placeholder="Buy or Rent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterPanel;
