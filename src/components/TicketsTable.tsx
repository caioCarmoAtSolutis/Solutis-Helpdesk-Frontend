import TicketsDynamicList from "../components/TicketsDynamicList";
import type { Ticket } from "../components/TicketsDynamicList";
import "./TicketsTable.css";

function TicketsTable() {
  const dynamicTicketsList: Ticket[] = [
    {
      id: "1",
      title: "chamado_1",
      userName: "João Silva",
      status: "RESOLVED",
      category: "SOFTWARE",
      priority: "LOW",
      createdAt: "22/09/2026",
    },
    {
      id: "2",
      title: "chamado_2",
      userName: "Maria Souza",
      status: "OPEN",
      category: "HARDWARE",
      priority: "CRITICAL",
      createdAt: "22/09/2026",
    },
    {
      id: "3",
      title: "chamado_3",
      userName: "Carlos Lima",
      status: "OPEN",
      category: "NETWORK",
      priority: "MEDIUM",
      createdAt: "21/09/2026",
    },
    {
      id: "4",
      title: "chamado_4",
      userName: "Ana Costa",
      status: "OPEN",
      category: "NETWORK",
      priority: "HIGH",
      createdAt: "20/09/2026",
    },
  ];

  return (
    <div className="table-responsive overflow-auto table-div">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Usuário</th>
            <th scope="col">Status</th>
            <th scope="col">Categoria</th>
            <th scope="col">Prioridade</th>
            <th scope="col">Data da criação</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <TicketsDynamicList dynamicTicketsList={dynamicTicketsList} />
        </tbody>
      </table>
    </div>
  );
}

export default TicketsTable;
