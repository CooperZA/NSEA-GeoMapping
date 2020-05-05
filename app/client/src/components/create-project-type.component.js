import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProjectType extends Component{
    constructor(props){
        super(props);

        this.onChangeProjectType = this.onChangeProjectType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ProjectType: ''
        }
    }

    onChangeProjectType(e){
        this.setState({
            ProjectType: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const Project = {
            ProjectType: this.state.ProjectType
        }

        console.log(Project);

        // send to db
        axios.post('http://localhost:5000/fish/add', Project)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.setState({
            ProjectType: ''
        });
    }

    render(){
        return(
            <div>
                <h3>Create New Project Type</h3>
                <form onSubmit={this.onSubmit}>
                    <div className>
                        <label>ProjectType:</label>
                        <input 
                            type="text"
                            required
                            className
                            value={this.state.username}
                            onChange={this.onChangeProjectType}
                        />
                    </div>
                    <div className>
                        <input
                            type="submit"
                            className
                            value="Create ProjectType"
                        />
                    </div>
                </form>
            </div>
        )
    }
}