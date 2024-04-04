import menuJson from "./menu.json";

export type MenuItem = {
  id: string;
  image: string;
  name: string;
  price: string;
  category: string;
};

export function getMenuItems() {
  return menuJson;
}
