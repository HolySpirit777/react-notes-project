import React from 'react';
import './Actions.css';

const Actions = (props) => {
    return (
        <div className="menu-buttons">
            <div className="menu-button-center">
            <button className="menu-button" onClick={props.add}>notes</button>
            <button className="menu-button" onClick={props.groups}>groups</button>
            </div>

        </div>
    );
}

export default Actions;