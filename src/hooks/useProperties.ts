import { useState, useCallback, useMemo } from "react";
import { properties, Property } from "@/lib/mockData";

export interface PropertyFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  listingType: string;
  searchQuery: string;
}

const defaultFilters: PropertyFilters = {
  location: "",
  minPrice: 0,
  maxPrice: 10000000,
  bedrooms: 0,
  bathrooms: 0,
  propertyType: "",
  listingType: "",
  searchQuery: "",
};

export const useProperties = () => {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.location.toLowerCase().includes(q) &&
          !p.address.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase()))
        return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && p.bathrooms < filters.bathrooms) return false;
      if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
      if (filters.listingType && p.listingType !== filters.listingType) return false;
      return true;
    });
  }, [filters]);

  const updateFilters = useCallback((partial: Partial<PropertyFilters>) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, ...partial }));
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const featured = useMemo(() => properties.filter((p) => p.featured), []);

  return { properties: filtered, allProperties: properties, featured, filters, updateFilters, resetFilters, isLoading };
};
