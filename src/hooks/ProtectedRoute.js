import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default () => {
  const currentUser = useContext(CurrentUserContext);

  if (currentUser.isLoggedIn !== undefined) {
    return currentUser.isLoggedIn ? <Outlet/> : <Navigate to="/"/>;
  }
  return false;
};
