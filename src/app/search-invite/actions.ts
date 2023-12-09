"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { supabase } from "@fiwedding/app/lib/supabase";
import { type ErrorFormType } from "./type";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export async function searchInvited(
  prevState: any,
  formData: FormData
): Promise<ErrorFormType | undefined> {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, error } = await supabase
    .from("invited_guest")
    .select("id, email, invited_group_id")
    .eq("email", validatedFields.data.email.toLowerCase())
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  if (data.length === 1) {
    if (data[0].invited_group_id === null) {
      redirect(`/invite/${data[0].id}`);
    }
    redirect(`/invite/${data[0].invited_group_id}`);
  }

  return {
    errors: {
      email: ["Email not found"],
    },
  };
}
