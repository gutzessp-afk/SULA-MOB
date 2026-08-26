export type UserRole = "admin" | "operator";

export interface MockUser {
  username: string;
  password: string;
  role: UserRole;
  area: string | null;
  name: string;
}

export const mockUsers: MockUser[] = [
  { username: "admin", password: "admin123", role: "admin", area: null, name: "Administrador" },
  { username: "corte_tubo", password: "corte123", role: "operator", area: "Corte de Tubo", name: "Operador Corte de Tubo" },
  { username: "doblez", password: "doblez123", role: "operator", area: "Doblez", name: "Operador Doblez" },
  { username: "corte_lamina", password: "lamina123", role: "operator", area: "Corte de Lámina", name: "Operador Corte de Lámina" },
  { username: "soldadura", password: "soldadura123", role: "operator", area: "Soldadura", name: "Operador Soldadura" },
  { username: "alambron", password: "alambron123", role: "operator", area: "Alambrón", name: "Operador Alambrón" },
  { username: "pintura", password: "pintura123", role: "operator", area: "Pintura", name: "Operador Pintura" },
  { username: "empaque", password: "empaque123", role: "operator", area: "Empaque", name: "Operador Empaque" },
];
