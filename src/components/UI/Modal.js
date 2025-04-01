import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import Button from "./Button"

const Modal = (props) => {
  const dialogRef = useRef()

  useEffect(() => {
    if (props.isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }

    return () => {
      dialogRef.current?.close()
    }
  }, [props.isOpen])

  return ReactDOM.createPortal(
    <dialog ref={dialogRef} className="modal cart">
      <div className="modal-content">
        <h2>Your Cart</h2>
        <ul>
          {props.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <h3>
            Total:{" "}
            {new Intl.NumberFormat("et-EE").format(
              props.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )
            )}{" "}
            €
          </h3>
        </div>
        <div className="modal-actions">
          <Button textOnly onClick={props.onCloseModal}>Close</Button>
          <Button textOnly={false} onClick={props.onCheckout}>Checkout</Button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  )
}

export default Modal
