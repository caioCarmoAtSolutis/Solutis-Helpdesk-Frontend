import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import MainPane from "../components/MainPane";
import TicketsDynamicList from "../components/TicketsDynamicList";
import type { Ticket } from "../components/TicketsDynamicList";
import "./page.css";

function ListTicketsPage() {
  const dynamicTicketsList: Ticket[] = [
    {
      id: "1",
      title: "chamado_1",
      priority: "LOW",
      status: "RESOLVED",
    },
    {
      id: "2",
      title: "chamado_2",
      priority: "CRITICAL",
      status: "OPEN",
    },
  ];

  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <MainPane>
          <TicketsDynamicList dynamicTicketsList={dynamicTicketsList} />
        </MainPane>
      </ContentBox>
    </div>
  );
}

export default ListTicketsPage;
