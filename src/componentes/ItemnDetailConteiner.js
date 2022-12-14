import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import ItemDetail from "./ItemDetail"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

const ItemDetailContainer = () => {

    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)

    const {itemId} = useParams()

    useEffect(() => {
        setLoading(true)

         // 1.- Armar la referencia (sync)
         const docRef = doc(db, 'productos', itemId)
         // 2.- Llamar a la DB (async)
         getDoc(docRef)
             .then((doc) => {
                 setItem({id: doc.id, ...doc.data()})
             })
             .finally(() => {
                 setLoading(false)
             })

    
       

    }, [itemId])

    return (
        <div>
            {
                loading
                ? <h2>Cargando Producto...</h2>
                : <ItemDetail item={item} />
            }
            

        </div>
    )
}

export default ItemDetailContainer