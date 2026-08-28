import { supabase } from "./supabase";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

export async function signInAdmin(email: string, password: string): Promise<AdminUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(
      error.message === "Invalid login credentials"
        ? "Correo o contraseña incorrectos"
        : error.message
    );
  }

  if (!data.user) {
    throw new Error("No se pudo obtener el usuario");
  }

  const role = data.user.user_metadata?.role;
  if (role !== "admin") {
    await supabase.auth.signOut();
    throw new Error("Esta cuenta no tiene permisos de administrador");
  }

  return {
    id: data.user.id,
    email: data.user.email || "",
    name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Admin",
    role: "admin",
  };
}

export async function signOutAdmin() {
  await supabase.auth.signOut();
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const role = user.user_metadata?.role;
  if (role !== "admin") return null;

  return {
    id: user.id,
    email: user.email || "",
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin",
    role: "admin",
  };
}