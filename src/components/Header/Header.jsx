import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

const Header = ({children}) => (
  <>
    <header className="Header">
      <Link to="/#">
        <img src={logo} alt="логотип Улыбка"/>
      </Link>
      {children}
    </header>
  </>
);

export default Header;
