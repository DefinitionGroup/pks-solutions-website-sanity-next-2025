import { client } from "@/sanity/lib/client";
import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req: Request) {
  // 1. Parse incoming request
  let payload;
  try {
    payload = await req.json();
    console.log("Received payload:", JSON.stringify(payload));
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return new Response("Invalid JSON", { status: 400 });
  }

  // 2. Read headers
  let headerList;
  try {
    headerList = await headers();
    console.log("Headers:", JSON.stringify([...headerList]));
  } catch (e) {
    console.error("Failed to get headers:", e);
    return new Response("Error occurred", { status: 400 });
  }
  const svix_id = headerList.get("svix-id");
  const svix_timestamp = headerList.get("svix-timestamp");
  const svix_signature = headerList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing webhook headers");
    return new Response("Missing headers", { status: 400 });
  }

  // 3. Verify webhook
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let evt: any;
  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any;
    console.log("Webhook verified:", evt);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid webhook signature", { status: 400 });
  }

  // 4. Extract data (log evt.data)
  const { id, email_addresses, first_name, last_name } = evt.data;
  if (!id || !email_addresses || !email_addresses[0]?.email_address) {
    console.error("Missing Clerk user data", evt.data);
    return new Response("Missing Clerk user data", { status: 400 });
  }
  const email = email_addresses[0].email_address;
  console.log(
    `Syncing Clerk user: id=${id}, email=${email}, name=${first_name} ${last_name}`
  );

  // 5. Sync to Sanity
  try {
    const sanityResponse = await client.createOrReplace({
      _type: "user",
      _id: `user-${id}`,
      clerkId: id,
      name: `${first_name} ${last_name}`.trim(),
      email: email,
      role: "viewer",
    });
    console.log("Sanity response:", sanityResponse);
  } catch (error) {
    console.error("Error syncing user to Sanity:", error);
    return new Response("Error syncing user", { status: 500 });
  }

  return new Response("User synced successfully", { status: 200 });
}
