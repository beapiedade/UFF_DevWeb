import { useMutation } from "@tanstack/react-query";

const useEfetuarLogin = () => {
  const efetuarLogin = async (usuarioLogin) => {
    const response = await fetch("http://localhost:8080/api/autenticacao/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(usuarioLogin),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      if (error) {
        throw new Error("Erro desconhecido ao efetuar login. Status code = " + response.status);
        
      } else {
        if (response.status === 401) {
          throw new Error(
            "Erro ao efetuar login. Status code = " + response.status
          );
        } else {
          throw new Error(
            "Erro desconhecido ao efetuar login. Status code = " + response.status
          );
        }
      }
    }

    return await response.json();
  };

  return useMutation({mutationFn: (usuarioLogin) => efetuarLogin(usuarioLogin)});
};

export default useEfetuarLogin;
