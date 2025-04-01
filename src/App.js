import { CartProvider } from './store/CartContext'
import Header from './components/Header'
import Meals from './components/Meals'

function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App