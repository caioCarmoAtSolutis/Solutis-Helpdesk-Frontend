import type { Ticket } from "../components/TicketsDynamicList";

interface TicketProps {
  ticket: Ticket;
}

function DisplayTicket({ ticket }: TicketProps) {
  return (
    <div>
      <p>Título: {ticket.title || "-"}</p>
      <p>Descrição: {ticket.description || "-"}</p>
      <p>Técnico responsável: {ticket.technicianId || "-"}</p>
      <p>Usuário: {ticket.customerId || "-"}</p>
      <p>Status: {ticket.status.status || "-"}</p>
      <p>Categoria: {ticket.category.category || "-"}</p>
      <p>Prioridade: {ticket.priority.priority || "-"}</p>
      <p>Criado em: {ticket.createdAt || "-"}</p>
      <p>Última atualização: {ticket.updatedAt || "-"}</p>
    </div>
  );
}

export default DisplayTicket;
