export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export interface Ticket {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
}

interface TicketsDynamicListProps {
  dynamicTicketsList: Ticket[];
}

function renderTicketItem(ticket: Ticket) {
  let badgeClass = "list-group-item-light";

  if (ticket.status === "RESOLVED") {
    badgeClass = "list-group-item-success";
  } else {
    switch (ticket.priority) {
      case "LOW":
      case "MEDIUM":
        badgeClass = "list-group-item-info";
        break;
      case "HIGH":
        badgeClass = "list-group-item-warning";
        break;
      case "CRITICAL":
        badgeClass = "list-group-item-danger";
        break;
    }
  }

  return (
    <li key={ticket.id} className={`list-group-item ${badgeClass}`}>
      {ticket.title}
    </li>
  );
}

export default function TicketsDynamicList({
  dynamicTicketsList,
}: TicketsDynamicListProps) {
  return (
    <ul className="list-group">
      {dynamicTicketsList.map((ticket) => renderTicketItem(ticket))}
    </ul>
  );
}
