"use server";

import { z } from "zod";
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
  return undefined;
}
