
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCalendarEvent(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const note = formData.get("note") as string;
  const event_date = formData.get("event_date") as string;
  const event_time = formData.get("event_time") as string;

  await supabase.from("calendar_events").insert({
    title,
    note: note || null,
    event_date,
    event_time: event_time || null,
  });
  revalidatePath("/admin/calendario");
}

export async function deleteCalendarEvent(id: string) {
  const supabase = await createClient();
  await supabase.from("calendar_events").delete().eq("id", id);
  revalidatePath("/admin/calendario");
}