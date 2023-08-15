import {Link} from "react-router-dom";
import './NavBar.css';
const NavBar = () => {
    return (
        <nav className="NavBar">
            <Link className="NavBar__link" to="#">Регистрация</Link>
            <Link className="NavBar__link" to="#">Войти</Link>
        </nav>
    )
}

export default NavBar;
