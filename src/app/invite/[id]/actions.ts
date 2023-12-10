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

  const { data: guest, error: errorGuest } = await supabase
    .from("invited_guest")
    .select("id, first_name, last_name, email, confirmed")
    .eq("id", id)
    .limit(1);

  if (!errorGuest && guest.length === 1) {
    return guest;
  }

  const { data: guestGroup, error: errorGroup } = await supabase
    .from("invited_group")
    .select("id, first_name, last_name, email, confirmed")
    .eq("invited_group_id", id);

  if (!errorGroup && guestGroup.length > 0) {
    return guestGroup;
  }

  redirect("/search-invite");
}
