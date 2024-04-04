let cart = [] as CartItem[];

interface CartItem {
  id: string;
  quantity: number;
}

export async function getCartCount() {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

export async function addToCart(item: CartItem) {
  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    const newQuantity = existingItem.quantity + item.quantity;
    existingItem.quantity = Math.max(newQuantity, 0);
  } else {
    cart.push({ ...item, quantity: Math.max(item.quantity, 0) });
  }
}

export async function removeFromCart(itemId: string) {
  cart = cart.filter((i) => i.id !== itemId);
}
