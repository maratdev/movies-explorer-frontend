import { Navigate, Outlet } from 'react-router-dom';

export default ({ loggedIn }) => (loggedIn ? <Outlet/> : <Navigate to="/" replace/>);
