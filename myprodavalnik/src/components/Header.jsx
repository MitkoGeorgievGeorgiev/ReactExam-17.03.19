import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = ({isLoggedIn}) => {
    return (
        <header>
            <nav className="navbar-menu">
                <NavLink to="/" activeClassName="active" aria-current="page">My Prodavalnik</NavLink>
                <NavLink to="/store" activeClassName="active">Всички обяви</NavLink>
                <NavLink to="/orders" activeClassName="active">Мойте обяви</NavLink>
                
                               
                {isLoggedIn ?
                <NavLink to="javascript:void(0)">Logout</NavLink>
                :
                <NavLink to="/login" activeClassName="active">Login</NavLink>       
            }
            </nav>
        </header>
    )
}

export default Header