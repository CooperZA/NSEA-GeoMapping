import React, { Component } from 'react';
import axios from 'axios';
// Datepicker?

export default class EditProject extends Component {
    constructor(props) {
        super(props);

        // onchange methods bind this

        // this.state
    }

    render(){
        return(
            <div>
                <h3>Edit Project</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Project Type</label>
                        <select>
                            
                        </select>
                    </div>
                    <div>
                        <label>Project Coordinates</label>
                        <input/> {/* lat */}
                        <input/> {/* long */}
                    </div>
                </form>
            </div>
        )
    }
}