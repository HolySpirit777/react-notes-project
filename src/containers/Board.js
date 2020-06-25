import React from 'react';
import Actions from '../components/actions/Actions';
import Notes from '../components/notes/Notes';
import Groups from '../components/groups/Groups';
import './Board.css';

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
        this.increaseNoteImportance = this.increaseNoteImportance.bind(this);

    }

    //Notes section

    addNote() {

        if(this.state.textNote) {
            let notes = this.state.notes ? [...this.state.notes] : [];
            notes.push({key: ID(), text: this.state.textNote, group: 'None', importance: 0});
            this.setState({
                notes: notes,
                showNotes: true,
                textNote: ''
            });
        } else {
            alert('field empty');
        }

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
                notes: notes
            });
        }

    }

    activateNote() {

            this.setState(
                {
                    showNotes: !this.state.showNotes,
                    showGroups: false
                }
            )
    
    }

    setNote(event) {
        
        this.setState({
            textNote: event.target.value
        });

    }

    clearNotes = () => {
        this.setState({
            notes: []
        })
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

    increaseNoteImportance(noteKey) {
        let notes = this.state.notes.slice();
        for (const index in notes) {
            if(notes[index].key === noteKey){
                if(notes[index].importance < 10) {
                    notes[index].importance += 1;
                }
            }
        }

        this.setState({
            notes: notes
        });
    }

    clearInput = () => {
        this.setState({
            textNote: ''
        });
    }

    //Groups section

    clearGroups = () => {
        let notes = [...this.state.notes];
        for (let note = 0; note < notes.length; note++) {
            notes[note].group = 'None';
        }
        this.setState({
            groups: [],
            notes: notes
        });
    }

    activateGroups() {
        this.setState({
            showGroups: !this.state.showGroups,
            showNotes: false
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

        let notes = null;
        let groups = null;
        let filterBy = null;

        if(this.state.showGroups) {
            groups = <Groups  
            groupName={this.setGroupName} 
            addGroup={this.addToGroup} 
            groups={this.state.groups}
            clearGroups={this.clearGroups}
            />

        }

        if(this.state.showNotes) {
            notes = <Notes
                notes={this.state.notes}
                edit={this.ediNote}
                toggleAction={this.toggleEdit}
                selectGroups={this.state.selectGroups}
                showSelectedGroups={this.showGroupsNotes}
                groups={this.state.groups}
                addNoteToGroup={this.addNoteToGroup}
                groupToUse={this.setGroupToUse}
                increaseImportance={this.increaseNoteImportance}
                />
        }

        filterBy = (
            this.state.groups.length > 0 && this.state.showNotes && this.state.notes.length > 0 ? <div className="board-details">
                <label className="board-details-text">filter by group: </label> 
                <select className="board-details-select">
                    <option>none</option>
                    {this.state.groups.map(group => 
                    <option 
                    key={group.key} 
                    value={group.name}>
                        {group.name}
                    </option>)}
                </select>
                <button>apply</button>
                <br/>
                <label className="board-details-text">filter by importance: </label> 
                <select className="board-details-select">
                    <option value="1">none</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <button>apply</button>
            </div> : null
        )

        let details = (
            <div className="board-details">
                <label>total of notes: </label>{this.state.notes ? this.state.notes.length : 0}
                <br />
                <label>total of groups: </label>{this.state.groups ? this.state.groups.length : 0}
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
                {filterBy}
                {notes}
            </div>
        )
    }
}

export default Board;