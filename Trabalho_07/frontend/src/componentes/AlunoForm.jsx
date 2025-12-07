import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useAlterarAluno from "../hooks/useAlterarAluno";
import useCadastrarAluno from "../hooks/useCadastrarAluno";
import useAlunoStore from "../stores/useAlunoStore";

const schema = z.object({
  nome: z.string().min(3, { message: "Mínimo 3 caracteres." }).max(100, { message: "Máximo 100 caracteres." }),
  email: z.string().email({ message: "E-mail inválido." }),
  curso: z.string().min(3, { message: "Mínimo 3 caracteres." }).max(100, { message: "Máximo 100 caracteres." }),
  ingresso: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Deve estar no formato AAAA-MM-DD."}),
});

const AlunoForm = () => {
  const novoAluno = useAlunoStore((state) => state.alunoSelecionado);
  const cadastrarAluno = useCadastrarAluno();
  const alterarAluno = useAlterarAluno();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({resolver: zodResolver(schema)});

  useEffect(() => {
    inicializarFormulario();
  }, [novoAluno]);

  const inicializarFormulario = () => {
    if (novoAluno?.id) {
      setValue("nome", novoAluno.nome);
      setValue("email", novoAluno.email);
      setValue("curso", novoAluno.curso);
      setValue("ingresso", novoAluno.ingresso);
    } else {
      reset();
    }
  };

  const onSubmit = (data) => {
    if (novoAluno?.id) {
      alterarAluno.mutate(
        { ...data, id: novoAluno.id },
        {
          onSuccess: (alunoAlterado) => {
            alert("Aluno alterado com sucesso!");
            navigate(`/aluno/${alunoAlterado.id}`);
          },
          onError: (error) => {
            alert("Erro ao alterar aluno: " + error.message);
            if (error.message === "Necessário estar autenticado para acessar este recurso.") {
              navigate("/login");
            }
          },
        }
      );
    } else {
      cadastrarAluno.mutate(data, {
        onSuccess: (alunoCadastrado) => {
          alert("Aluno cadastrado com sucesso!");
          navigate(`/aluno/${alunoCadastrado.id}`);
        },
        onError: (error) => {
          alert("Erro ao cadastrar aluno: " + error.message);
          if (error.message === "Necessário estar autenticado para acessar este recurso.") {
            navigate("/login");
          }
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <fieldset>
        <div>
          <label htmlFor="nome"> Nome </label>
          <input
            {...register("nome")}
            type="text"
            id="nome"
            className={`form-control ${errors.nome ? "is-invalid" : ""}`}
          />
          {errors.nome && (
            <div className="formulario-erro">{errors.nome.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="email"> E-mail </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && (
            <div className="formulario-erro">{errors.email.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="curso"> Curso </label>
          <input
            {...register("curso")}
            type="text"
            id="curso"
            className={`form-control ${errors.curso ? "is-invalid" : ""}`}
          />
          {errors.curso && (
            <div className="formulario-erro">{errors.curso.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="ingresso"> Data de Ingresso </label>
          <input
            {...register("ingresso")}
            type="date"
            id="ingresso"
            className={`form-control ${errors.ingresso ? "is-invalid" : ""}`}
          />
          {errors.ingresso && (
            <div className="formulario-erro">{errors.ingresso.message}</div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {novoAluno?.id ? ( <>Alterar</> ) : ( <>Cadastrar</> )}
        </button>

        <button onClick={() => inicializarFormulario()} style={{marginLeft: "15px"}}>
          Cancelar
        </button>
      </fieldset>
    </form>
  );
};

export default AlunoForm;