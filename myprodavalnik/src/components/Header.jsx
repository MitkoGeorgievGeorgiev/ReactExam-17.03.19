import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
    return (
        <header>
            <nav className="navbar-menu">
                <NavLink to="/" activeClassName="active" aria-current="page">My Prodavalnik</NavLink>
                <NavLink to="/store" activeClassName="active">Всички обяви</NavLink>
                <NavLink to="/orders" activeClassName="active">Мойте обяви</NavLink>
                {!localStorage.name ? <NavLink to="/register">Регистрация</NavLink>
                    // <NavLink to="/login">Login</NavLink>

                    :

                    // <NavLink to="/username">Welcome {localStorage.name}!</NavLink>
                    <NavLink to="/logout" onClick={props.logout}>Изход</NavLink>

                }
                {!localStorage.name
                    ? <NavLink to="/login">Логин</NavLink>
                    : <NavLink to="/username">Добре дошъл {localStorage.name}!</NavLink>}
            </nav>
        </header>
    )
}

export default Header