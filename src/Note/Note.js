import React from 'react';
import NoteContext from '../NoteContext'
import Endpoint from '../endpoint'
import { findFolder, findNote, findNotesForFolder} from '../HelperFuncs'
import PropTypes from 'prop-types';





import { Link } from 'react-router-dom';
//import { format } from 'date-fns';


export default class Note extends React.Component{

   static contextType = NoteContext;

   handleDelete = e => {
     //store id of clicked note  
    const noteId = this.props.id

    //we'll delete this id with fetch method : delete
    fetch (`${Endpoint.ApiEndpoint}/notes/${noteId}` , {
     method: "DELETE",
     //copy/pasted from syllabus instructions
     headers: {
         'context-type': 'application/json'
     }
    })
    //.then not required. DELETE method does not return a response. 
    .catch(err => {
        alert({err})
    })

   }

   render(){

        //destructure name, id and modified from folders : [] in NoteContext.js. These 
        //values are available in Note.js bc we've declared static contextType = NoteContext;
        //at the top

        const {name, id , modified} = this.props

        //<div className="modified">
                   //Modified : {format(modified, 'Do MMM YYYY')}
               //</div>

        return (
            <div className = "Note">
               <h2 className= "title">
                   <Link to={'/note/{id}'}>
                       {name}
                   </Link>
               </h2>
               <button className= "deleteButton" type="button" onClick={this.handleDelete}>
                 Delete 
               </button>
               
            </div>



        )
    
   }


}

Note.propTypes = {
    id: PropTypes.number,
    name:PropTypes.string,
    modified:PropTypes.string
  };



