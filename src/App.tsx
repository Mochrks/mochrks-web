import React from "react";
import { Suspense } from "react";
import AppRoutes from "@/router/AppRoutes";
import Loading from "./components/demo/Loading";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
