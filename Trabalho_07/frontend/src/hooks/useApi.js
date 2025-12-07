import useFetchWithAuth from "./useFetchWithAuth";

const useApi = (endpoint) => {
  const { fetchWithAuth } = useFetchWithAuth();
  const URL = `http://localhost:8080/api/${endpoint}`;

  const handleResponse = async (response) => {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      if (error) throw error;

      throw new Error(
        "Erro " + response.status
      );
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  };

  const get = async (id) => {
    const response = await fetchWithAuth(`${URL}/${id}`);
    return await handleResponse(response);
  };

  const getAll = async () => {
    const response = await fetchWithAuth(URL);
    return await handleResponse(response);
  };

  const criar = async (obj) => {
    const response = await fetchWithAuth(URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      let erro = null;

      try {
        erro = await response.json();
      } catch (e) {
        erro = null;
      }

      if (erro && typeof erro === "object") {
        throw new Error(Object.values(erro).join("\n"));
      }
      if (response.status === 401) {
        throw new Error("Necessário estar autenticado para acessar este recurso.");
      }

      if (response.status === 403) {
        throw new Error("Você não tem permissão para acessar este recurso.");
      }
    }

    return await handleResponse(response);
  };


  const alterar = async (obj) => {
    const response = await fetchWithAuth(URL, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      let erro = null;

      try {
        erro = await response.json();
      } catch (_) {}

      if (erro && typeof erro === "object") {
        throw new Error(Object.values(erro).join("\n"));
      }

      throw new Error("Erro ao alterar aluno.");
    }

    return await handleResponse(response);
  };

  const excluir = async (id) => {
    const response = await fetchWithAuth(`${URL}/${id}`, {
      method: "DELETE",
    });
    
    if (response.status === 401) {
      throw new Error("Necessário estar autenticado para acessar este recurso.");
    }

    if (response.status === 403) {
      throw new Error("Você não tem permissão para acessar este recurso.");
    }

    if (!response.ok) {
      throw new Error("Erro ao excluir aluno.");
    }

    return await handleResponse(response);
};

  return {
    get,
    getAll,
    criar,
    alterar,
    excluir,
  };
};

export default useApi;
