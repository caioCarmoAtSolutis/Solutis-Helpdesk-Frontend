import NavBar from "../components/NavBar";
import ContentBox from "../components/ContentBox";
import MainPane from "../components/MainPane";
import "./page.css";
import { useParams } from "react-router-dom";

function DisplayTicketPage() {
  const { id } = useParams();

  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <MainPane>
          <h1>Chamado {id}</h1>
        </MainPane>
      </ContentBox>
    </div>
  );
}

export default DisplayTicketPage;
