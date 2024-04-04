import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { useFetcher } from "@remix-run/react";
import { addToCart } from "~/lib/cart.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const itemId = formData.get("id");
  if (typeof itemId !== "string") {
    throw new Error("Invalid item ID");
  }

  const intent = formData.get("intent");

  console.log({ intent });

  if (intent === "add") {
    await addToCart({ id: itemId, quantity: 1 });
  } else if (intent === "remove") {
    console.log("remove");
    await addToCart({ id: itemId, quantity: -1 });
  }

  return {};
}

export function AddToCart({ id }: { id: string }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/add-to-cart">
      <input type="hidden" name="intent" value="add" />
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border rounded-sm p-2">
        Add to Cart
      </button>
    </fetcher.Form>
  );
}

export function RemoveFromCart({ id }: { id: string }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/add-to-cart">
      <input type="hidden" name="intent" value="remove" />
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border rounded-sm p-2">
        Remove from Cart
      </button>
    </fetcher.Form>
  );
}
