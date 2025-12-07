import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { size, z } from "zod";
import useTokenStore from "../stores/useTokenStore";
import useLoginStore from "../stores/useLoginStore";
import useEfetuarLogin from "../hooks/useEfetuarLogin";

const schema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  senha: z.string().nonempty({ message: "Senha é obrigatória." }),
});

const LoginForm = () => {
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const msg = useLoginStore((s) => s.msg);
  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTokenResponse({ idUsuario: 0, token: "", nome: "", role: "" });

    if (location.state?.msg) {
        setMsg(location.state.msg);
        setLoginInvalido(true);
    }
    return () => {
      setLoginInvalido(false);
      setMsg("");
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const { mutate: efetuarLogin } = useEfetuarLogin();

  const onSubmit = ({ email, senha }) => {
    const usuarioLogin = { email, senha };

    efetuarLogin(usuarioLogin, {
      onSuccess: (tokenResp) => {
        setTokenResponse({
          idUsuario: tokenResp.idUsuario,
          token: tokenResp.token,
          nome: tokenResp.nome,
          role: tokenResp.role,
        });

        if (location.state?.destino) {
          navigate(location.state.destino);
        } else {
          navigate("/");
        }
      },

      onError: (error) => {
        if (error.message.includes("404")) {
          setLoginInvalido(true);
          setMsg("Login inválido");
        } else {
          if (error.message.includes("401")) {
            setLoginInvalido(true);
            setMsg("Email ou senha inválidos.");
          } else {
            setLoginInvalido(true);
            setMsg(
              "Não foi possível efetuar o login. Por favor, tente mais tarde."
            );
          }
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <fieldset>
        <div>
          <label htmlFor="email">E-mail</label>
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
          <label htmlFor="senha">Senha</label>
          <input
            {...register("senha")}
            type="password"
            id="senha"
            className={`form-control ${errors.senha ? "is-invalid" : ""}`}
          />
          {errors.senha && (
            <div className="formulario-erro">{errors.senha.message}</div>
          )}
        </div>

        <p style={{fontSize: "14px", color: "gray"}}> Não tem conta? <a style={{color: "purple"}} href="/novo-usuario">Criar conta</a> </p>

        <button type="submit" disabled={isSubmitting}>
          Logar
        </button>
      </fieldset>
    </form>
  );
};

export default LoginForm;
