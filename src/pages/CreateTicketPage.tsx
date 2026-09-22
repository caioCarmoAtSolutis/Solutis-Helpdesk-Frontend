import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import MainPane from "../components/MainPane";
import "./page.css";

function CreateTicketPage() {
  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <MainPane>
          <h1>Criar Chamado</h1>
        </MainPane>
      </ContentBox>
    </div>
  );
}

export default CreateTicketPage;
