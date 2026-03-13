import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="space-y-3">
      {/* Hero Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={images[current]}
          alt={`${title} - Image ${current + 1}`}
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="sync"
        />
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-3 right-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-shrink-0 overflow-hidden rounded-lg transition-all ${
              i === current ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="h-16 w-24 object-cover md:h-20 md:w-28" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
