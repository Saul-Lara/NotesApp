import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component{
    constructor(){
        super();
    }

    addNote(){
        this.props.addNote(this.textInput.value);
        this.textInput.value = '';
        this.textInput.focus();
    }

    render(){
        return(
            <div className="NoteForm">
                <input type="text" placeholder="Write a note..." ref={ input => {this.textInput = input;} }/>
                <button type="button" className="btn btn-primary" onClick={ () => this.addNote()}>Add me</button>
            </div>
        );
    }
}

export default NoteForm;