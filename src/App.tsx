import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { useCart } from "./hooks/useCart"

function App() {

    // Custom Hook
    const { data, cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, isEmpty, cartTotal } = useCart()



  return (
    <>

    <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        descreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => ( // recorrer el array de productos y renderizar un componente Guitar por cada uno
                <Guitar  // componente Guitar
                    key={guitar.id}
                    guitar={guitar}
                    addToCart={addToCart}
                />
            ))}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">&copy; 2025 StrumpShop  - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
