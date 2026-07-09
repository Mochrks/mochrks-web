import React, { Suspense } from "react";
import AppRoutes from "@/router/AppRoutes";
import Loading from "@/components/layout/loading";
import SmoothScroll from "@/components/layout/smooth-scroll";
import SpotifyNowPlaying from "@/components/ui/spotify-now-playing";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SmoothScroll>
        <AppRoutes />
      </SmoothScroll>
      <SpotifyNowPlaying />
    </Suspense>
  );
};

export default App;
