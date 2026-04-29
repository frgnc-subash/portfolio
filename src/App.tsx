import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Blog from "./pages/blog/Blog";
import BlogPost from "./pages/blog/BlogPost";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Projects from "./pages/projects/Projects";
import PageNotFound from "./pages/PageNotFound";
import Index from "./components/Layout";
import PageLoader from "./components/loading/PageLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <About /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "projects", element: <Projects /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 900);
    const removeTimer = window.setTimeout(() => setShowLoader(false), 1250);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showLoader && <PageLoader isLeaving={isLeaving} />}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
