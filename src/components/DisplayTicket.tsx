import type { Ticket } from "../components/TicketsDynamicList";
import { useEffect, useState } from "react";
import { getPriority } from "./CreateTicketForm";

interface TicketProps {
  ticket: Ticket;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

export const STATUS_OPTIONS = [
  "Aberto",
  "Em atendimento",
  "Em espera",
  "Solucionado",
  "Fechado",
] as const;

export const PRIORITY_OPTIONS = ["Baixa", "Média", "Alta", "Crítica"] as const;

const GATEWAY_URL = "http://localhost:9000";
const TICKET_SERVICE_ENDPOINT = "/ticket-service/tickets";
const USER_SERVICE_ENDPOINT = "/user-service/users";

export function getStatus(statusPTBR: string) {
  switch (statusPTBR) {
    case "Aberto":
      return "OPEN";
    case "Em atendimento":
      return "IN_PROGRESS";
    case "Em espera":
      return "WAITING";
    case "Solucionado":
      return "RESOLVED";
    case "Fechado":
      return "CLOSED";
  }
}

export function getStatusLabel(statusEnum?: string | null): string {
  switch (statusEnum) {
    case "OPEN":
      return "Aberto";
    case "IN_PROGRESS":
      return "Em atendimento";
    case "WAITING":
      return "Em espera";
    case "RESOLVED":
      return "Solucionado";
    case "CLOSED":
      return "Fechado";
    default:
      return STATUS_OPTIONS[0];
  }
}

export function getPriorityLabel(priorityEnum?: string | null): string {
  switch (priorityEnum) {
    case "LOW":
      return "Baixa";
    case "MEDIUM":
      return "Média";
    case "HIGH":
      return "Alta";
    case "CRITICAL":
      return "Crítica";
    default:
      return PRIORITY_OPTIONS[0];
  }
}

function renderTechnicians(technicians: User[]) {
  return technicians
    .filter((technician) => technician.active)
    .map((technician) => (
      <option key={technician.id} value={technician.id}>
        {technician.name}
      </option>
    ));
}

function DisplayTicket({ ticket }: TicketProps) {
  const [error, setError] = useState<string | null>(null);
  const [loadingTechnicians, setLoadingTechnicians] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [technicians, setTechnicians] = useState<User[]>([]);

  const [selectedTechnicianId, setSelectedTechnicianId] = useState(
    ticket.technicianId ?? "",
  );
  const [selectedStatus, setSelectedStatus] = useState(
    getStatusLabel(ticket.status?.status),
  );
  const [selectedPriority, setSelectedPriority] = useState(
    getPriorityLabel(ticket.priority?.priority),
  );

  useEffect(() => {
    const getTechnicians = async (role = "TECHNICIAN") => {
      setLoadingTechnicians(true);
      try {
        const response = await fetch(
          `${GATEWAY_URL + USER_SERVICE_ENDPOINT}/role/${role}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch technicians (${response.status})`);
        }

        const json = await response.json();
        setTechnicians(json.content || []);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar técnicos",
        );
      } finally {
        setLoadingTechnicians(false);
      }
    };

    getTechnicians();
  }, []);

  async function handleUpdateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `${GATEWAY_URL + TICKET_SERVICE_ENDPOINT + "/" + ticket.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            technicianId: selectedTechnicianId || null,
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            priority: {
              priority: getPriority(selectedPriority),
            },
            status: {
              status: getStatus(selectedStatus),
            },
            category: ticket.category,
          }),
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Server responded with:", response.status, errorBody);
        throw new Error(
          `Falha ao atualizar chamado (${response.status} ${errorBody})`,
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar chamado",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h4>{ticket.title || "-"}</h4>
      <hr />
      <p>Descrição: {ticket.description || "-"}</p>
      <p>
        Técnico responsável: {ticket.technicianId || "Sem técnico responsável"}
      </p>
      <p>Usuário: {ticket.customerId || "-"}</p>
      <p>{ticket.status?.status || "Status: -"}</p>
      <p>{ticket.category?.category || "Category: -"}</p>
      <p>{ticket.priority?.priority || "Priority: -"}</p>
      <p>Criado em {ticket.createdAt || "-"}</p>
      <p>Última atualização {ticket.updatedAt || "-"}</p>
      <hr />

      {error && (
        <p role="alert" className="text-danger">
          {error}
        </p>
      )}

      <form onSubmit={handleUpdateSubmit}>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="select-technician">
              Atribuir técnico
            </label>
            <select
              className="form-control"
              id="select-technician"
              value={selectedTechnicianId}
              onChange={(e) => setSelectedTechnicianId(e.target.value)}
              disabled={loadingTechnicians}
            >
              <option value="">
                {loadingTechnicians ? "Carregando..." : "Selecione um técnico"}
              </option>
              {renderTechnicians(technicians)}
            </select>
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="select-status">
              Status
            </label>
            <select
              className="form-control"
              id="select-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="select-priority">
              Prioridade
            </label>
            <select
              className="form-control"
              id="select-priority"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default DisplayTicket;
