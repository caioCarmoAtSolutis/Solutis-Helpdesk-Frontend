import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import MainPane from "../components/MainPane";
import DisplayTicket from "../components/DisplayTicket";
import { useLocation, useParams } from "react-router-dom";
import type { Ticket } from "../components/TicketsDynamicList";
import "./page.css";

function DisplayTicketPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const ticket = state?.ticket as Ticket;

  if (!ticket) {
    console.log("Ticket undefined!");
  }

  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <MainPane>
          <h1>Chamado {id}</h1>
          <DisplayTicket ticket={ticket} />
        </MainPane>
      </ContentBox>
    </div>
  );
}

export default DisplayTicketPage;
