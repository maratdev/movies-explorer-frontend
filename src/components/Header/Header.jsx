import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

const Header = ({ children }) => {
  const { pathname } = useLocation();
  const visibleHeader = pathname === '/signin' || pathname === '/signup' || pathname === '/404';
  return (
    <>
      {
        !visibleHeader && (
          <header className="Header">
            <Link to="/#">
              <img src={logo} alt="логотип Улыбка"/>
            </Link>
            {children}
          </header>
        )
      }

    </>
  );
};

export default Header;
