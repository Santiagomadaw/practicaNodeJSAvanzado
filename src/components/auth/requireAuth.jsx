import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

function RequireAuth({ children }) {
    const location = useLocation();
    const logState = useSelector(getIsLogged);
    return logState ? (
        children
    ) : (
        <Navigate to='/login' state={{ from: location.pathname }} replace />
    );
}

RequireAuth.propTypes = {
    children: PropTypes.node,
};

export default RequireAuth;
