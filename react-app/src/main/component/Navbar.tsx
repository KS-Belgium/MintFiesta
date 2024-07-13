import {Link} from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {
    return (
        <nav className="navbar">
            <ul >
                <li>
                    <Link to={"/"}>
                        <img src={"/img/PartyShare.png"}/>
                    </Link>
                </li>
                <li>
                    <Link to={"/scan"}>
                        <img src={"/img/QRCode.png"}/>
                    </Link>
                </li>
                <li>
                    <Link to={"/"}>
                        <img src={"/img/Profile.png"}/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;