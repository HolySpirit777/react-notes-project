import React from 'react';
import './Actions.css';

const Actions = (props) => {
    return (
        <div className="menu-buttons">
            <button onClick={props.add}>notes</button>
            <button onClick={props.groups}>groups</button>
        </div>
    );
}

export default Actions;