import React from 'react';

const styles = {
  row: {
    "display": "flex",
    "flexDirection": "row",
    "flexWrap": "wrap",
  },
  column: {
    "display": "flex",
    "flexDirection": "column",
    "width": "50%",
    "minWidth": "270px",
    "margin": "12px 12px 12px 0",
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
    "marginTop": "12px",
    "marginBottom": "12px",
  },
  input: {
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
}

const Note = (props) => {
  const { note, disabled } = props;

  return (
    <div style={styles.row}>
      <div style={styles.column}>
        <input
          style={styles.input}
          placeholder="Enter note title..."
          maxLength="255"
          onChange={()=>{}}
          value={note.content.title}
        />
        <textarea
          style={styles.inputArea}
          placeholder="Enter note..."
          maxLength="1000"
          onChange={()=>{}}
          value={note.content.content}
        />
      </div>
      <div>
        <button
          style={styles.deleteButton}
          onClick={()=>{}}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Note;