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
            notesFilter: [],
            originalNotes: [],
            groups: [],
            selectGroups: false,
            showGroups: false,
            showNotes: false,
            valueEdit: {
                key: '',
                text: ''
            },
            groupName: '',
            groupToUse: ''
        }

        this.addNote = this.addNote.bind(this);
        this.activateNote = this.activateNote.bind(this);
        this.activateGroups = this.activateGroups.bind(this);
        this.addToGroup = this.addToGroup.bind(this);
        this.increaseNoteImportance = this.increaseNoteImportance.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.setValueEdit = this.setValueEdit.bind(this);

    }

    //Notes section

    addNote(value) {

        if(value) {
            let notes = this.state.notes ? [...this.state.notes] : [];
            notes.push({key: ID(), text: value, group: 'none', importance: 0});
            this.setState({
                notes: notes,
                showNotes: true,
                originalNotes: notes
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
            notes: notes,
            originalNotes: notes
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
                originalNotes: notes
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

    clearNotes = () => {

        this.setState({
            notes: [],
            originalNotes: []
        });

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
            notes: notes,
            originalNotes: notes
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
            notes: notes,
            originalNotes: notes
        });
    }

    activateGroups() {
        this.setState({
            showGroups: !this.state.showGroups,
            showNotes: false
        });
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
        });
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
            groups: groups,
            originalNotes: notes
        });
    }

    setGroupToUse = (e) => {
        this.setState({
            setGroupToUse: e.target.value
        });
    }

    //Filter section

    removeAllFilters = () => {
        this.setState({
            notes: this.state.originalNotes
        });
    }

    filterNotesByGroup = (value) => {
        let notes = [...this.state.notes];
        let filterApplied = notes.filter(note => note.group === value);
        this.setState({
            notes: filterApplied
        });
    }

    render() {

        let groups = (
            this.state.showGroups && <Groups  
            groupName={this.setGroupName} 
            addGroup={this.addToGroup} 
            groups={this.state.groups}
            clearGroups={this.clearGroups}
            />
        );

        let notes = (
            this.state.showNotes && <Notes
                notes={this.state.notes}
                edit={this.ediNote}
                toggleAction={this.toggleEdit}
                selectGroups={this.state.selectGroups}
                showSelectedGroups={this.showGroupsNotes}
                groups={this.state.groups}
                addToGroup={this.addNoteToGroup}
                groupToUse={this.setGroupToUse}
                increaseImportance={this.increaseNoteImportance}
                addNote={this.addNote}
                clearAllNotes={this.clearNotes}
                getGroups={this.state.groups}
                deleteNote={this.deleteNote}
                setNote={this.setValueEdit}
                editNote={this.ediNote}
                increaseNoteImportance={this.increaseNoteImportance}
                showNotes={this.state.showNotes}
                filterByGroup={this.filterNotesByGroup}
                removeFilter={this.removeAllFilters}
                />
        );

        let details = (
            <div className="board-details">
                <label>total of notes: </label>{this.state.notes ? this.state.notes.length : 0}
                <br />
                <label>total of groups: </label>{this.state.groups ? this.state.groups.length : 0}
            </div>
        )
        

        return (
            <div>

                <Actions 
                add={this.activateNote} 
                groups={this.activateGroups} 
                />

                {details}

                {groups}

                {notes}

            </div>
        )
    }
}

export default Board;