import React, { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  if (!src) {
    return (
      <div
        ref={imgRef}
        className={`${className} bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center`}
      >
        <div className="text-center p-4">
          <div className="text-white text-sm opacity-70">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`${className} relative overflow-hidden`}>
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-white text-sm opacity-70">{alt}</div>
          </div>
        </div>
      )}

      {isVisible && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${!isLoaded || hasError ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          loading={loading}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

export default LazyImage;
