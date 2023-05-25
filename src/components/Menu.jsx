import React from 'react';
import {NavLink , Outlet} from "react-router-dom";

const Menu = () => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-8">
                    <ul className="nav nav-pills mb-3 justify-content-center">
                        <li className="nav-item">
                            <NavLink to='/problem-1' className={({isActive}) => `nav-link + ${(isActive ? " active" : "")}` }>Problem - 1</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/problem-2' className={({isActive}) => `nav-link + ${(isActive ? " active" : "")}`}>Problem - 2</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Menu;