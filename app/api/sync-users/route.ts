import { client } from "@/sanity/lib/client";
import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const payload = await req.json();
  const headerList = await headers();
  const svix_id = headerList.get("svix-id");
  const svix_timestamp = headerList.get("svix-timestamp");
  const svix_signature = headerList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred", { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let evt: any;

  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Error occurred", { status: 400 });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;
  const email = email_addresses[0].email_address;

  try {
    await client.createOrReplace({
      _type: "user",
      _id: `user-${id}`,
      clerkId: id,
      name: `${first_name} ${last_name}`,
      email: email,
      role: "viewer",
    });
  } catch (error) {
    console.error("Error syncing user:", error);
    return new Response("Error syncing user", { status: 500 });
  }

  return new Response("User synced successfully", { status: 200 });
}
