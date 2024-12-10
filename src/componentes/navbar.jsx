"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [query, setQuery] = useState(""); // Estado para la búsqueda
    const [categoria, setCategoria] = useState("usuarios"); // Estado para seleccionar la categoría
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault(); // Evita el envío del formulario
        if (query.trim() !== "") {
            router.push(`/${categoria}/mostrar?search=${query}`); // Redirige a la categoría con el parámetro "search"
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link href="/" legacyBehavior>
                    <a className="navbar-brand">Home</a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/compras/mostrar" legacyBehavior>
                                <a className="nav-link active">Compras</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/productos/mostrar" legacyBehavior>
                                <a className="nav-link">Productos</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/usuarios/mostrar" legacyBehavior>
                                <a className="nav-link">Usuarios</a>
                            </Link>
                        </li>
                    </ul>
                    {/* Formulario del buscador */}
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <select
                            className="form-select me-2"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="usuarios">Usuarios</option>
                            <option value="productos">Productos</option>
                        </select>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder={`Buscar en ${categoria}...`}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)} // Actualiza el estado
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
