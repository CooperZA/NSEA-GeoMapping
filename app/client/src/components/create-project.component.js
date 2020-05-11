import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProject extends Component{
    constructor(props){
        super(props);

        // bind this to methods
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
        // populate dropdown boxes for fish type and project type
        // get project types
        axios.get('http://localhost:5000/projecttype/')
            .then(res => {
                if (res.data.length > 0){
                    this.setState({
                        // create project types array
                        ProjectTypeArr: res.data.map(pt => pt.ProjectType),
                        // assign ProjectType to default value of the first project in the response
                        ProjectType: res.data[0].ProjectType
                    })
                }
            });

        // get fishtypes
        axios.get('http://localhost:5000/fish/')
            .then(res => {
                if (res.data.length > 0){
                    this.setState({
                        // add fish types to fish type array
                        FishTypeArr: res.data.map(ft => ft.FishType),
                        // default fish is first fish in response data
                        FishType: res.data[0].FishType
                    })
                }
            });
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

        axios.post('http://localhost:5000/projects/add', project)
            .then(res => console.log(res.data));

        window.location = '/projects/';
    }

    render(){
        return (
            <div>
                <h3>Add New Project</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Project Type:</label>
                        <select ref="userInput" required className="form-control" value={this.state.ProjectType} onChange={this.onChangeProjectType}>
                            {
                                // create drop down options
                                this.state.ProjectTypeArr.map((pt) => {
                                    return <option key={pt} value={pt}>{pt}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Creek Name:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.CreekName}
                            onChange={this.onChangeCreekName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Latitude:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.Latitude}
                            onChange={this.onChangeLatitude}
                        />
                    </div>

                    <div className="form-group">
                        <label>Longitude:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.Longitude}
                            onChange={this.onChangeLongitude}
                        />
                    </div>

                    <div className="form-group">
                        <label>Project Description:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.ProjectDescription}
                            onChange={this.onChangeProjectDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>Fun Fact:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.FunFact}
                            onChange={this.onChangeFunFact}
                        />
                    </div>

                    <div className="form-group">
                        <label>Fish Type:</label>
                        <select ref="userInput" required className="form-control" value={this.state.FishType} onChange={this.onChangeFishType}>
                            {
                                // create drop down options
                                this.state.FishTypeArr.map((ft) => {
                                    return <option key={ft} value={ft}>{ft}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Project Url:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.ProjectUrl}
                            onChange={this.ProjectUrl}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Add Project"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}