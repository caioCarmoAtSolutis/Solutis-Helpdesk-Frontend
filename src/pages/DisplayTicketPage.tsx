import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import DisplayTicket from "../components/DisplayTicket";
import { useLocation, useParams } from "react-router-dom";
import type { Ticket } from "../components/TicketsDynamicList";
import "./Page.css";
import "./Box.css";

function DisplayTicketPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const ticket = state?.ticket as Ticket;

  console.log(ticket);

  if (!ticket) {
    console.log("Ticket undefined!");
  }

  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <div className="box">
          <DisplayTicket ticket={ticket} />
        </div>
      </ContentBox>
    </div>
  );
}

export default DisplayTicketPage;
