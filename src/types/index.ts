// Definicion de types para TypeScript
export type Guitar = {
    id : number,
    name : string,
    image : string,
    description : string,
    price : number,
}

// carItem extiende de Guitar, añadiendo la propiedad quantity
export type carItem = Guitar & {
    quantity: number
}

export type GuitarID = Guitar['id'] // type que representa el id de una guitarra (number)