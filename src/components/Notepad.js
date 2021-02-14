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

const Notepad = (props) => {
  const { notepad, isNew } = props
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [desc, setDesc] = useState(notepad.description??'')

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
              onClick={()=>{}}
            >
              Create
            </button>
          </> : 
          <>
            <button
              style={styles.saveButton}
              onClick={()=>{}}
            >
              Save
            </button>
            <button
              style={styles.deleteButton}
              onClick={()=>{}}
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
          onClick={()=>{}}
        >
          Add
        </button>
      </div>
      {notepad.files && Object.keys(notepad.files).map((noteName, index)=>(
        <Note 
          key={`${noteName}_${index}`}
          note={notepad.files[noteName]}
        />
      ))}
    </div>
  )
}

export default Notepad;