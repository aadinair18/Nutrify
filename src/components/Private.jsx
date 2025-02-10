import { UserContext } from "../../context/UserContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom";
export default function Private(props) {
    const loggedData = useContext(UserContext);


    return (
        loggedData.loggedUser !== null ?
            <props.Components></props.Components>
            : <Navigate to="/login" />

    )
}
