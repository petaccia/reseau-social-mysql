import {useContext} from 'react'
import {AuthContext} from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('connexion/login');
        return null;
    }
    return children;
};

export default PrivateRoute;