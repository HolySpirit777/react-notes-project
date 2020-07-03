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
        <div className="groups-show-panel">
            {
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
            }
        </div>

    );

    let createPanel = (
        showCreate && <div className="groups-input-panel">
                <label>name of group: </label> <input className="groups-input-text" type="text" placeholder="enter the text" value={groupName} onChange={groupNameHandler}/>
                <button className="groups-button" onClick={addHandler}>add group</button>
            </div>
    );

    return (
        <div className="groups-board-parent">
            <div className="groups">
            <h2>groups</h2>
            <button className="groups-button" onClick={showCreatePanel}>create group</button>
            <button className="groups-button" onClick={showGroupsPanel}>show groups</button>
            <button className="groups-button" onClick={props.clearGroups}>delete all groups</button>
            <br/>
            <br/>
            {showGroup}
            {createPanel}
        </div>
        </div>

    )
}

export default Groups;