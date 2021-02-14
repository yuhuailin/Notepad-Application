import React, { useState } from 'react';
import Note from './Note';

const styles = {
  container: {
    "backgroundColor": "white",
    "borderRadius": "4px",
    "border": "1px solid #CCC",
    "padding": "12px",
    "margin": "12px",
  },
  inputLabel: {
    "fontSize": "12px",
    "paddingTop": "6px",
    "paddingBottom": "6px",
  },
  input: {
    "border": "1px solid #CCC",
    "width": "30%",
    "minWidth": "150px",
    "padding": "6px",
    "marginBottom": "12px",
  },
  titleRow: {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "flexWrap": "wrap"
  },
  header: {
    "fontSize": "18px",
    "paddingTop": "12px",
  },
  column: {
    "display": "flex",
    "flexDirection": "column",
    "width": "50%",
    "minWidth": "270px",
    "marginTop": "12px",
    "marginBottom": "12px"
  },
  noteTitle: {
    "border": "1px solid #CCC",
    "padding": "6px"
  },
  inputArea: {
    "border": "1px solid #CCC",
    "width": "100%",
    "height": "100px",
    "resize": "none",
    "boxSizing": "border-box",
    "marginTop": "6px",
    "padding": "6px"
  },
  addButton: {
    "padding": "6px",
    "backgroundColor": "#57B93E",
    "fontSize": "14px",
    "color": "white",
    "border": "1px solid #CCC",
    "textAlign": "center",
    "textDecoration": "none",
    "cursor": "pointer",
    "borderRadius": "4px",
    "width": "80px",
  },
  saveButton: {
    "padding": "6px",
    "backgroundColor": "#39ACDC",
    "fontSize": "14px",
    "color": "white",
    "border": "1px solid #CCC",
    "textAlign": "center",
    "textDecoration": "none",
    "cursor": "pointer",
    "borderRadius": "4px",
    "width": "80px",
  },
  deleteButton: {
    "padding": "6px",
    "backgroundColor": "#EC3646",
    "fontSize": "14px",
    "color": "white",
    "border": "1px solid #CCC",
    "textAlign": "center",
    "textDecoration": "none",
    "cursor": "pointer",
    "borderRadius": "4px",
    "width": "80px",
    "marginLeft": "12px",
  },
}

const saveNotepad = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

const createNotepad = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

const deleteNotepad = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
    },
  });
  return response;
}

