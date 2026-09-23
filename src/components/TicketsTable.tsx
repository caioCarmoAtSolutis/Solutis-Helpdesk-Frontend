import { useEffect, useState } from "react";
import TicketsDynamicList from "../components/TicketsDynamicList";
import type { Ticket } from "../components/TicketsDynamicList";
import "./TicketsTable.css";

const GATEWAY_URL = "http://localhost:9000";
const TICKET_SERVICE_ENDPOINT = "/ticket-service/tickets";

function TicketsTable() {
  const [error, setError] = useState();
  const [pageInfo, setPageInfo] = useState({});
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTicketsPage = async (size = 30, page = 0) => {
      try {
        const response = await fetch(
          `${GATEWAY_URL + TICKET_SERVICE_ENDPOINT}?size=${size}&page=${page}`,
        );
        const json = await response.json();
        const tickets = json.content || [];
        setTickets(tickets);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchTicketsPage();
  }, []);

  return (
    <div className="table-responsive overflow-auto table-div">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Id do Técnico</th>
            <th scope="col">Id do Cliente</th>
            <th scope="col">Status</th>
            <th scope="col">Categoria</th>
            <th scope="col">Prioridade</th>
            <th scope="col">Data da criação</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <TicketsDynamicList dynamicTicketsList={tickets} />
        </tbody>
      </table>
    </div>
  );
}

export default TicketsTable;
