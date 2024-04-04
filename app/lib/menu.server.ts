"use strict"
import { faker } from "@faker-js/faker"
import fs from "fs/promises"

export type MenuItem = {
  id: string
  image: string
  name: string
  price: string
  category: string
}

export async function generateMenuItems(numItems: number): Promise<MenuItem[]> {
  const menuItems = []

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
    }
    menuItems.push(menuItem)
  }

  return menuItems
}

async function main() {
  try {
    const numItems = 12 // Change this to the desired number of menu items
    const menuItems = await generateMenuItems(numItems)
    const fileName = "menu.json"
    await fs.writeFile(`app/${fileName}`, JSON.stringify(menuItems, null, 2))
  } catch (error) {
    console.error("Error:", error)
  }
}

main()
