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
        <button onClick={props.addToGroup}>add</button>
        </div>

    )
}

const Note = (props) => {

    let [toggleGroup, setToggleGroup] = useState(false);
    let [toggle, setToggle] = useState(true);

    let groups = null;

    if(toggleGroup) {
        groups = props.groups.length > 0 ? <GetGroups 
        getGroups={props.groups} 
        addToGroup={() => props.addNoteToGroup(props.idNote)}
        groupToUse={props.groupToUse} 
        />
        : <><br/>
        <label>'No groups created'</label>
        </>
    }

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
        <button className="note-button-importance" onClick={() => props.increaseImportance(props.idNote)}>Importance {props.noteImportance}</button><br/>
        <label className="note-text">{props.text}</label>
        <br/>
        <label>Group: {props.memberOfGroup}</label>
        <br/>
        <button className="note-button" onClick={props.delete}>delete note</button>
        <button className="note-button" onClick={() => setToggleGroup(toggleGroup = !toggleGroup)}>add to group</button>
        <button className="note-button" onClick={returnBox}>edit</button>
        {groups}
        </div> : <div>
        <br/>
        <textarea onChange={props.set}></textarea>
        <br/>
        <button className="note-button" onClick={updateReturn}>update</button>
        <button className="note-button" onClick={returnBox}>return</button>
        </div>
}
    </div>
    )
}

export default Note;
