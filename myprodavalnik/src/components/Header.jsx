import React, { Fragment } from 'react'
import { NavLink ,Link} from 'react-router-dom'
const logoutStyle="float:right"

const Header = (props) => {
    return (
        <header>
            <nav className="navbar-menu">
                <NavLink to="/" activeClassName="active" aria-current="page">My Prodavalnik</NavLink>
                <NavLink to="/posts/all" activeClassName="active">Всички обяви</NavLink>
                {localStorage.name
                    ?
                    <Fragment>
                        <NavLink to={`/posts/my/${localStorage.userId}`} activeClassName="active">Мойте обяви</NavLink>
                        <Link to="#">Welcome {localStorage.name}</Link>
                        <NavLink className="nav-menu-right" to="/logout" onClick={props.logout}>Изход</NavLink>
                    </Fragment>
                    : <Fragment>
                        <NavLink to="/register">Регистрация</NavLink>
                        <NavLink to="/login">Вход</NavLink>
                    </Fragment>}
            </nav>
        </header>
    )
}

export default Header