import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-screen fontFamily bg-[#232529] text-[#b3b5ba]  pt-14 flex flex-col items-center">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
