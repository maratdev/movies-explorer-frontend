import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

const Header = ({ children }) => (
        <>
        <div className="header">
            <Link to="/#">
                <img src={logo} alt="логотип Улыбка"/>
            </Link>
            {children}
        </div>
        </>
);

export default Header;
