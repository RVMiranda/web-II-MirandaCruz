import { Link, useLocation } from "react-router-dom";
import MyRouters from "../../router/Router";

export default function Menu() {
    const location = useLocation();
    const restrictedPaths = ["/"];

    const allowed = restrictedPaths.indexOf(location.pathname) === -1;
    return (
        <div className="App">
            {allowed &&
            <header className="App-header">
                <nav>
                <ul>
                    <li>
                    <Link to="/home">Home</Link>
                    </li>
                    <li>
                    <Link to="/products"> Products </Link>
                    </li>
                    <li>
                    <Link to="/about">Acerca de</Link>
                    </li>
                    <li>
                    <Link to="/contact">Contaco</Link>
                    </li>
                </ul>
                </nav>
            </header> }
            <MyRouters/>
        </div>
    )
}