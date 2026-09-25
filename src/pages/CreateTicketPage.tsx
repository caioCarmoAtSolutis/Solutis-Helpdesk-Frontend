import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import CreateTicketForm from "../components/CreateTicketForm";
import "./Page.css";

function CreateTicketPage() {
  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <div className="box form-box">
          <h1>Criar Chamado</h1>
          <CreateTicketForm />
        </div>
      </ContentBox>
    </div>
  );
}

export default CreateTicketPage;
