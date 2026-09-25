import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import MainPane from "../components/MainPane";
import TicketsTable from "../components/TicketsTable";
import "./Page.css";

function ListTicketsPage() {
  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <MainPane>
          <TicketsTable />
        </MainPane>
      </ContentBox>
    </div>
  );
}

export default ListTicketsPage;
