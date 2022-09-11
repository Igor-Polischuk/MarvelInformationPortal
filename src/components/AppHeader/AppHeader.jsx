import { NavLink, Link } from "react-router-dom";

import './AppHeader.scss'


function AppHeader() {
    const activeLink = ({ isActive }) => {
        return isActive ? { color: '#9F0013' } : {}
    }

    return (
        <header className="header">
            <Link to='/'>
                <p className="header__title"><span className="red">Marvel</span> information portal</p>
            </Link>
            <nav className="header__nav">
                <ul className="header__menu">
                    <li className="header__menu-item">
                        <NavLink to="/" className='header__menu-link' style={activeLink}>Characters</NavLink>
                    </li>
                    /
                    <li className="header__menu-item">
                        <NavLink to="/comics" className='header__menu-link' style={activeLink}>Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader