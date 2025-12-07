import { useNavigate } from "react-router-dom";
import useLoginStore from "../stores/useLoginStore";
import useTokenStore from "../stores/useTokenStore";

const useFetchWithAuth = () => {
  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const navigate = useNavigate();

  const fetchWithAuth = async (url, options) => {
    console.log("Entrou em fetchWithAuth - url = ", url);
    console.log("Entrou em fetchWithAuth - options = ", options);

    const token = tokenResponse.token;

    let newHeaders = {};

    if (options && options.headers) {
      newHeaders = { ...options.headers };
    }

    if (token !== "") {
      newHeaders["Authorization"] = `Bearer ${token}`;
    }

    options = { ...(options || {}), headers: newHeaders };

    console.log("url da requisição = ", url);
    console.log("options da requisição = ", options);

    const response = await fetch(url, { ...options });

    if (!response.ok) {
      console.log("Ocorreu um erro com status = ", response.status);

      if (response.status === 401) {
        setLoginInvalido(true);
        setMsg("Necessário estar autenticado para acessar este recurso.");
        setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
      } else if (response.status === 403) {
        setLoginInvalido(true);
        setMsg("Você não tem permissão para acessar este recurso.");
      } else {
        const error = await response.json().catch(() => ({}));

        if (error) throw error;
        else {
          throw new Error(
            "Erro desconhecido: " + " - Status code: " + response.status
          );
        }
      }
    }

    return response;
  };

  return { fetchWithAuth };
};

export default useFetchWithAuth;
