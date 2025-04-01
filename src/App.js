import { useReducer, useState } from "react"
import Header from "./components/Header"
import Meals from "./components/Meals"
import CartContext from "./store/CartContext"
import Modal from "./components/UI/Modal"

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )

    let updatedItems;

    if (existingCartItemIndex !== -1) {
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = {
        ...updatedItems[existingCartItemIndex],
        quantity: updatedItems[existingCartItemIndex].quantity + 1,
      }
    } else {
      updatedItems = [...state.items, { ...action.item, quantity: 1 }]
    }

    return { items: updatedItems }
  }

  return state
}

const App = () => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item })
  }

  const openModalHandler = () => {
    setIsModalOpen(true)
  }

  const closeModalHandler = () => {
    setIsModalOpen(false)
  }

  const checkoutHandler = () => {
    console.log("Checkout clicked!")
    setIsModalOpen(false)
  }

  const totalItems = cartState.items.reduce((total, item) => total + item.quantity, 0)

  
  return (
    <CartContext.Provider value={{ items: cartState.items, addItem: addItemToCartHandler }}>
      <Header onOpenCart={openModalHandler} totalItems={totalItems} />
      <main>
        <Meals />
        <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
          <h2>Cart</h2>
          <ul>
            {cartState.items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={closeModalHandler}>Close</button>
          <button onClick={checkoutHandler}>Checkout</button> 
        </Modal>
      </main>
    </CartContext.Provider>
  )
}

export default App
