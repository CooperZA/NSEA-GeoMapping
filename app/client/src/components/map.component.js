import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from 'axios';

// icons
import School from '../assets/School.svg';
import FishPassageBarrier from '../assets/FishPassageBarrier.svg';
import FieldTrip from '../assets/FieldTrip.svg';
import WorkSite from '../assets/WorkSite.svg';
import Planting from '../assets/Planting.svg';

// configures for .env files
require('dotenv').config();

// Mapbox Api Key
const mapboxKey = process.env.REACT_APP_MAPBOX_API_TOKEN;
// Mapbox Style
const mapboxStyle = process.env.REACT_APP_MAP_STYLE;

export default class Map extends Component{
    constructor(props){
        super(props)

        // bind this to methods
        this.onChangeFishType = this.onChangeFishType.bind(this);
        this.svgSelector = this.svgSelector.bind(this);

        this.state = {
            viewport: {
                width: "100vh",
                height: "100vh",
                latitude: 48.796827,
                longitude: 122.126277,
                zoom: 10
            },
            // keep track of selected project on map 
            SelectedProject: null,
            // array populated with all projects from the database
            Projects: [],
            //default fish type (fist in array)
            // FishType: '',
            // array of fish types from fishtype dbcollection
            // FishTypes: [],
        }
    }

    componentDidMount(){
        // get list of projects
        // TODO: Look at exercises-list coponent for maping and populating array
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                if (res.data.length > 0){
                    this.setState({
                        Projects: res.data.map(project => project)
                    })
                }
            })
            .catch(err => console.log(err));

        // get list of fish types for sorting dropdown box
        // axios.get('http://localhost:5000/fish/')
        //     .then(res => {
        //         if (res.data.length > 0){
        //             this.setState({
        //                 FishTypes: res.data.map(fish => fish.FishType),
        //                 FishType: res.data[0].FishType
        //             })
        //         }
        //     })
        //     .catch(err => console.log(err));
    }

    onChangeFishType(e){
        this.setState({
            FishType: e.target.value
        })
    }

    // svg selector function
    svgSelector(projectType = "FishPassageBarrier"){
        // given the project type select the corresponding svg
        // svgs are imported into the map component at the top 
        // default is fishPassageBarrier
        // returns svg corresponding to the project types

        let svg = null;
    
        switch (projectType){
            case "FieldTrip":
                svg = FieldTrip;
                break;
            case "Planting":
                svg = Planting;
                break;
            case "School":
                svg = School;
                break;
            case "WorkSite":
                svg = WorkSite;
                break;
            case "FishPassageBarrier":
                svg = FishPassageBarrier;
                break;
            default:
                svg = FishPassageBarrier;
        }

        return svg;
    }

    render(){
        return(
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    mapStyle={process.env.REACT_APP_MAP_STYLE}
                >
                    {/* markers for each project */}
                    {this.state.Projects.map(project => {
                        <Marker key={project._id} latitude={project.Latitude} longitude={project.Longitude}>
                            <button 
                            className="marker-btn" 
                            // on click of project, set the current selected project
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                    SelectedProject: project,
                                })
                            }}
                            >
                                <img src={this.svgSelector(project.ProjectType)} />
                            </button>
                        </Marker>
                    })}

                    {this.state.SelectedProject ? (
                        <Popup 
                        latitude={this.state.SelectedProject.Latitude} 
                        longitude={this.state.SelectedProject.Longitude}
                        onClose={() => {
                            this.setState({
                                SelectedProject: null,
                            });
                        }}
                        >
                            {/* TODO: Get layout for popup */}
                            <div>
                                <h2>{this.state.SelectedProject.PlaceName}</h2>
                                <p>{this.state.SelectedProject.ProjectDescription}</p>
                                <a href={this.state.SelectedProject.ProjectUrl}>{this.state.SelectedProject.ProjectUrl}</a>
                            </div>
                        </Popup>
                    ) : null}
                </ReactMapGL>
            </div>
        )
    }
}
