import { video } from "@/assets/index";

const LazyVideo: React.FC = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {/* Static Overlay - Always visible for text contrast */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      <div className="absolute inset-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right [will-change:transform]"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default LazyVideo;
