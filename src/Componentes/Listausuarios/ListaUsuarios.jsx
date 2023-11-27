import { useEffect, useState } from "react"
import { EliminarCliente, Listar } from "../../Servicios/Clientes"
import './ListaUsuarios.css'
import { Link } from "react-router-dom"

const ListaUsuarios = () => {

    const [clientes, setClientes] = useState([])

    const obtenerClientes = async () => {
        try {
            const resultado = await Listar()
            setClientes(resultado)
        } catch (error) {
            console.error("Error al obtener clientes:", error)
        }
    }

    const eliminarCliente = async (id) => {
        try {
            await EliminarCliente(id)
            obtenerClientes()
        } catch (error) {
            console.error("Error al obtener clientes:", error)
        }
    }

    useEffect(()=>{
        obtenerClientes()
    },[])


    return (
        <table className="card">
            <thead>
                <tr className="card-header">
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Fecha</th>
                    <th>Ver</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody className="card-body">
                {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.apellido}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.createAt}</td>
                        <td>
                            <Link to={`/cliente/${cliente.id}`} className="btn btn-ver">
                                <i className="bi bi-eye-fill"></i>
                            </Link>
                        </td>
                        <td>
                            <Link to={`/cliente/editar/${cliente.id}`} className="btn btn-editar">
                                <i className="bi bi-pencil-fill"></i>
                            </Link>
                        </td>
                        <td>
                            <a className="btn btn-eliminar" onClick={()=>eliminarCliente(cliente.id)}>
                                <i className="bi bi-trash-fill"></i>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ListaUsuarios