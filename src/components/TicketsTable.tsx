import { useEffect, useState } from "react";
import TicketsDynamicList from "../components/TicketsDynamicList";
import type { Ticket } from "../components/TicketsDynamicList";
import {
  getStatusLabel,
  getPriorityLabel,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
} from "../components/DisplayTicket";
import "./TicketsTable.css";

const GATEWAY_URL = "http://localhost:9000";
const TICKET_SERVICE_ENDPOINT = "/ticket-service/tickets";
const ANY = "any";

export const CATEGORY_OPTIONS = ["Software", "Hardware", "Network"] as const;

interface FiltersOptions {
  titulo: string;
  priority: string;
  status: string;
  category: string;
}

const EMPTY_FILTERS: FiltersOptions = {
  titulo: "",
  priority: ANY,
  status: ANY,
  category: ANY,
};

function applyFilters(
  tickets: Ticket[] | undefined,
  filters: FiltersOptions,
): Ticket[] {
  if (!tickets) return [];

  return tickets.filter((ticket) => {
    const matchesTitle =
      filters.titulo.trim() === "" ||
      ticket.title
        ?.toLocaleLowerCase()
        .includes(filters.titulo.toLocaleLowerCase());

    const matchesCategory =
      filters.category === ANY ||
      ticket.category?.category === filters.category;

    const matchesStatus =
      filters.status === ANY ||
      getStatusLabel(ticket.status?.status) === filters.status;

    const matchesPriority =
      filters.priority === ANY ||
      getPriorityLabel(ticket.priority?.priority) === filters.priority;

    return matchesTitle && matchesCategory && matchesStatus && matchesPriority;
  });
}

function TicketsTable() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [draftFilters, setDraftFilters] =
    useState<FiltersOptions>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<FiltersOptions>(EMPTY_FILTERS);

  useEffect(() => {
    const fetchTicketsPage = async (size = 30, page = 0) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${GATEWAY_URL + TICKET_SERVICE_ENDPOINT}?size=${size}&page=${page}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch tickets (${response.status})`);
        }

        const json = await response.json();
        setTickets(json.content || []);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar chamados",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicketsPage();
  }, []);

  function handleSearch() {
    setAppliedFilters(draftFilters);
  }

  function handleTitleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  const filteredTickets = applyFilters(tickets, appliedFilters);

  return (
    <>
      <div className="input-group mb-3">
        <div className="input-group-text p-0">
          <select
            className="form-select form-select-lg shadow-none form-control border-0"
            value={draftFilters.status}
            onChange={(e) =>
              setDraftFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option key="any" value={ANY}>
              qualquer
            </option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group-text p-0">
          <select
            className="form-select form-select-lg shadow-none form-control border-0"
            value={draftFilters.category}
            onChange={(e) =>
              setDraftFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option key="any" value={ANY}>
              qualquer
            </option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group-text p-0">
          <select
            className="form-select form-select-lg shadow-none form-control border-0"
            value={draftFilters.priority}
            onChange={(e) =>
              setDraftFilters((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option key="any" value={ANY}>
              qualquer
            </option>
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por título"
          value={draftFilters.titulo}
          onChange={(e) =>
            setDraftFilters((prev) => ({ ...prev, titulo: e.target.value }))
          }
          onKeyDown={handleTitleKeyDown}
        />
        <button
          type="button"
          className="input-group-text shadow-none px-4 btn-warning"
          onClick={handleSearch}
        >
          Pesquisar
        </button>
      </div>

      {error && (
        <p role="alert" className="text-danger">
          {error}
        </p>
      )}

      <div className="table-responsive overflow-auto table-div">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Id do Técnico</th>
              <th scope="col">Id do Cliente</th>
              <th scope="col">Status</th>
              <th scope="col">Categoria</th>
              <th scope="col">Prioridade</th>
              <th scope="col">Data da criação</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {loading ? (
              <tr>
                <td colSpan={7}>Carregando...</td>
              </tr>
            ) : (
              <TicketsDynamicList dynamicTicketsList={filteredTickets} />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TicketsTable;
