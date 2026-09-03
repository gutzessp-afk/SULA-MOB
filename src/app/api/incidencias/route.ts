import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("incidencias")
    .insert({
      proyecto_id: body.proyecto_id,
      operador_id: body.operador_id,
      area: body.area,
      severidad: body.severidad,
      descripcion: body.descripcion,
    })
    .select("*, projects(nombre, codigo), operators(nombre)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    await fetch(process.env.N8N_WEBHOOK_INCIDENCIAS!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sula-token": process.env.N8N_TOKEN!,
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.error("n8n no respondió:", e);
  }

  return NextResponse.json(data, { status: 201 });
}