import React, { Component } from 'react';
import axios from 'axios';
// Datepicker?

export default class EditProject extends Component {
    constructor(props) {
        super(props);

        // onchange methods bind this
        this.onChangeProjectType = this.onChangeProjectType.bind(this);
        this.onChangeCreekName = this.onChangeCreekName.bind(this);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.onChangeProjectDescription = this.onChangeProjectDescription.bind(this);
        this.onChangeFunFact = this.onChangeFunFact.bind(this);
        this.FishType = this.onChangeFishType.bind(this);
        this.onChangeProjectUrl = this.onChangeProjectUrl.bind(this);

        // set state
        this.state = {
            ProjectType: '',
            CreekName: '',
            Latitude: 0,
            Longitude: 0,
            ProjectDescription: '',
            FunFact: '',
            FishType: '',
            ProjectUrl: '',
            ProjectTypeArr: [],
            FishTypeArr: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    ProjectType: res.data.ProjectType,
                    CreekName: res.data.CreekName,
                    Latitude: res.data.Latitude,
                    Longitude: res.data.Longitude,
                    ProjectDescription: res.data.ProjectDescription,
                    FunFact: res.data.FunFact,
                    FishType: res.data.FishType,
                    ProjectUrl: res.data.ProjectUrl
                })
            })
            .catch(err => {
                console.log(err);
            })
        
        // Get Project anf Fish Types
    }

    onChangeProjectType(e){
        this.setState({
            ProjectType: e.target.value
        });
    }

    onChangeCreekName(e){
        this.setState({
            CreekName: e.target.value
        });
    }

    onChangeLatitude(e){
        this.setState({
            Latitude: Number(e.target.value)
        });
    }

    onChangeLongitude(e){
        this.setState({
            Longitude: Number(e.target.value)
        });
    }

    onChangeProjectDescription(e){
        this.setState({
            ProjectDescription: e.target.value
        });
    }

    onChangeFunFact(e){
        this.setState({
           FunFact: e.target.value
        });
    }

    onChangeFishType(e){
        this.setState({
            FishType: e.target.value
        });
    }

    onChangeProjectUrl(e){
        this.setState({
            ProjectUrl: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const project = {
            ProjectType: this.state.ProjectType,
            CreekName: this.state.CreekName,
            Latitude: this.state.Latitude,
            Longitude: this.state.Longitude,
            ProjectDescription: this.state.ProjectDescription,
            FunFact: this.state.FunFact,
            FishType: this.state.FishType,
            ProjectUrl: this.state.ProjectUrl
        }

        console.log(project);

        axios.post('http://localhost:5000/projects/edit/'+this.props.match.params.id, project)
            .then(res => console.log(res.data));

        window.location = '/projects/';
    }

    render(){
        return (
            <div>
                <h3>Add New Project</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="">
                        <label>Project Type:</label>
                        <select ref="userInput" required className="" value={this.state.ProjectType} onChange={this.onChangeProjectType}>
                            {
                                // create drop down options
                                
                            }
                        </select>
                    </div>

                    <div className="">
                        <label>Creek Name:</label>
                        <input
                            type="text"
                            required
                            className=""
                            value={this.state.CreekName}
                            onChange={this.onChangeCreekName}
                        />
                    </div>

                    <div className="">
                        <label>Latitude:</label>
                        <input
                            type="text"
                            required
                            className=""
                            value={this.state.Latitude}
                            onChange={this.onChangeLatitude}
                        />
                    </div>

                    <div className="">
                        <label>Longitude:</label>
                        <input
                            type="text"
                            required
                            className=""
                            value={this.state.Longitude}
                            onChange={this.onChangeLongitude}
                        />
                    </div>

                    <div className="">
                        <label>Project Description:</label>
                        <input
                            type="text"
                            required
                            className=""
                            value={this.state.ProjectDescription}
                            onChange={this.onChangeProjectDescription}
                        />
                    </div>

                    <div className="">
                        <label>Fun Fact:</label>
                        <input
                            type="text"
                            required
                            className=""
                            value={this.state.FunFact}
                            onChange={this.onChangeFunFact}
                        />
                    </div>

                    <div className="">
                        <label>Fish Type:</label>
                        <select ref="userInput" required className="" value={this.state.FishType} onChange={this.onChangeFishType}>
                            {
                                // create drop down options
                                
                            }
                        </select>
                    </div>
                    
                    <div className="">
                        <label>Project Url:</label>
                        <input
                            type="text"
                            required
                            className=""
                            value={this.state.ProjectUrl}
                            onChange={this.ProjectUrl}
                        />
                    </div>

                    <div className="">
                        <input
                            type="submit"
                            value="Add Project"
                            className=""
                        />
                    </div>
                </form>
            </div>
        )
    }
}