import React from 'react'
import {NavLink} from "react-router-dom";

export default function Index() {
  return (
    <div className="container">
            <div className="align-items-center justify-content-center row vh-100">
                <div className="col-8">
                    <ul className="align-content-center flex-column gap-3 mb-3 nav nav-pills">
                        <li className="nav-item">
                            <NavLink to='/problem-1' className="nav-link active">Problem - 1</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/problem-2' className="nav-link active">Problem - 2</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
  )
}
