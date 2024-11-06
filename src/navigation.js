import { Link } from 'react-router-dom';
import './styles/navigation.css';

function Navigation() {
    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/">Tooted</Link>
                </li>
                <li className="nav-item">
                    <Link to="/kasutajad">Kasutajad</Link> {/* Correct link */}
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
