import ListaUsuarios from './Componentes/Listausuarios/ListaUsuarios'
import './App.css'
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import CartaUsuario from './Componentes/CartaUsuario/CartaUsuario'
import FormUsuario from './Componentes/FormUsuario/FormUsuario'
import TopBar from './Componentes/TopBar/TopBar'

function App() {
    return (
        <BrowserRouter>
            <TopBar/>
            <div className='container'>
                <Routes>
                    <Route path='/' element={<ListaUsuarios />} />
                    <Route path="/cliente/:id" element={<CartaUsuario/>} />
                    <Route path="/cliente/nuevo" element={<FormUsuario/>}/>
                    <Route path="/cliente/editar/:id" element={<FormUsuario/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
