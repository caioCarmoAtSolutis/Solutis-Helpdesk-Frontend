import { useNavigate } from "react-router-dom";

function CreateTicketButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/criar-chamado")}
      type="button"
      className="btn btn-outline-primary"
    >
      Abrir chamado
    </button>
  );
}

export default CreateTicketButton;
