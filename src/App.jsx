import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Loading from "./components/Loading";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Stack from "./components/Stack";
import Home from "./components/landingPage/Home";
import { SoundProvider } from "./controllers/SoundContext";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/myStack", element: <Stack /> },
    { path: "/education", element: <Education /> },
    { path: "/projects", element: <Projects /> },
    { path: "/contact", element: <Contact /> },
    { path: "*", element: <PageNotFound /> },
  ]);
  return (
    <SoundProvider>
      {!isLoaded ? (
        <Loading onComplete={() => setIsLoaded(true)} />
      ) : (
        <RouterProvider router={router} />
      )}
    </SoundProvider>
  );
};

export default App;
