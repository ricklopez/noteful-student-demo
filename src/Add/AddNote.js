import React from 'react'
import NoteContext from '../NoteContext'
import Endpoint from '../endpoint'


export default class AddNote extends React.Component {
 

static contextType = NoteContext;

static defaultProps = {
        history:{
            push: () => {}
        }
    }

//Api call that handles AddNote form submission

handleSubmit= e => {
    //preventDefault since we're dealing with a form
    e.preventDefault()
    
    const newNote ={
        name: e.target['note-name'].val(),
        content: e.target['note-content'].val(),
        folder: e.target['note-folder-id'].val()

    }

    fetch(`${Endpoint.ApiEndpoint}/notes`,{
        headers:{
            'content-type': 'application/json'
        },
        method: "POST"
    })
    .then(response => {
        if(!response.ok) {
            return (response.json().then(e=> Promise.reject(e)))
        }
        return response.json()
    })
    .then(note =>{
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
    })
    .catch(err => {
        alert({err})
    })


}



render(){
    
    const {folders=[]} = this.context
        
    return(
          <div className = "AddNoteForm">
              <h2>Add New Note</h2>
              <form onSubmit = {this.handleSubmit}>
               <div>
               <label>Name</label>
                <input type='text' name='note-title'>Title</input>   
               </div>  
               <div> 
                <label>Content</label>
                <textarea  name='note-content'/>
               </div> 
               <div>
                 <label>Select Folder To Add Note To</label>
                 <select name="note-folder-id">
                     {folders.map(folder => 
                        <option key={folder.id} value={folder.id}>
                         {folder.name}
                        </option>)}
                 </select>
                 <div>
                     <button type='submit'>
                         Add New Note
                     </button>
                 </div>                   
               </div>   
              </form>
           </div>

        )
    }
}
