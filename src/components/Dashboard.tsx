import { useEffect, useState } from "react";
import type { Ticket } from "../components/TicketsDynamicList";
import MainPane from "./MainPane";
import "./Dashboard.css";
import "./MainPane.css";

const GATEWAY_URL = "http://localhost:9000";
const TICKET_SERVICE_ENDPOINT = "/ticket-service/tickets";

function getStatistics(tickets: Ticket[]) {
  const statistics = {
    totalNumberOfTickets: tickets.length | 0,
    openTickets: 0,
    inProgressTickets: 0,
    solvedTickets: 0,
    criticalTickets: 0,
  };

  if (!tickets) return statistics;

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

  const statistics = getStatistics(tickets);

  return (
    <MainPane>
      <div className="container text-center">
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
      </div>
    </MainPane>
  );
}

export default Dashboard;
