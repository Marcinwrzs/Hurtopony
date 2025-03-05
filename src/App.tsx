import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import paths from "./paths";

const MovieList = React.lazy(() => import("./pages/MovieList"));
const Movie = React.lazy(() => import("./pages/Movie"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: "100vw", height: "100vh" }}>
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path={paths.home} element={<MovieList />} />
            <Route path={paths.movie(":id")} element={<Movie />} />
            <Route path={paths.notFound} element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
