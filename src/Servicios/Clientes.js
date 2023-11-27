import { DELETE, GET, PATCH, POST } from './httpr'

const base_url = "/cliente"

export const ActualizarCliente = async(id, requestData)=>{
    let url = `${base_url}/${id}`
    try {
        let rsp = await PATCH(url,requestData)
        return rsp
    } catch (error) {
        console.error("Error al editar cliente:", error)
        throw error
    }
}
export const EliminarCliente = async(id) =>{
    let url = `${base_url}/${id}`
    try {
        let rsp = await DELETE(url)
        return rsp
    } catch (error) {
        console.error("Error al eliminar cliente:", error)
        throw error
    }
}
export const Guardar = async(requestData) =>{
    let url = `${base_url}/`
    try{
        let rsp = await POST(url, requestData)
        return rsp
    }catch(error){
        console.error("Error al cargar cliente:", error)
        throw error
    }
    
}
export const Listar = async() =>{
    let url = `${base_url}/`
    try {
        let rsp = await GET(url)
        return rsp
    } catch (error) {
        console.error("Error al obtener clientes:", error)
        throw error
    }
}
export const MostrarCliente = async(id) =>{
    let url = `${base_url}/${id}`
    try {
        let rsp = await GET(url)
        return rsp
    } catch (error) {
        console.error("Error al obtener cliente:", error)
        throw error
    }
}
