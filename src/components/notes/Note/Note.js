import React, {useState} from 'react';
import './Note.css';

const GetGroups = (props) => {
    return (
        <div>
        <select onChange={props.groupToUse}>
        <option>none</option>
        {props.getGroups.map(group => <option key={group.key} value={group.name}>{group.name}</option>)}
        </select>
        <br />
        <button onClick={props.addNoteToGroup}>add</button>
        </div>

    )
}

const Note = (props) => {

    let [toggleGroup, setToggleGroup] = useState(false);
    let [toggle, setToggle] = useState(true);

    let groups = (
        (toggleGroup && props.groups.length > 0) && <GetGroups 
        getGroups={props.groups} 
        addNoteToGroup={() => props.addToGroup(props.idNote)}
        groupToUse={props.groupToUse} 
        />
    );

    function returnBox() {
        setToggle(toggle = !toggle);
    }

    function  updateReturn() {
        props.edit();
        setToggle(toggle = !toggle);
    }

    return (
        <div className="note-note">
        { toggle ? <div>
        <br/>
        <button className="note-button-importance" onClick={() => props.increaseImportance(props.idNote)}>importance {props.noteImportance}</button><br/>
        <label className="note-text">{props.text}</label>
        <br/>
        <label>group: {props.memberOfGroup}</label>
        <br/>
        <button className="note-button" onClick={() => props.delete(props.idNote)}>delete note</button>
        <button className="note-button" onClick={() => setToggleGroup(toggleGroup = !toggleGroup)}>add to group</button>
        <button className="note-button" onClick={returnBox}>edit</button>
        {groups}
        {props.groups.length > 0 ||  <label>'no groups created'</label>}
        </div> : <div>
        <br/>
        <textarea onChange={(e) => props.set(e, props.idNote)}></textarea>
        <br/>
        <button className="note-button" onClick={updateReturn}>update</button>
        <button className="note-button" onClick={returnBox}>return</button>
        </div>
}
    </div>
    )
}

export default Note;
