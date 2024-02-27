import {useSelector} from "react-redux";

export const ProtectedRoute = ({ children }) => {

    const isAuthenticated =useSelector((state) => state.token.token)

    if (!isAuthenticated) {
        window.location.href = 'https://www.consultantajuridicaonline.com/login';
        return null;
    }

    return children;
};
