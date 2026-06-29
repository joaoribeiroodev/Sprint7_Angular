export interface Usuario {
  id: number | string;
  nome: string;
  senha?: string;
  email: string;
}

export interface LoginRequest {
  nome: string;
  senha: string;
}
