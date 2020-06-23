import React from 'react';
import './Actions.css';

const Actions = (props) => {
    return (
        <div className="menu-buttons">
            <button onClick={props.add}>Notes</button>
            <button onClick={props.clear}>Clear All Notes</button>
            <button onClick={props.groups}>Groups</button>
        </div>
    );
}

export default Actions;