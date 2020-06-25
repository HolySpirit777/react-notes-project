import React, { useState } from 'react';
import Note from './Note/Note';
import './Notes.css';

const Input = (props) => {

    let max = 40;

    return (
        <div className="board-input">
            <label>Add Notes</label>
            <br/>
            <textarea maxLength={max} name="nota" value={props.value} placeholder="Enter the text" onChange={props.input}></textarea>
            <br/>
            <label>Characters left: {max - props.value.length} </label>
            <br/>
            <button onClick={props.add}>Add</button>
            <button onClick={props.clear}>Clear</button>
        </div>
    );
}

const Notes = props => {

    let [activateInput, setActivateInput] = useState(false);

    // if(this.state.activateInput) {
    //     input = <Input 
    //     input={this.setNote} 
    //     add={this.addNote} 
    //     clear={this.clearInput} 
    //     value={this.state.textNote}
    //     />
    // }

    return <div>
        <h1 className="notes-text">Notes</h1>
        <div className="notes-panel-button">
        <button className="notes-button">add note</button>
        <button className="notes-button">delete all notes</button>
        </div>

        {props.notes.length > 0 ? props.notes.map(note => {
                return <div className>
                <Note
                idNote={note.key}
                text={note.text}
                memberOfGroup={note.group}
                noteImportance={note.importance}
                set={(e) => this.setValueEdit(e, note.key)}
                delete={this.deleteNote.bind(this, note.key)}
                />
                </div>
        }) : <p className="notes-text">No notes</p>}
    </div>

}


export default Notes;