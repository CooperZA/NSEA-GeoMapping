import React, { Component } from 'react';
import ReactMapGL from "react-map-gl";
import axios from 'axios';

// icons
import Apple from '../assets/Apple.svg';
import Fish from '../assets/Fish.svg';
import Magifying from '../assets/Magifying.svg';
import Shovel from '../assets/Shovel.svg';
import Tree from '../assets/Tree.svg';

// Mapbox Api Key
const mapboxKey = process.env.REACT_APP_MAPBOX_API_TOKEN;
// Mapbox Style
const mapboxStyle = process.env.REACT_APP_MAP_STYLE;

export default class ReactMapGL extends Component{
    constructor(props){
        super(props)

        this.state = {
            Projects: []
        }
    }

    componentDidMount(){
        // get list of projects
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                if (res.data.length > 0){
                    this.setState({
                        Projects: res.map(project => project)
                    })
                }
            })
            .catch(err => console.log(err));
    }

    render(){
        return(
            <div></div>
        )
    }
}