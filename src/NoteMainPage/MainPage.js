import React from 'react';
import Note from '../Note/Note'
import { findFolder, findNote, findNotesForFolder} from '../HelperFuncs'
import NoteContext from '../NoteContext'

export default class MainPage extends React.Component {

    static defaultProps = {
        match : {
            params: {}
        }
    }

    static contextType = NoteContext

    render(){
        const{ notes=[]} = this.context
        const{ noteID } = this.props.match.params
        const note = findNote(notes, noteID) || {content: ''}

        return(
           <div className ="MainPage">
                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}/>
                <div className = 'content'>
                {note.content.split(/\n\r|\n/).map((pgh,i) =>
                <p key={i}>{pgh}</p>)}
                </div>
            </div>






        )
    }
}