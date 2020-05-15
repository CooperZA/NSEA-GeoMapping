import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional React component
// called in projectList method
const Project = props => (
    <tr>
        <td>{ props.project.ProjectType }</td>
        <td>{ props.project.PlaceName }</td>
        <td>{ props.project.Latitude }</td>
        <td>{ props.project.Longitude }</td>
        <td>{ props.project.ProjectDescription }</td>
        <td>{ props.project.ProjectUrl }</td>
        {/* <td>{ props.project.FunFact }</td>
        <td>{ props.project.FishType }</td> */}
        <td>
            <Link to={"/edit/"+props.project._id}>edit</Link> | <button onClick={() => { props.deleteProject(props.project._id) }}>delete</button>
        </td>
    </tr>
)

export default class ProjectList extends Component {
    constructor(props){
        super(props);

        this.deleteProject = this.deleteProject.bind(this);

        this.state = { 
            projects: [],
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                // populate projects array with projects from the database
                this.setState({ projects: res.data })
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteProject(id){
        // delete from db
        axios.delete('http://localhost:5000/projects/' + id)
            .then(res => console.log(res.data));

        // remove from state array
        this.setState({
            projects: this.state.projects.filter(elem => elem._id !== id)
        });
    }

    projectList(){
        return this.state.projects.map(currentProject => {
            return <Project
                        project={currentProject}
                        deleteProject={this.deleteProject}
                        key={currentProject._id}
                    />
        });
    }

    render(){
        return (
            <div>
                <h3>Projects</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Project Type</th>
                            <th>Creek Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Project Description</th>
                            <th>Project Url</th>
                            <th>Actions</th>
                            {/* <th>Fun Fact</th>
                            <th>Fish Type</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        { this.projectList() }
                    </tbody>
                </table>
            </div>
        )
    }
}