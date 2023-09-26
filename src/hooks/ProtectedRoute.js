import { Navigate, Outlet } from 'react-router-dom';

export default ({loggedIn}) => {
    return loggedIn ? <Outlet/> : <Navigate to="/" replace/>;
};
