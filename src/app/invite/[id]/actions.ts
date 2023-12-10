import { supabase } from "@fiwedding/lib/supabase";
import { redirect } from "next/navigation";
import z from "zod";
import { GuestType } from "./type";

const schema = z.object({
  id: z.string().uuid(),
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
    .or(`id.eq.${id},invited_group_id.eq.${id}`);

  if (error) {
    redirect("/search-invite");
  }

  return data;
}
