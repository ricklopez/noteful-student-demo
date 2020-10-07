import React from 'react';
import './App.css';

import {Switch, Route, Link, useRouteMatch,
  useParams} from 'react-router-dom'
import ListMain from '../ListMain/ListMain'
import ListNav from '../ListNav/ListNav'
import AddFolder from '../Add/AddFolder'
import AddNote from '../Add/AddNote'
import Note from '../Note/Note'
import MainPage from '../NoteMainPage/MainPage'
import NotePageNav from '../NotePageNav/NotePageNav'
import Dummy from '../DummyStore'
import Endpoint from '../endpoint'
import { findFolder, findNote, findNotesForFolder} from '../HelperFuncs'
import NoteContext from '../NoteContext'
 
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function FolderPage() {
   let { folderId } = useParams();
  return (
    <div>
      <h3>Requested Folder ID: {folderId}</h3>
      <ListNav/>
      <ListMain/>
    </div>
  );
}

export default class App extends React.Component{

  state = {
    notes :[],
    folder : []
  }

  componentDidMount() {
    Promise.all([
      fetch(`${Endpoint.ApiEndpoint}/notes`),
      fetch(`${Endpoint.ApiEndpoint}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        console.log(notes)
        console.log(folders)
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }




  render(){
    const contextValues = {
      folders : this.state.folders,
      notes : this.state.notes

    };
    return (
      <NoteContext.Provider value={ contextValues } >
        <div className="App">
            <header className="App-header">
              <h1 className="logo">
                <Link to="/">Noteful</Link>{' '}
              </h1>
             <nav className="App_nav">
                      <ul className="App_nav">
                         <li>
                           <Link to="/">Home</Link>
                         </li>
                         <li>
                           <Link to="/users">Users</Link>
                         </li>
                         <li>
                           <Link to="/folder/7">Folders</Link>
                         </li>
                      </ul>
                  </nav>
            </header>
           
           
            <main className="App_main">
            
            </main>
          </div>
          <Switch>
            <Route path="/folder/:folderId">
              <FolderPage/>
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
      </NoteContext.Provider>
      
    );
  }
}