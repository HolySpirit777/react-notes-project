import React, { useState } from 'react';
import Note from './Note/Note';
import './Notes.css';

const Input = (props) => {

    let max = 50;

    let [textNote, setTextNote] = useState('');

    const setTextNoteHandler = (e) => {
        setTextNote(textNote = e.target.value);
    }

    const clearTextHandler = () => {
        setTextNote(textNote = '');
    }

    const addTextNote = () => {
        if(textNote) {
            props.add(textNote);
            setTextNote(textNote = '');
        } else {
            alert('the text field is empty!!!!!!!!!!!!!!!!!!')
        }
    }


    return (
        <div className="board-input">
            <label>Add Notes</label>
            <br/>
            <textarea maxLength={max} name="nota" value={textNote} placeholder="Enter the text" onChange={setTextNoteHandler}></textarea>
            <br/>
            <label>Characters left: {max - textNote.length} </label>
            <br/>
            <button onClick={addTextNote}>add</button>
            <button onClick={clearTextHandler}>clear</button>
        </div>
    );
}

const Notes = props => {

    let [activateInput, setActivateInput] = useState(false);
    let inputView = null;

    const activateInputHandler = () => {
        setActivateInput(activateInput = !activateInput);
    }

    if(activateInput) {
        inputView = <Input add={props.addNote} />
    }

    return <div>
        <h1 className="notes-text">Notes</h1>
        <div className="notes-panel-button">
        <button className="notes-button" onClick={activateInputHandler}>add note</button>
        <button className="notes-button" onClick={props.clearAllNotes}>delete all notes</button>
        </div>

        {inputView}

        {props.notes.length > 0 ? props.notes.map(note => {
                return <Note
                key={note.key}
                idNote={note.key}
                text={note.text}
                memberOfGroup={note.group}
                noteImportance={note.importance}
                // set={(e) => this.setValueEdit(e, note.key)}
                // delete={this.deleteNote.bind(this, note.key)}
                />
        }) : <p className="notes-text">No notes</p>}
    </div>

}


export default Notes;