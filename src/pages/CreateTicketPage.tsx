import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import MainPane from "../components/MainPane";
import CreateTicketForm from "../components/CreateTicketForm";
import "./page.css";

function CreateTicketPage() {
  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <MainPane>
          <div className="form">
            <h1>Criar Chamado</h1>
            <CreateTicketForm />
          </div>
        </MainPane>
      </ContentBox>
    </div>
  );
}

export default CreateTicketPage;
