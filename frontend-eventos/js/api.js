const BASE_URL = 'http://localhost:3000'; // URL do backend

export async function getGroups() {
  const response = await fetch(`${BASE_URL}/groups/list`);
  if (!response.ok) {
    throw new Error('Erro ao buscar grupos');
  }
  return response.json();
}

// Você pode seguir esse padrão para usuários, eventos, empresas etc.
