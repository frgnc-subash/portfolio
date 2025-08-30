import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./components/home/Home";
import Education from "./components/education/Education";
import Projects from "./components/projects/Projects";
import MyStack from "./components/myStack/MyStack";
import Contact from "./components/contact/Contact";
import Gallery from "./components/gallery/Gallery";
import About from "./components/about/About";
import NotFound from "./components/PageNotFound"; // New 404 page
import WeatherApp from "./components/weatherCast/WeatherBoard";
// import { Analytics } from "@vercel/analytics/next";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/myStack", element: <MyStack /> },
    { path: "/education", element: <Education /> },
    { path: "/projects", element: <Projects /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/contact", element: <Contact /> },
    { path: "*", element: <NotFound /> }, // catch-all for wrong URLs
  ]);

  return (
    <>
      {!isLoaded ? (
        <LoadingScreen onComplete={() => setIsLoaded(true)} />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

export default App;
