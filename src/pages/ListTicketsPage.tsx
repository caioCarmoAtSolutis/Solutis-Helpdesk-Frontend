import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import MainPane from "../components/MainPane";
import "./page.css";

function ListTicketsPage() {
  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <MainPane>
          <div>
            <h1>Chamados</h1>
          </div>
        </MainPane>
      </ContentBox>
    </div>
  );
}

export default ListTicketsPage;
