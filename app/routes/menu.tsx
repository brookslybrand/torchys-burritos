import { useLoaderData } from "@remix-run/react";
import { getMenuItems } from "~/lib/menu.server";

export async function loader() {
  const menu = await getMenuItems();
  return { menu };
}

export default function Menu() {
  const { menu } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>this is the menu</h1>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            {item.name} {item.category} {item.image} {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
