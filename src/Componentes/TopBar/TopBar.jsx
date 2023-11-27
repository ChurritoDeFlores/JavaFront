import "./TopBar.css"
import { Link } from "react-router-dom"

const TopBar = () => {
    return (
        <div className="topbar">
            <Link to="/">
                <img src="logo.jpg" alt="logo" className="topbar-img"/>
            </Link>
            <Link to="/cliente/nuevo" className="btn btn-primario">
                <i className="bi bi-person-plus-fill"></i>
                <p><strong>Nuevo Cliente</strong></p>
            </Link>
        </div>
    )
}

export default TopBar