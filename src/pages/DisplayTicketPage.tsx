import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import MainPane from "../components/MainPane";
import "./page.css";

function DisplayTicketPage() {
  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <MainPane>
          <h1>Chamado</h1>
        </MainPane>
      </ContentBox>
    </div>
  );
}

export default DisplayTicketPage;
