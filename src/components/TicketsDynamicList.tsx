import { useNavigate, type NavigateFunction } from "react-router-dom";
import { formatDate } from "./DisplayTicket";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Ticket {
  id: string;
  technicianId: string;
  customerId: string;
  title: string;
  description: string;
  category: {
    category: string;
  };
  priority: {
    priority: string;
  };
  status: {
    status: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface TicketsDynamicListProps {
  dynamicTicketsList: Ticket[];
}

function renderTicketItem(ticket: Ticket, navigate: NavigateFunction) {
  let badgeClass = "table-light";

  if (ticket.status.status === "RESOLVED") {
    badgeClass = "table-success";
  } else {
    switch (ticket.priority.priority) {
      case "LOW":
      case "MEDIUM":
        badgeClass = "table-info";
        break;
      case "HIGH":
        badgeClass = "table-warning";
        break;
      case "CRITICAL":
        badgeClass = "table-danger";
        break;
    }
  }

  return (
    <tr
      key={ticket.id}
      className={badgeClass}
      onClick={() => navigate(`/detalhar/${ticket.id}`, { state: { ticket } })}
    >
      <td>{ticket.title}</td>
      <td>{ticket.technicianId || "—"}</td>
      <td>{ticket.customerId}</td>
      <td>{ticket.status.status}</td>
      <td>{ticket.category.category}</td>
      <td>{ticket.priority.priority}</td>
      <td>{formatDate(ticket.createdAt)}</td>
    </tr>
  );
}

export default function TicketsDynamicList({
  dynamicTicketsList,
}: TicketsDynamicListProps) {
  const navigate = useNavigate();

  return (
    <>
      {dynamicTicketsList.map((ticket) => renderTicketItem(ticket, navigate))}
    </>
  );
}
