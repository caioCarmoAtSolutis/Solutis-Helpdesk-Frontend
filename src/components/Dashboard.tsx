import { useEffect, useState } from "react";
import type { Ticket } from "../components/TicketsDynamicList";
import MainPane from "./MainPane";
import "./Dashboard.css";
import "./MainPane.css";

const GATEWAY_URL = "http://localhost:9000";
const TICKET_SERVICE_ENDPOINT = "/ticket-service/tickets";

function getStatistics(tickets: Ticket[]) {
  const statistics = {
    totalNumberOfTickets: tickets.length,
    openTickets: 0,
    inProgressTickets: 0,
    solvedTickets: 0,
    criticalTickets: 0,
  };

  tickets.forEach((ticket) => {
    if ("OPEN" === ticket.status.status) {
      statistics.openTickets++;
    }
    if ("IN_PROGRESS" === ticket.status.status) {
      statistics.inProgressTickets++;
    }
    if ("RESOLVED" === ticket.status.status) {
      statistics.solvedTickets++;
    }
    if ("CRITICAL" === ticket.priority.priority) {
      statistics.criticalTickets++;
    }
  });
  return statistics;
}

function Dashboard() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTicketsPage = async (size = 30, page = 0) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${GATEWAY_URL + TICKET_SERVICE_ENDPOINT}?size=${size}&page=${page}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch tickets (${response.status})`);
        }

        const json = await response.json();
        setTickets(json.content || []);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar chamados",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicketsPage();
  }, []);

  const statistics = getStatistics(tickets);

  return (
    <MainPane>
      <div className="container text-center">
        {error && (
          <p role="alert" className="text-danger">
            {error}
          </p>
        )}

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="row">
            <div className="col">
              <div className="dashboard-box">
                Total de Chamados
                <div className="dasboard-tickets dasboard-tickets-normal">
                  {statistics.totalNumberOfTickets}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard-box">
                Abertos
                <div className="dasboard-tickets dasboard-tickets-normal">
                  {statistics.openTickets}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard-box">
                Em Atendimento
                <div className="dasboard-tickets dasboard-tickets-in-progress">
                  {statistics.inProgressTickets}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard-box">
                Resolvidos
                <div className="dasboard-tickets dasboard-tickets-solved">
                  {statistics.solvedTickets}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard-box">
                Críticos
                <div className="dasboard-tickets dasboard-tickets-critical">
                  {statistics.criticalTickets}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainPane>
  );
}

export default Dashboard;
