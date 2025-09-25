import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import type { Guitar, carItem, GuitarID } from "../types"

export const useCart = () => {

    // Hook logic here
    const initialCart = () :  carItem[] => {
        const localStorageCart = localStorage.getItem('cart') // obtener el carrito del localStorage
        return localStorageCart ? JSON.parse(localStorageCart) : [] // si existe, parsearlo a un array, si no, retornar un array vacio
    } 

    // State
    const [data, ] = useState(db)
    const [cart, setCart] = useState(initialCart) // carrito de compras, inicializado con la funcion initialCart

    // Constants
    
    const MAX_ITEMS = 7
    const MIN_ITEMS = 1

    // Effects

    useEffect( () => {
        localStorage.setItem('cart', JSON.stringify(cart)) // guardar el carrito en el localStorage como un string, ya que el localStorage solo acepta strings
    }, [cart]) // cada vez que el carrito cambie, se ejecuta el useEffect

    // Functions
    
    function addToCart(item : Guitar) { // agregar un producto al carrito

        // si un elemento no se encuentra, findIndex() devuelve -1
        const itemExists = cart.findIndex(guitar => guitar.id === item.id) // buscar si el item ya existe en el carrito
        
        if(itemExists !== -1) { // existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEMS) return // si la cantidad es mayor o igual a 7, no hacer nada
            const updatedCart = [...cart] // crear una copia del carrito actual, para no mutar el state directamente
            updatedCart[itemExists].quantity++ // le pasamos la posicion (itemExists) a la copia e incrementar la cantidad del item que ya existe
            setCart(updatedCart) // actualizar el state del carrito con la copia modificada
        } else {
            const newItem = {...item, quantity: 1} // si no existe, crear un nuevo objeto con los datos del item y la cantidad inicial en 1
            setCart([...cart, newItem]) // agregar el nuevo item al carrito, creando una copia del carrito actual y añadiendo el nuevo item
        }
        
    }

    function increaseQuantity(id : GuitarID) {
        // aumentar la cantidad de un producto en el carrito por su id
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS) { // si el id del item es igual al id que se pasa por parametro y la cantidad es menor a 7
                return { // crear un nuevo objeto con los datos del item y la cantidad aumentada
                    ...item,
                    quantity: item.quantity + 1 // aumentar la cantidad en 1
                }
            }
            return item 
        })
        setCart(updatedCart) // actualizar el state del carrito con la copia modificada
    }


    function decreaseQuantity(id : GuitarID) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS) { // si el id del item es igual al id que se pasa por parametro y la cantidad es mayor a 1
                return { // crear un nuevo objeto con los datos del item y la cantidad disminuida
                    ...item,
                    quantity: item.quantity - 1 // disminuir la cantidad en 1
                }
            }
            return item // si no se cumple la condicion, devolver el item sin modificar
        })
        setCart(updatedCart) // actualizar el state del carrito con la copia modificada
    }

    function removeFromCart(id : GuitarID) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) // eliminar un producto del carrito por su id

    }

    function clearCart() {
        setCart([]) // vaciar el carrito
    }

    // State Derived

    // useMemo: memoriza un valor calculado, solo se vuelve a calcular si las dependencias cambian. No rendereiza toda la pagina, solo el valor que depende de las dependencias
    const isEmpty = useMemo( () => cart.length === 0, [cart]) // true si el carrito esta vacio, false si tiene elementos
    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]) // calcular el total si cambia el carrito

    return {
        data,
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart, 
        isEmpty,
        cartTotal
    }

}

