import { useEffect, useState } from "react"
import { EliminarCliente, Listar } from "../../Servicios/Clientes"
import './ListaUsuarios.css'
import { Link } from "react-router-dom"

const ListaUsuarios = () => {

    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const obtenerClientes = async () => {
        try {
            const resultado = await Listar()
            setClientes(resultado)
            
        } catch (error) {
            console.error("Error al obtener clientes:", error)
            setError("No se pudieron cargar los clientes. Por favor, inténtalo de nuevo más tarde.")
        }finally {
            setLoading(false)
        }
    }

    const eliminarCliente = async (id) => {
        try {
            await EliminarCliente(id)
            obtenerClientes()
        } catch (error) {
            console.error("Error al obtener clientes:", error)
            setError("No se pudo eliminar el cliente. Por favor, inténtalo de nuevo más tarde.")
        }
    }

    useEffect(()=>{
        obtenerClientes()
    },[])

    return (
        <>
            {loading && <div className="card card-body"><p className="msj-error">Cargando clientes, por favor espera...</p><div className="spinner"></div></div>}
            {error && <p className="card card-body msj-error">Error: {error}</p>}
            {clientes.length > 0 && (
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
            {clientes.length === 0 && !loading && !error && <p className="card card-body msj-error">No hay usuarios cargados.</p>}
        </>
    )
}

export default ListaUsuarios