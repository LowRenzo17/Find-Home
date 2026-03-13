import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { Building2, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { featured } = useProperties();
  const { isSaved, toggleSaved } = useSavedProperties();

  const handleSearch = (filters: { searchQuery: string; listingType: string; propertyType: string }) => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set("q", filters.searchQuery);
    if (filters.listingType) params.set("listingType", filters.listingType);
    if (filters.propertyType) params.set("propertyType", filters.propertyType);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(16_80%_58%/0.15),transparent_60%)]" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-6xl">
              Find Your Perfect
              <span className="text-accent"> Home</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/70">
              Explore thousands of properties for sale and rent across the country.
              Your dream home is just a search away.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="container grid grid-cols-3 divide-x divide-border py-8">
          {[
            { icon: Building2, value: "10K+", label: "Properties" },
            { icon: Shield, value: "99%", label: "Verified" },
            { icon: TrendingUp, value: "5K+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <stat.icon className="mb-1 h-5 w-5 text-accent" />
              <span className="font-display text-2xl font-bold md:text-3xl">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Featured Properties</h2>
            <p className="mt-1 text-sm text-muted-foreground">Handpicked homes just for you</p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/listings">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} isSaved={isSaved(p.id)} onToggleSave={toggleSaved} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="container py-16 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-primary-foreground md:text-3xl">
            Ready to List Your Property?
          </h2>
          <p className="mb-6 text-primary-foreground/70">
            Reach thousands of potential buyers and renters.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            List Your Property
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
