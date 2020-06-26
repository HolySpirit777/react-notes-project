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
            <label>add notes</label>
            <br/>
            <textarea maxLength={max} name="nota" value={textNote} placeholder="Enter the text" onChange={setTextNoteHandler}></textarea>
            <br/>
            <label>characters left: {max - textNote.length} </label>
            <br/>
            <button onClick={addTextNote}>add</button>
            <button onClick={clearTextHandler}>clear</button>
        </div>
    );
}

const Notes = props => {

    let [activateInput, setActivateInput] = useState(false);
    let inputView = null;
    let filterBy = null;

    const activateInputHandler = () => {
        setActivateInput(activateInput = !activateInput);
    }

    if(activateInput) {
        inputView = <Input add={props.addNote} />
    }

    filterBy = (
        props.groups.length > 0 && props.showNotes && props.notes.length > 0 ? <div className="board-details">
            <label className="board-details-text">filter by group: </label> 
            <select className="board-details-select">
                <option>none</option>
                {props.groups.map(group => 
                <option 
                key={group.key} 
                value={group.name}>
                    {group.name}
                </option>)}
            </select>
            <button>apply</button>
            <br/>
            <label className="board-details-text">filter by importance: </label> 
            <select className="board-details-select">
                <option value="1">none</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <button>apply</button>
        </div> : null
    )
    

    return <div>

        <h1 className="notes-text">notes</h1>
        <div className="notes-panel-button">
        <button className="notes-button" onClick={activateInputHandler}>add note</button>
        <button className="notes-button" onClick={props.clearAllNotes}>delete all notes</button>
        </div>

        {inputView}

        {filterBy}

        {props.notes.length > 0 ? props.notes.map(note => {
                return <Note
                key={note.key}
                idNote={note.key}
                text={note.text}
                memberOfGroup={note.group}
                noteImportance={note.importance}
                groups={props.getGroups}
                set={props.setNote}
                delete={props.deleteNote}
                edit={props.editNote}
                increaseImportance={props.increaseNoteImportance}
                groupToUse={props.groupToUse}
                addToGroup={props.addToGroup}
                />
        }) : <p className="notes-text">no notes</p>}

    </div>

}


export default Notes;