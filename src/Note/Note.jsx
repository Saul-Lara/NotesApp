import React, { Component } from 'react';
import './Note.css';

class Note extends Component{
    constructor(props){
        super(props);
        this.noteId = props.noteId;
        this.noteContent = props.noteContent;
    }

    handleRemove(id){
        const response = window.confirm('Do you want to delete the note?');
        if(response){
            this.props.removeNote(id);
        }
        return;
    }

    render() {
        return(
            <div className="Note">
                <p className="data">{this.noteContent}</p>
                <button type="button" className="btn btn-danger" onClick={ () => this.handleRemove(this.noteId)}>Delete</button>
            </div>
        );
    }
}

export default Note;