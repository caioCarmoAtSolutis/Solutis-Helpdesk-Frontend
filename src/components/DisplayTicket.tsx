import type { Ticket } from "../components/TicketsDynamicList";

interface TicketProps {
  ticket: Ticket;
}

function handleUpdateSubmit() {}

function rederTechnicians() {
  return <option></option>;
}

function DisplayTicket({ ticket }: TicketProps) {
  return (
    <>
      <h4>{ticket.title || "-"}</h4>
      <hr />
      <p>Descrição: {ticket.description || "-"}</p>
      <p>
        Técnico responsável: {ticket.technicianId || "Sem técnico responsável"}
      </p>
      <p>Usuário: {ticket.customerId || "-"}</p>
      <p>{ticket.status.status || "Status: -"}</p>
      <p>{ticket.category.category || "Category: -"}</p>
      <p>{ticket.priority.priority || "Priority: -"}</p>
      <p>Criado em {ticket.createdAt || "-"}</p>
      <p>Última atualização {ticket.updatedAt || "-"}</p>
      <hr />
      <form>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInputGroup">
              Atribuir técnico
            </label>
            <select
              className="form-control"
              id="select-status"
              aria-placeholder=""
            >
              {rederTechnicians()}
            </select>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="select-status">
              Status
            </label>
            <select className="form-control" id="select-status">
              <option>Aberto</option>
              <option>Em atendimento</option>
              <option>Em espera</option>
              <option>Solucionado</option>
              <option>fechado</option>
            </select>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="select-priority">
              Prioridade
            </label>
            <select className="form-control" id="select-priority">
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
              <option>Crítica</option>
            </select>
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={handleUpdateSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default DisplayTicket;
