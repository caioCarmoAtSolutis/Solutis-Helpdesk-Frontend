import { useForm } from "react-hook-form";
import "./CreateTicketForm.css";

const onSubmit = (data: any) => {};

function CreateTicketForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
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
        <label htmlFor="select-technician">Técnico</label>
        <select
          className="form-control"
          id="select-technician"
          {...register("technician", { required: true })}
        >
          <option>Caio</option>
          <option>Guilherme</option>
          <option>JV</option>
          <option>nenhum</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="user-email">Email do usuário</label>
        <input
          className={`form-control ${errors?.email} input-error`}
          id="user-email"
          placeholder="email@example.com"
          {...register("email", { required: true })}
        />
        {errors?.email?.type === "required" && (
          <p className="error-message">O email do usuário é obrigatório!</p>
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
          onClick={() => handleSubmit(onSubmit)()}
        >
          Criar
        </button>
      </div>
    </>
  );
}

export default CreateTicketForm;
