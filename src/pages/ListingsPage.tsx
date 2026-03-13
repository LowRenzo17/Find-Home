import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import FilterPanel from "@/components/FilterPanel";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SearchBar from "@/components/SearchBar";
import { useProperties } from "@/hooks/useProperties";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 12;

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const { properties, filters, updateFilters, resetFilters, isLoading } = useProperties();
  const { isSaved, toggleSaved } = useSavedProperties();
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Apply URL params on mount
  useEffect(() => {
    const q = searchParams.get("q");
    const lt = searchParams.get("listingType");
    const pt = searchParams.get("propertyType");
    const updates: Record<string, string> = {};
    if (q) updates.searchQuery = q;
    if (lt) updates.listingType = lt;
    if (pt) updates.propertyType = pt;
    if (Object.keys(updates).length) updateFilters(updates);
  }, []);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const paginated = properties.slice(0, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-6">
        {/* Top Bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1">
            <SearchBar
              variant="compact"
              onSearch={(f) => {
                updateFilters(f);
                setPage(1);
              }}
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "fixed inset-0 z-50 overflow-y-auto bg-background p-4" : "hidden"
            } w-full shrink-0 md:block md:w-72`}
          >
            <FilterPanel
              filters={filters}
              onUpdate={(f) => {
                updateFilters(f);
                setPage(1);
              }}
              onReset={() => {
                resetFilters();
                setPage(1);
              }}
              onClose={() => setShowFilters(false)}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{properties.length}</span> properties found
              </p>
            </div>

            {isLoading ? (
              <LoadingSkeleton count={6} />
            ) : properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-semibold">No properties found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginated.map((p) => (
                    <PropertyCard key={p.id} property={p} isSaved={isSaved(p.id)} onToggleSave={toggleSaved} />
                  ))}
                </div>

                {page * ITEMS_PER_PAGE < properties.length && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Load More ({properties.length - paginated.length} remaining)
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingsPage;