const Notepad = (props) => {
  const { notepad, isNew, setRefetch } = props
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [desc, setDesc] = useState(notepad.description??'')
  const [notes, setNotes] = useState(notepad.files)
  const [disabled, setDisabled] = useState(false)

  const handleAdd = () => {
    let newNotes = {...notes}
    if (title === '') {
      console.log('note title cannot be empty')
    }
    if (content === '') {
      console.log('note content cannot be empty')
    }
    if (title === '' || content === '') {
      return
    }
    let isValid = true
    notes && Object.keys(notes).forEach((name)=>{
      if (notes[name].content.title === title) {
        console.log('note title needs to be unique')
        isValid=false
        return
      }
    })
    if (!isValid) {
      setTitle('')
      return
    }
    const note = {
      content: {
        title,
        content
      }
    }
    newNotes = {...newNotes, [`${title}.json`]: note }
    setNotes(newNotes)
    setTitle('')
    setContent('')
  }

  const handleCreate = () => {
    let files = {}
    if (desc === '') {
      console.log('notepad title cannot be empty')
    }
    if (!notes || Object.keys(notes).length < 1) {
      console.log('add a note first')
    }
    if (desc === '' || !notes || Object.keys(notes).length < 1) {
      return
    }
    Object.keys(notes).forEach((name)=>{
      files = {
        ...files,
        [name]: {
          content: JSON.stringify(notes[name].content)
        }
    }})
    setDisabled(true)
    createNotepad(process.env.REACT_APP_NOTEPAD_APPLICATION_HOST, { files, description: desc, public: true })
    .then((data)=>{
      setRefetch(true)
      setNotes({})
      setTitle('')
      setContent('')
      setDesc('')
    })
    .catch(e=>{console.log(e)})
    .finally(()=>{
      setDisabled(false)
    })
  }

  const handleSave = () => {
    let files = {}
    let isValid = true
    Object.keys(notes).forEach((name)=>{
      if (notes[name].content.title === '') {
        console.log('note title cannot be empty')
        isValid = false
        return
      }
      if (notes[name].content.content === '') {
        console.log('note content cannot be empty')
        isValid = false
        return
      }
      files = {
        ...files,
        [name]: {
          content: JSON.stringify(notes[name].content)
        }
    }})
    if (!isValid) {
      return
    }
    if (desc === '') {
      console.log('notepad title cannot be empty')
      return
    }
    setDisabled(true)
    saveNotepad(`${process.env.REACT_APP_NOTEPAD_APPLICATION_HOST}/${notepad.id}`, { files, description: desc })
    .then((data)=>{
      setRefetch(true)
    })
    .catch(e=>{console.log(e)})
    .finally(()=>{
      setDisabled(false)
    })
  }

  const handleDelete = () => {
    setDisabled(true)
    deleteNotepad(`${process.env.REACT_APP_NOTEPAD_APPLICATION_HOST}/${notepad.id}`)
    .then((data)=>{
      setRefetch(true)
    })
    .catch(e=>{console.log(e)})
    .finally(()=>{
      setDisabled(false)
    })
  }

  const handleDeleteNote = (notes) => {
    let files = {}
    Object.keys(notes).forEach((name)=>{
      files = {
        ...files,
        [name]: {
          content: JSON.stringify(notes[name].content)
        }
    }})
    setDisabled(true)
    deleteNotepad(`${process.env.REACT_APP_NOTEPAD_APPLICATION_HOST}/${notepad.id}`)
    .then(()=> createNotepad(process.env.REACT_APP_NOTEPAD_APPLICATION_HOST, { files, description: desc, public: true }))
    .then((data)=>{
      setRefetch(true)
    })
    .catch(e=>{console.log(e)})
    .finally(()=>{
      setDisabled(false)
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.inputLabel}>Notepad Title</div>
      <div style={styles.titleRow}>
        <input 
          style={styles.input} 
          placeholder="My notepad title..." 
          maxLength="255"
          value={desc}
          onChange={(e)=>{setDesc(e.target.value)}}
        />
        <div>
          {isNew? 
          <>
            <button
              style={styles.addButton}
              onClick={handleCreate}
              disabled={disabled}
            >
              Create
            </button>
          </> : 
          <>
            <button
              style={styles.saveButton}
              onClick={handleSave}
              disabled={disabled}
            >
              Save
            </button>
            <button
              style={styles.deleteButton}
              onClick={handleDelete}
              disabled={disabled}
            >
              Delete
            </button>
          </>}
        </div>
      </div>
      <div style={styles.header}>My Notes</div>
      <div style={styles.column}>
        <input
          style={styles.noteTitle}
          placeholder="Enter note title..."
          maxLength="255"
          onChange={(e)=>{setTitle(e.target.value)}}
          value={title}
        />
        <textarea
          style={styles.inputArea}
          placeholder="Enter note..."
          maxLength="1000"
          onChange={(e)=>{setContent(e.target.value)}}
          value={content}
        />
      </div>
      <div>
        <button
          style={styles.addButton}
          onClick={handleAdd}
          disabled={disabled}
        >
          Add
        </button>
      </div>
      {notes && Object.keys(notes).map((noteName, index)=>(
        <Note 
          key={`${noteName}_${index}`}
          note={notes[noteName]}
          disabled={disabled}
          setNotes={setNotes}
          notes={notes}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
    </div>
  )
}

export default Notepad;