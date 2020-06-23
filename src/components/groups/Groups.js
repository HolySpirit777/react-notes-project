import React, {useState} from 'react';
import './Groups.css';

const Groups = (props) => {

    let [groupName, setGroupName] = useState('');
    let [showCreate, setCreate] = useState(false);
    let [showGroups, setGroups] = useState(false);

    const showCreatePanel = () => {
        setCreate(!showCreate);
        setGroups(showGroups = false);
    }

    const showGroupsPanel = () => {
        setGroups(!showGroups);
        setCreate(showCreate = false);
    }

    const groupNameHandler = (e) => {
        setGroupName(groupName = e.target.value);
    }

    function addHandler() {
        if(groupName !== '') {
            props.addGroup(groupName);
            setGroupName(groupName = '');
        } else {
            alert('field is empty!');
        }

    }

    let showGroup = null;
    let createPanel = null;

    if(showCreate) {
        createPanel = (
            <div>
                <label>name of group: </label> <input type="text" value={groupName} onChange={groupNameHandler}/> <br/>
                <button onClick={addHandler}>add group</button>
            </div>
        )
    }

    if(showGroups) {
        showGroup = (
                props.groups.map(group => {
                    return <div key={group.key}>
                        <label>Name of group: {group.name}</label><br/>
                        <label>Notes:</label><br/>
                        {group.notes.length > 0 ? group.notes.map(note => {
                            return <div key={note.key}>
                                <label>{note.text}</label>
                            </div>
                        }) : <b>No notes added</b>}
                    </div>
                })
        )
    }

    return (
        <div className="groups">
            <h1>Groups</h1>
            <button onClick={showCreatePanel}>create group</button>
            <button onClick={showGroupsPanel}>show groups</button>
            <button onClick={props.clearGroups}>clear groups</button>
            <br/>
            <br/>
            {showGroup}
            {createPanel}
        </div>
    )
}

export default Groups;