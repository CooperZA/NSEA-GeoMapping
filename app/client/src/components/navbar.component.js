import React, { Componenet } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Componenet{
    render(){
        return(
            <nav>
                <Link to="/projects/">NSEA-Project-Map</Link>
                <div>
                    {/* home, create project, create project type, create fish type, go to map */}
                    <ul>
                        <li>
                            <Link to="/projects/" className="">Projects</Link>
                        </li>
                        <li>
                            <Link to="/projects/create" className="">Add New Project</Link>
                        </li>
                        <li>
                            <Link to="/projecttype/create" className="">Add New Project Type</Link>
                        </li>
                        <li>
                            <Link to="/fishtype/create" className="">Add New Fish Type</Link>
                        </li>
                        <li>
                            <Link to="/map/" className="">Go To Map</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}