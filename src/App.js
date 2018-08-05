import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase'; //Modulo firebase
import {DB_CONFIG} from './Config/Config'; //Configuracion de base de datos
import 'firebase/database';

import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';

class App extends Component {
  constructor(){
    super();  //Hereda las propiedades de la clase component
    this.state = {
      notes: [
        //{noteId: 1, noteContent: 'Hola mundo'},
        //{noteId: 2, noteContent: 'Hola amigo'}
      ]
    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes'); //Coleccion de datos
    this.addNote = this.addNote.bind(this);
  }

  componentDidMount(){
    const { notes } = this.state;
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({ notes });
    });

    this.db.on('child_removed', snap => {
      for(let i = 0; i < notes.length; i++){
        if( notes[i].noteId === snap.key){
          notes.splice(i, 1);
        }
      }
      this.setState({ notes });
    });
  }

  removeNote(noteId){
    this.db.child(noteId).remove();
  }

  addNote(note){
    /*let { notes } = this.state;
    notes.push({
      noteId: notes.length + 1,
      noteContent: note
    });

    this.setState({
      notes // notes: notes
    });*/
    this.db.push().set({noteContent: note});
  }

  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader">
          
          <h1><img src={logo} className="App-logo" alt="logo" />Notes App</h1>
        </div>

        <div className="notesBody">
          <ul>
          {
            this.state.notes.map(note => {
              return (
                <Note noteContent={note.noteContent} noteId={note.noteId} key={note.noteId} removeNote={ () => this.removeNote(note.noteId) }/>
            )
            })
          }
          </ul>
        </div>

        <div className="notesFooter">
          <NoteForm addNote={ this.addNote }/>
        </div>

      </div>
    );
  }
}

export default App;
