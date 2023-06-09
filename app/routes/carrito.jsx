import { useState, useEffect } from "react"
import { useOutletContext } from "@remix-run/react"
import { ClientOnly } from "remix-utils"
import styles from "~/styles/carrito.css"


export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles
    }
  ]
}

export function meta() {
  return [
    { title: "GuitarLA - Carrito" },
    { description: "GuitarLA - Carrito para la compras de guitarras" }
  ]
}

const Carrito = () => {

  const [total, setTotal] = useState(0)
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext()


  useEffect(() => {
    let totalPagar = 0
    carrito.map(guitarraPagar => {
      totalPagar += (guitarraPagar.precio * guitarraPagar.cantidad)
    })
    setTotal(totalPagar)

    //Otra forma de hacerlo con un metodo
    // const calculoTotal = carrito.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0 )
    // setTotal(calculoTotal)

  }, [carrito])

  return (
    // Todo lo que se encuentre dentro de la etiqueta clientonly lo va a ejecutar en el cliente
    <ClientOnly fallback={"cargando..."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de compras</h1>

          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length === 0 ? "Empieza agregando productos" : (
                carrito?.map(producto => (
                  <div key={producto.id} className="producto">
                    <div>
                      <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} />
                    </div>
                    <div>
                      <p className="nombre">{producto.nombre}</p>
                      <p>Cantidad: </p>
                      <select
                        value={producto.cantidad}
                        className="select"
                        onChange={e => actualizarCantidad({
                          cantidad: +e.target.value,
                          id: producto.id
                        })}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <p className="precio">$ <span>{producto.precio}</span></p>
                      <p className="subtotal">Subtotal: $ <span>{(producto.precio * producto.cantidad)}</span></p>
                    </div>

                    <button
                      type="button"
                      className="btn_eliminar"
                      onClick={() => eliminarGuitarra(producto.id)}
                    >X</button>

                  </div>
                ))
              )}
            </div>

            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  )
}

export default Carrito