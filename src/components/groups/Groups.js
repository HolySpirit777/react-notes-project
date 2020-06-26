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

    let showGroup = (
        showGroups && props.groups.map(group => {
            return <div key={group.key}>
                <label>name of group: {group.name}</label><br/>
                <label>notes:</label><br/>
                {group.notes.length > 0 ? group.notes.map(note => {
                    return <div key={note.key}>
                        <label>{note.text}</label>
                    </div>
                }) : <b>no notes added</b>}
            </div>
        })
    );

    let createPanel = (
        showCreate && <div>
                <label>name of group: </label> <input type="text" value={groupName} onChange={groupNameHandler}/>
                <button className="groups-button" onClick={addHandler}>add group</button>
            </div>
    );

    return (
        <div className="groups">
            <h1>groups</h1>
            <button className="groups-button" onClick={showCreatePanel}>create group</button>
            <button className="groups-button" onClick={showGroupsPanel}>show groups</button>
            <button className="groups-button" onClick={props.clearGroups}>delete all groups</button>
            <br/>
            <br/>
            {showGroup}
            {createPanel}
        </div>
    )
}

export default Groups;