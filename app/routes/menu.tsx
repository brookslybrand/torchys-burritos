import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { getMenuItems, MenuItem } from "~/lib/menu.server";

export async function loader() {
  const menu = await getMenuItems();

  const categories = menu.reduce((acc, item) => {
    if (!acc.has(item.category)) {
      acc.set(item.category, []);
    }

    acc.get(item.category)?.push(item);

    return acc;
  }, new Map<string, MenuItem[]>());

  return { menu, catEntries: Array.from(categories.entries()) };
}

export default function Menu() {
  const { menu, catEntries } = useLoaderData<typeof loader>();

  const categories = useMemo(() => {
    return new Map(catEntries);
  }, [catEntries]);

  return (
    <div>
      <div className="relative">
        <img
          src="/menu-splash.webp"
          alt="Menu"
          className="w-full h-72 object-cover"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold">Our Menu</h1>
        </div>
      </div>

      <div className="p-4">
        {Array.from(categories.entries()).map(([category, items]) => (
          <div key={category} className="p-4">
            <h2 className="text-2xl mb-8">{lowerToDisplayCase(category)}</h2>

            <div className="grid grid-cols-3 gap-6">
              {items.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuItem(props: { item: MenuItem }) {
  return (
    <div className="border border-black rounded">
      <img
        src={props.item.image}
        alt={props.item.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4 mt-2">
        <h3 className="text-lg font-bold">{props.item.name}</h3>
        <p className="text-gray-500">{props.item.price}</p>
        <button className="mt-4 w-full bg-gray-800 text-white px-4 py-2 rounded">
          Add to cart
        </button>
      </div>
    </div>
  );
}

function lowerToDisplayCase(str: string) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
