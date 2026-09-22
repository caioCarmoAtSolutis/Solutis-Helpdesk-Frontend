import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTicketPage from "./pages/CreateTicketPage.tsx";
import ListTicketsPage from "./pages/ListTicketsPage.tsx";
import DisplayTicketPage from "./pages/DisplayTicketPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/criar-chamado",
    element: <CreateTicketPage />,
  },
  {
    path: "/listar-tickets",
    element: <ListTicketsPage />,
  },
  {
    path: "/detalhar/",
    element: <DisplayTicketPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
