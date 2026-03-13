import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Home className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-display text-lg font-bold">NestFinder</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Discover your perfect home with NestFinder. We connect buyers, renters, and sellers in one seamless platform.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/listings" className="hover:text-foreground">Buy</Link></li>
            <li><Link to="/listings?listingType=rent" className="hover:text-foreground">Rent</Link></li>
            <li><Link to="/map" className="hover:text-foreground">Map Search</Link></li>
            <li><Link to="/saved" className="hover:text-foreground">Saved Homes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground cursor-pointer">About Us</span></li>
            <li><span className="hover:text-foreground cursor-pointer">Careers</span></li>
            <li><span className="hover:text-foreground cursor-pointer">Press</span></li>
            <li><span className="hover:text-foreground cursor-pointer">Privacy Policy</span></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> nestfinder@example.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />25471234567</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kenya,NRB</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 NestFinder. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
