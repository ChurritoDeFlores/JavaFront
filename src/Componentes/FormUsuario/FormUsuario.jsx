import { useState, useEffect} from 'react'
import { useParams, useNavigate} from "react-router-dom"
import { ActualizarCliente, Guardar, MostrarCliente } from '../../Servicios/Clientes'
import './FormUsuario.css'

const FormUsuario = () => {

    const { id } = useParams()
    const Navigate = useNavigate();
    const [dataUsuario, setDataUsuario]=useState({})
    const [edit, setEdit] = useState(false)
    const [fileInfo, setFileInfo] = useState(dataUsuario?.foto ? dataUsuario.foto : "Inserte una imagen")

    const CargarUsuario = async(e)=>{
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nombre', dataUsuario?.nombre)
            formData.append('apellido', dataUsuario?.apellido)
            formData.append('email', dataUsuario?.email)
            if (edit) {
                await ActualizarCliente(id, formData)
            } else {
                formData.append('foto', dataUsuario?.foto)
                await Guardar(formData);
            }
            setFileInfo(dataUsuario?.foto ? dataUsuario.foto : "Inserte una imagen")
            Navigate('/')
        } catch (error) {
            console.error("Error al cargar usuario:", error)
        }
    }

    const obtenerUsuario = async () => {
        try {
            const resultado = await MostrarCliente(id)
            setDataUsuario(resultado)
        } catch (error) {
            console.error('Error al obtener usuario:', error)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setDataUsuario({ ...dataUsuario, foto: file })
        setFileInfo(file ? "Imagen cargada..." : "Inserte una imagen")
    }

    useEffect(() => {
        if (id) {
            setEdit(true)
            obtenerUsuario()
        }else{
            setEdit(false)
        }
    }, [id]);

    useEffect(() => {
        if (dataUsuario?.foto) {
            setFileInfo(dataUsuario.foto)
        }
    }, [dataUsuario.foto]);

    return (
        <article className="card form form-primario">
            <input className="form-input" type="text" placeholder="Nombre" name="nombre" value={dataUsuario?.nombre || ''} onChange={(e)=>setDataUsuario({...dataUsuario,nombre:e.target.value})}/>
            <input className="form-input" type="text" placeholder="Apellido" name="apellido" value={dataUsuario?.apellido || ''} onChange={(e)=>setDataUsuario({...dataUsuario,apellido:e.target.value})}/>
            <input className="form-input" type="email" placeholder="email@correo.com" name="email" value={dataUsuario?.email || ''} onChange={(e)=>setDataUsuario({...dataUsuario,email:e.target.value})}/>
            { !edit && (
            <label className="custom-file-upload form-input" >
                <input type="file" onChange={handleFileChange}/>
                    <i className="bi bi-cloud-upload"></i>
                    {fileInfo && typeof fileInfo === 'string' && <span>{fileInfo}</span>}
            </label>
            )}
            <button className="btn btn-primario" type="button" onClick={CargarUsuario}>
                <i className="bi bi-floppy-fill"></i>
                <strong> Guardar</strong>
            </button>
        </article>
    )
}

export default FormUsuario