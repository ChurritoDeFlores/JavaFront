import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { MostrarCliente } from "../../Servicios/Clientes"
import "./CartaUsuario.css"

const CartaUsuario = () => {
    const [cliente, setCliente] = useState({})

    const { id } = useParams();

    const obtenerCliente = async () => {
        try {
            const resultado = await MostrarCliente(id)
            setCliente(resultado)
        } catch (error) {
            console.error("Error al obtener clientes:", error)
        }
    }

    const construirURLImagen = (nombreImagen) => {
        const baseURL = 'http://localhost:8080/uploads/';
        return `${baseURL}${nombreImagen}`;
    };
    

    useEffect(()=>{
        obtenerCliente()
    },[id])

    return (
        <div className="perfil-usuario card card-body">
            <img src={construirURLImagen(cliente.foto)} alt="Foto de perfil" />
            <div className="perfil-body">
                <div className="perfil-titulo">
                    <h2>Perfil de Cliente</h2>
                    <Link to="/" className="btn btn-primario">
                        <i className="bi bi-x-lg"></i>
                    </Link>
                </div>
                <p><strong>Nombre:</strong> {cliente.nombre}</p>
                <p><strong>Apellido:</strong> {cliente.apellido}</p>
                <p><strong>Email:</strong> {cliente.email}</p>
                <p><strong>Fecha de Creación:</strong> {cliente.createAt}</p>
            </div>
        </div>
    )
}

export default CartaUsuario