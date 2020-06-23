import React from 'react';

const Actions = (props) => {
    return (
        <div>
            <button onClick={props.add}>Notes</button>
            <button onClick={props.clear}>Clear All Notes</button>
            <button onClick={props.groups}>Groups</button>
        </div>
    );
}

export default Actions;