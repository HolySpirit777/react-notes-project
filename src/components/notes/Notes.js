import React, { useState } from 'react';

export const GetGroups = (props) => {
    return (
        <div>
        <select onChange={props.groupToUse}>
        {props.getGroups.map(group => <option key={group.key} value={group.name}>{group.name}</option>)}
        </select>
        <br />
        <button onClick={props.addToGroup}>add</button>
        </div>

    )
}

const Notes = (props) => {

    let [toggle, setToggle] = useState(true);
    let [toggleGroup, setToggleGroup] = useState(false);

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
        <div className="note">
            { toggle ? <div>
            <br/>
            <label>{props.text}</label>
            <br/>
            <label>Group: {props.memberOfGroup}</label>
            <br/>
            <button onClick={props.delete}>delete note</button>
            <button onClick={() => setToggleGroup(toggleGroup = !toggleGroup)}>add to group</button>
            <button onClick={returnBox}>edit</button>
            {groups}
            </div> : <div>
            <br/>
            <textarea onChange={props.set}></textarea>
            <br/>
            <button onClick={updateReturn}>update</button>
            <button onClick={returnBox}>return</button>
            </div>
}
        </div>
    );
}

export default Notes;