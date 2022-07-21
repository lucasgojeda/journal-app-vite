import { Redirect } from "react-router-dom";


export const PublicRoute = ({children, isLoggedIn}) => {

    return !isLoggedIn ? children : <Redirect to="/" />
};