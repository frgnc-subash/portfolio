import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Blog from "./pages/blog/Blog";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Projects from "./pages/projects/Projects";
import PageNotFound from "./pages/PageNotFound";
import Index from "./components/Layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      errorElement: <PageNotFound/>,
      children: [
        { index: true, element: <About /> },
        { path: "blog", element: <Blog /> },
        { path: "projects", element: <Projects /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
