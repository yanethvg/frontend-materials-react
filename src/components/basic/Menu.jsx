import React from 'react'
import { NavLink } from 'react-router-dom'
import {routes }from './../../Routers'

function Menu() {
    return (
        <nav>
            <ul>
                {routes.map(route =>(
                    <li>
                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive ? 'red' : 'blue'
                            })}
                            to={route.path}
                        >
                                {route.text}
                        </NavLink>
                    </li>)
                )}
            </ul>
        </nav>
    )
}

export { Menu }