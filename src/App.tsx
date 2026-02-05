import React, { Suspense } from "react";
import AppRoutes from "@/router/AppRoutes";
import Loading from "./components/demo/Loading";
import SmoothScroll from "./components/demo/SmoothScroll";
import SpotifyNowPlaying from "./components/demo/SpotifyNowPlaying";

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
