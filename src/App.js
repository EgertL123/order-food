import { useReducer, useState, useEffect } from "react"
import Header from "./components/Header"
import Meals from "./components/Meals"
import CartContext from "./store/CartContext"
import Modal from "./components/UI/Modal"

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )

    let updatedItems

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

  if (action.type === "CLEAR_CART") {
    return { items: [] }
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
    if (cartState.items.length > 0) {
      setIsModalOpen(true)
      console.log("Checkout started")
      cartState.items.forEach((item) => {
        console.log("Ostukorv sisaldab toodet:", item);
        console.log(`ID: ${item.id}, Name: ${item.name}, Price: ${item.price}, Description: ${item.description}, Image: ${item.image}, Quantity: ${item.quantity}`);
      })
    }
  }

  const closeModalHandler = () => {
    setIsModalOpen(false)
  }

  const checkoutHandler = () => {
    console.log("Checkout clicked!")
    dispatchCartAction({ type: "CLEAR_CART" })
    setIsModalOpen(false)
    alert("Ost teostatud!")
  }

  const totalItems = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  useEffect(() => {
    console.log("Cart items:", cartState.items)
  }, [cartState.items])

  return (
    <CartContext.Provider value={{ items: cartState.items, addItem: addItemToCartHandler }}>
      <Header onOpenCart={openModalHandler} totalItems={totalItems} />
      <main>
        <Meals />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModalHandler}
          items={cartState.items}
          onCheckout={checkoutHandler}
          onCloseModal={closeModalHandler}
        />
      </main>
    </CartContext.Provider>
  )
}

export default App
