import React, { useState } from 'react';
import Note from './Note/Note';
import './Notes.css';

// let ID = function () {
//     return Math.random().toString(16).substr(5);
//   };

const Input = (props) => {

    let max = 100;

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
            <textarea class="notes-input" maxLength={max} name="nota" value={textNote} placeholder="Enter the text" onChange={setTextNoteHandler}></textarea>
            <br/>
            <label>characters left: {max - textNote.length} </label>
            <br/>
            <button className="notes-button" onClick={addTextNote}>add</button>
            <button className="notes-button" onClick={clearTextHandler}>clear</button>
        </div>
    );
}

const Notes = props => {

    let [activateInput, setActivateInput] = useState(false);
    let [filterGroup, setFilterGroup] = useState();
    // let [importanceListFilter, setimportanceListFilter] = useState([]);

    // useEffect(() => {

    //     let notes = [...props.notes];
    //     let inNotes = false;

    //     for (const note of notes) {
    //         if(importanceListFilter.length < 1) {
    //             setimportanceListFilter([{importance: note.importance, key: ID()}])
    //         } else {
    //             for (const iterator of importanceListFilter) {
    //                 console.log(iterator);
    //                 if(iterator.importance === note.importance) {
    //                     inNotes = true;
    //                 }
    //             }
    //         }
    //         if(!inNotes) {
    //             setimportanceListFilter([...importanceListFilter, {importance: note.importance, key: ID()}]);
    //         }
    //     }
    //     // console.log(importanceListFilter);

    // },[props.notes, importanceListFilter]);

    let filterBy = (
        (props.groups.length > 0 && props.showNotes && props.notes.length) && <div className="board-details">
            <label className="board-details-text">filter by group: </label> 
            <select onChange={(e) => setFilterGroup(filterGroup = e.target.value)} className="board-details-select">
                <option>none</option>
                {props.groups.map(group => 
                <option 
                key={group.key} 
                value={group.name}>
                    {group.name}
                </option>)}
            </select>
            <button onClick={() => props.filterByGroup(filterGroup)}>apply</button>
            <br/>
            {/* <label className="board-details-text">filter by importance: </label> 
            <select className="board-details-select">
                <option>none</option>
                {importanceListFilter.map(importance => <option key={importance.key} value={importance.importance}>
                {importance.importance}
                </option>)}
            </select>
            <button>apply</button>
            <br /> */}
            <button onClick={props.removeFilter}>remove filter</button>
        </div>
    );

    let inputView = (
        activateInput && <Input add={props.addNote} />
    )

    const activateInputHandler = () => {
        setActivateInput(activateInput = !activateInput);
    }

    return <div>


        <div className="notes-board-parent">
            
        <div className="notes-board">

        <h2 className="notes-text">notes</h2>
        <div className="notes-panel-button">
        <button className="notes-button" onClick={activateInputHandler}>add note</button>
        <button className="notes-button" onClick={props.clearAllNotes}>delete all notes</button>
        </div>

        {inputView}

        {filterBy}

        {props.notes.length > 0 ? props.notes.map(note => <Note
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
        ) : <p className="notes-text">no notes</p>}
        
        </div>

        </div>




    </div>

}


export default Notes;