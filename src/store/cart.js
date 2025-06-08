import { reactive } from 'vue'
import { showAlert } from '../services/alert'

export const cart = reactive({
  items: [],

  addToCart(product, quantity = 1) {
    const item = cart.items.find(i => i.id === product.id)
    const availableStock = product.stock
    try {
      if (item) {
        const newQuantity = item.quantity + quantity
        if (newQuantity <= availableStock) {
          item.quantity = newQuantity
        } else {
          item.quantity = availableStock
          showAlert('Quantidade ajustada ao limite do estoque disponível!', 'warning')
        }
      } else {
        const addedQuantity = quantity <= availableStock ? quantity : availableStock
        cart.items.push({ ...product, quantity: addedQuantity })
        if (quantity > availableStock) {
          showAlert('Quantidade ajustada ao limite do estoque disponível!', 'warning')
        }
      }
    }
    finally{
      showAlert(`Produto ${product.title} adicionado na sacola com sucesso!!`)
    }
  },

  removeFromCart(id) {
    cart.items = cart.items.filter(i => i.id !== id)
  },

  updateQuantity(id, quantity) {
    const item = cart.items.find(i => i.id === id)
    if (item) {
      if (quantity <= 0) {
        cart.removeFromCart(id)
      } else if (quantity <= item.stock) {
        item.quantity = quantity
      } else {
        item.quantity = item.stock
        showAlert('Quantidade ajustada ao limite do estoque disponível!', 'warning')
      }
    }
  },

  clearCart() {
    cart.items = []
  },

  get totalItems() {
    return cart.items.reduce((acc, item) => acc + item.quantity, 0)
  },

  get totalPrice() {
    return cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
  }
})
