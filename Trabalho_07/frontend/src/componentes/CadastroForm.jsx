import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCadastrarUsuario from "../hooks/useCadastrarUsuario";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../stores/useTokenStore";

const schema = z.object({
  nome: z.string().min(3, { message: "Mínimo 3 caracteres." }),
  email: z.string().email({ message: "E-mail inválido." }),
  senha: z.string().min(3, { message: "Senha é obrigatória." }),
  role: z.string().optional(),
});

const CadastroForm = () => {
  const { tokenResponse } = useTokenStore(); 
  const usuarioEhAdmin = tokenResponse.role === "ADMIN";
  const cadastrarPublic = useCadastrarUsuario("public");
  const cadastrarAdmin = useCadastrarUsuario("admin");

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    let cadastrar;

    if (usuarioEhAdmin) {
      cadastrar = cadastrarAdmin;
    } else {
      data.role = "USER";
      cadastrar = cadastrarPublic;
    }
    
    cadastrar.mutate(data, {
      onSuccess: () => {
        alert("Usuário cadastrado!");
        navigate("/login");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <fieldset>
        <div>
          <label>Nome</label>
          <input {...register("nome") } className="form-control" />
          {errors.nome && <div>{errors.nome.message}</div>}
        </div>

        <div>
          <label>Email</label>
          <input {...register("email")} className="form-control" />
          {errors.email && <div>{errors.email.message}</div>}
        </div>

        <div>
          <label>Senha</label>
          <input type="password" {...register("senha")} className="form-control" />
          {errors.senha && <div>{errors.senha.message}</div>}
        </div>

        {usuarioEhAdmin && (
          <div>
            <label>Permissão</label>
            <select className="combo-box" {...register("role")}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          Cadastrar
        </button>
      </fieldset>
    </form>
  );
};

export default CadastroForm;