"use strict";
import { faker } from "@faker-js/faker";
import fs from "fs/promises";

async function generateMenuItems(numItems: number) {
  const menuItems = [];

  for (let i = 0; i < numItems; i++) {
    const menuItem = {
      id: faker.database.mongodbObjectId(),
      image: faker.image.urlLoremFlickr({
        width: 300,
        height: 300,
        category: "food,sandwhich,salad",
      }),
      name: faker.lorem.words(),
      price: faker.commerce.price({
        min: 5,
        max: 25,
        symbol: "$",
      }),
      category: faker.helpers.arrayElement(["appetizer", "entree", "dessert"]),
    };
    menuItems.push(menuItem);
  }

  return menuItems;
}

let _menuItems: null | ReturnType<typeof generateMenuItems> = null;

export function getMenuItems() {
  if (!_menuItems) {
    _menuItems = generateMenuItems(12);
  }
  return _menuItems;
}