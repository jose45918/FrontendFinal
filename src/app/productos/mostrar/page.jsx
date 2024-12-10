'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; 

export default function MostrarProductos() {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const searchParams = useSearchParams(); // Leer los parámetros de búsqueda
    const searchQuery = searchParams.get("search") || ""; // Obtener el término de búsqueda
    const router = useRouter();

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                let url = "http://localhost:3000/mostrarProductos";
                if (searchQuery) {
                    url = `http://localhost:3000/buscarProducto/${searchQuery}`;
                }
                const respuesta = await axios.get(url);
                setProductos(respuesta.data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };

        obtenerProductos();
    }, [searchQuery]); // Actualizar productos cuando cambie el término de búsqueda

    const mostrarDetalles = (producto) => {
        if (productoSeleccionado && productoSeleccionado.id === producto.id) {
            setProductoSeleccionado(null);
        } else {
            setProductoSeleccionado(producto);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await axios.get(`http://localhost:3000/borrarProducto/${id}`);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const redirigirEditarProducto = (id) => {
        router.push(`/productos/editarProducto/${id}`);
    };

    const redirigirAgregarProducto = () => {
        router.push('/productos/crear'); 
    };

    return (
        <div className="container">
            <h1>Lista de Productos</h1>
            <button onClick={redirigirAgregarProducto} className="btn btn-outline-info mb-3">
                Agregar Producto
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>
                                <a 
                                    href="#!" 
                                    onClick={() => mostrarDetalles(producto)} 
                                    className="text-primary" 
                                    style={{ cursor: 'pointer' }}
                                >
                                    {producto.nombre}
                                </a>
                            </td>
                            <td>${producto.precio}</td>
                            <td>
                                <button onClick={() => redirigirEditarProducto(producto.id)} className="btn btn-outline-success btn-sm">
                                    Editar
                                </button>
                                <button onClick={() => eliminarProducto(producto.id)} className="btn btn-outline-danger btn-sm ms-2">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    
            {productoSeleccionado && (
                <div className="mt-4">
                    <h2>Detalles del Producto</h2>
                    <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>
                    <p><strong>Cantidad disponible:</strong> {productoSeleccionado.cantidad}</p>
                    <p><strong>Precio:</strong> {productoSeleccionado.precio}</p>
                </div>
            )}
        </div>
    );
}
