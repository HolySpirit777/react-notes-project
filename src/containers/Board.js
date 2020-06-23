import React from 'react';
import Actions from '../components/actions/Actions';
import Notes from '../components/notes/Notes';
import Groups from '../components/groups/Groups';

const Input = (props) => {

    let max = 40;

    return (
        <div>
            <label>Add Notes</label>
            <br/>
            <textarea maxLength={max} name="nota" value={props.value} placeholder="Enter the text" onChange={props.input}></textarea>
            <br/>
            <label>Characters left: {max - props.value.length} </label>
            <br/>
            <button onClick={props.add}>Add</button>
            <button onClick={props.clear}>Clear</button>
        </div>
    );
}

let ID = function () {
    return Math.random().toString(16).substr(5);
  };

class Board extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            groups: [],
            selectGroups: false,
            showGroups: false,
            showNotes: false,
            activateInput: false,
            toggle: true,
            textNote: '',
            valueEdit: {
                key: '',
                text: ''
            },
            groupName: '',
            groupToUse: ''
        }

        this.setNote = this.setNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.activateNote = this.activateNote.bind(this);
        this.activateGroups = this.activateGroups.bind(this);
        this.addToGroup = this.addToGroup.bind(this);

    }

    setValueEdit(e, key) {

        this.setState({
            text: e.target.value,
            valueEdit: {
                key: key,
                text: e.target.value
            }
        });

    }

    addNote() {

        if(this.state.textNote) {
            let notes = this.state.notes ? [...this.state.notes] : [];
            notes.push({key: ID(), text: this.state.textNote, group: 'None'});
            this.setState({
                notes: notes,
                showNotes: true,
                textNote: ''
            });
        } else {
            alert('field empty');
        }

    }

    activateNote() {

        this.setState({
            activateInput: !this.state.activateInput,
            showGroups: false,
            showNotes: true
            
        });

    }

    setNote(event) {
        
        this.setState({
            textNote: event.target.value
        });

    }

    deleteNote(key) {

        let notes = [...this.state.notes];
        let index;

        for(let count = 0; count < notes.length; count++){
            if(notes[count].key === key) {
                index = count;
            }
        }

        notes.splice(index, 1);

        this.setState({
            notes: notes
        });

    }

    ediNote = () => {

        let notes = [...this.state.notes];
        let index;

        if(this.state.valueEdit.text) {
            for(let count = 0; count < notes.length; count++){
                if(notes[count].key === this.state.valueEdit.key) {
                    index = count;
                }
            }
    
            notes[index].text = this.state.valueEdit.text;
            this.setState({
                notes: notes,
                toggle: !this.state.toggle
            });
        }



    }

    clearNotes = () => {
        this.setState({
            notes: []
        })
    }

    clearInput = () => {
        this.setState({
            textNote: ''
        });
    }

    clearGroups = () => {
        this.setState({
            groups: []
        });
    }

    toggleEdit = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    activateGroups() {
        this.setState({
            showGroups: !this.state.showGroups,
            showNotes: false,
            activateInput: false
        })
    }

    setGroupName = (e) => {
        this.setState({
            groupName: e.target.value
        });
    }

    addToGroup(name) {

            let groups = this.state.groups ? [...this.state.groups] : [];
            let found = false;
 
            for(let group = 0; group < groups.length; group++) {
                if(groups[group].name === name) {
                    found = true;
                    alert('the name already exits!');
                }
            }
            if(found === false) {
                groups.push({name: name, key: ID(), notes: []});
            }

            this.setState({
                groups: groups,
                groupName: ''
            });

    }

    showGroupsNotes = () => {
        this.setState({
            selectGroups: !this.state.selectGroups
        })
    }

    addNoteToGroup = (noteKey) => {
        let notes = [...this.state.notes];
        let groups = [...this.state.groups];
        let index = 0;
        let indexNote = 0;
        let note = notes.filter(note => note.key === noteKey);
        for (const note of notes) {
            if(note.key === noteKey) {
                console.log(note.key);
                break;
            }
            indexNote++;
        }
        for (const group of groups) {
            if(group.name === this.state.setGroupToUse) {
                note[0].group = groups[index].name;
                notes[indexNote].group = groups[index].name;
                groups[index].notes.push(note[0]);
            }
            index++;
        }
        this.setState({
            notes: notes,
            groups: groups
        })
    }

    setGroupToUse = (e) => {
        this.setState({
            setGroupToUse: e.target.value
        })
    }
    

    render() {

        let input = null
        let notes = null;
        let groups = null;

        if(this.state.showGroups) {
            groups = <Groups  
            groupName={this.setGroupName} 
            addGroup={this.addToGroup} 
            groups={this.state.groups}
            clearGroups={this.clearGroups}
            />

        }

        if(this.state.activateInput) {
            input = <Input 
            input={this.setNote} 
            add={this.addNote} 
            clear={this.clearInput} 
            value={this.state.textNote}
            />
        }

        if(this.state.showNotes) {
            notes = this.state.notes.map(note => {
                return <Notes 
                key={note.key}
                idNote={note.key} 
                text={note.text} 
                memberOfGroup={note.group}
                delete={this.deleteNote.bind(this, note.key)}
                edit={this.ediNote}
                set={(e) => this.setValueEdit(e, note.key)}
                toggleAction={this.toggleEdit}
                toggleNote={this.state.toggle}
                selectGroups={this.state.selectGroups}
                showSelectedGroups={this.showGroupsNotes}
                groups={this.state.groups}
                addNoteToGroup={this.addNoteToGroup}
                groupToUse={this.setGroupToUse}
                />
                
            });

        }

        let details = (
            <div>
                <label>Total of notes: </label>{this.state.notes ? this.state.notes.length : 0}
                <br />
                <label>Total of groups: </label>{this.state.groups ? this.state.groups.length : 0}
            </div>
        )

        return (
            <div className="App">
                <Actions 
                add={this.activateNote} 
                clear={this.clearNotes}
                groups={this.activateGroups} />
                {details}
                {groups}
                {input}
                {notes}
            </div>
        )
    }
}

export default Board;