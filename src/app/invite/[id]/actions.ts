"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { zfd } from "zod-form-data";
import { supabase } from "@fiwedding/lib/supabase";
import { GuestType } from "./type";

const schema = z.object({
  id: z.string().uuid(),
});

const schemaFormData = zfd.formData({
  invited_id: z.string().uuid(),
});

export async function inviteValidate({
  id,
}: {
  id: string;
}): Promise<GuestType[]> {
  const validatedParams = schema.safeParse({
    id,
  });

  if (!validatedParams.success) {
    redirect("/search-invite");
  }

  const { data, error } = await supabase
    .from("invited_guest")
    .select("id, first_name, last_name, email, confirmed, invited_group_id")
    .or(`id.eq.${id}, invited_group_id.eq.${id}`);

  if (error) {
    redirect("/search-invite");
  }

  return data;
}

export async function inviteConfirm(formData: FormData) {
  const validatedParams = schemaFormData.safeParse(formData);

  if (!validatedParams.success) {
    redirect("/search-invite");
  }

  const { data, error } = await supabase
    .from("invited_guest")
    .select("id, first_name, last_name, email, confirmed, invited_group_id")
    .or(
      `id.eq.${formData.get("invited_id")}, invited_group_id.eq.${formData.get(
        "invited_id"
      )}`
    );

  if (error) {
    redirect("/search-invite");
  }

  const invited = formData.getAll("confirmed[]");
  for (const guest of data) {
    let confirmed = false;
    if (invited.includes(guest.id)) {
      confirmed = true;
    }
    await supabase
      .from("invited_guest")
      .update({ confirmed })
      .eq("id", guest.id);
  }
}
