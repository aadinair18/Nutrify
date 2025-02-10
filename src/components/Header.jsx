import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function Header() {

    const loggedInData = useContext(UserContext);
    const navigate = useNavigate();
    function Logout() {
        localStorage.removeItem("nutrify-user");
        loggedInData.setLogUser(null);
        navigate("/login");
    }
    return (
        <div>
            <ul>
                <li>Home</li>
                <li onClick={Logout}>Logout</li>
            </ul>

        </div>
    )
}
