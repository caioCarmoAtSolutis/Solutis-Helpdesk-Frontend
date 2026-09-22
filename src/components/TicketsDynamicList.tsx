import { useNavigate } from "react-router-dom";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export interface Ticket {
  id: string;
  userName: String;
  title: string;
  category: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}

interface TicketsDynamicListProps {
  dynamicTicketsList: Ticket[];
}

function renderTicketItem(ticket: Ticket) {
  const navigate = useNavigate();
  let badgeClass = "table-light";

  if (ticket.status === "RESOLVED") {
    badgeClass = "table-success";
  } else {
    switch (ticket.priority) {
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
      className={`${badgeClass}`}
      onClick={() => navigate(`/detalhar/${ticket.id}`)}
    >
      <td>{ticket.title}</td>
      <td>{ticket.userName || "—"}</td>
      <td>{ticket.status}</td>
      <td>{ticket.category || "—"}</td>
      <td>{ticket.priority}</td>
      <td>{ticket.createdAt || "—"}</td>
    </tr>
  );
}

export default function TicketsDynamicList({
  dynamicTicketsList,
}: TicketsDynamicListProps) {
  return dynamicTicketsList.map((ticket) => renderTicketItem(ticket));
}
