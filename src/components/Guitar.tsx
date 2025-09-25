import type { Guitar } from "../types"

type GuitarProps = {
    guitar : Guitar, 
    addToCart : (item:Guitar) => void
}

export default function Guitar({guitar, addToCart} : GuitarProps) { 
    
    // Destructuring
    const { name, image, description, price} = guitar

    return (
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">$ {price} </p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        // el arrow function es para que no se ejecute inmediatamente, sino al hacer click (esperar al evento)
                        onClick={ () => addToCart(guitar)} // agregar un producto al carrito sin perder los productos que ya habia
                    >Agregar al Carrito</button>
                </div>
            </div>
    )
}