import "./Dashboard.css";
import MainPane from "./MainPane";
import "./MainPane.css";

function Dashboard() {
  let totalNumberOfTickets = 0;
  let openTickets = 0;
  let inProgressTickets = 0;
  let solvedTickets = 0;
  let criticalTickets = 0;

  return (
    <MainPane>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="dashboard-box">
              Total de Chamados
              <div className="dasboard-tickets dasboard-tickets-normal">
                {totalNumberOfTickets}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="dashboard-box">
              Abertos
              <div className="dasboard-tickets dasboard-tickets-normal">
                {openTickets}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="dashboard-box">
              Em Atendimento
              <div className="dasboard-tickets dasboard-tickets-in-progress">
                {inProgressTickets}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="dashboard-box">
              Resolvidos
              <div className="dasboard-tickets dasboard-tickets-solved">
                {solvedTickets}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="dashboard-box">
              Críticos
              <div className="dasboard-tickets dasboard-tickets-critical">
                {criticalTickets}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPane>
  );
}

export default Dashboard;
