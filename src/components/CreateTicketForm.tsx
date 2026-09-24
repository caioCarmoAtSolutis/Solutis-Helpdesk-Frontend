import { useForm } from "react-hook-form";
import { useState } from "react";
import "./CreateTicketForm.css";

const GATEWAY_URL = "http://localhost:9000";
const TICKET_SERVICE_ENDPOINT = "/ticket-service/tickets";

interface TicketFormData {
  title: string;
  customerId: string;
  description: string;
  category: string;
  priority: string;
}

export function getCategory(category: string) {
  switch (category) {
    case "Software":
      return "SOFTWARE";
    case "Hardware":
      return "HARDWARE";
    case "Network":
      return "NETWORK";
  }
}

export function getPriority(priority: string) {
  switch (priority) {
    case "Baixa":
      return "LOW";
    case "Média":
      return "MEDIUM";
    case "Alta":
      return "HIGH";
    case "Crítica":
      return "CRITICAL";
  }
}

async function createTicket(data: TicketFormData) {
  const response = await fetch(`${GATEWAY_URL + TICKET_SERVICE_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: data.customerId,
      title: data.title,
      description: data.description,
      category: { category: getCategory(data.category) },
      priority: { priority: getPriority(data.priority) },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Server responded with:", response.status, errorBody);
    throw new Error(`Failed to create ticket: ${response.status} ${errorBody}`);
  }

  return response.json();
}

function CreateTicketForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormData>();

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit = async (data: TicketFormData) => {
    setSubmitStatus(null);
    try {
      await createTicket(data);
      setSubmitStatus({
        type: "success",
        message: "Chamado criado com sucesso!",
      });
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus({
        type: "error",
        message: "Não foi possível criar o chamado. Tente novamente.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submitStatus && (
        <div
          className={
            submitStatus.type === "success"
              ? "alert alert-success"
              : "alert alert-danger"
          }
          role="alert"
        >
          {submitStatus.message}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          className={`form-control ${errors?.title} input-error`}
          id="title"
          placeholder="Título do chamado"
          {...register("title", { required: true })}
        />
        {errors?.title?.type === "required" && (
          <p className="error-message">O título é obrigatório!</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="clientId">Id do cliente</label>
        <input
          className={`form-control ${errors?.customerId} input-error`}
          id="clientId"
          placeholder="id do cliente"
          {...register("customerId", { required: true })}
        />
        {errors?.customerId?.type === "required" && (
          <p className="error-message">O id do usuário é obrigatório!</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="description-text-area">Descrição</label>
        <textarea
          className={`form-control ${errors?.description} input-error`}
          id="description-text-area"
          rows={3}
          placeholder="Descrição completa do problema"
          {...register("description", { required: true })}
        ></textarea>
        {errors?.description?.type === "required" && (
          <p className="error-message">A descrição é obrigatória!</p>
        )}
      </div>
      <div className="select-field">
        <label htmlFor="select-category">Categoria</label>
        <select
          className="form-control"
          id="select-category"
          {...register("category", { required: true })}
        >
          <option>Hardware</option>
          <option>Software</option>
          <option>Network</option>
        </select>
      </div>
      <div className="select-field">
        <label htmlFor="select-priority">Prioridade</label>
        <select
          className="form-control"
          id="select-priority"
          {...register("priority", { required: true })}
        >
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
          <option>Crítica</option>
        </select>
      </div>
      <div className="col-auto form-btn">
        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={isSubmitting}
        >
          Criar
        </button>
      </div>
    </form>
  );
}

export default CreateTicketForm;
