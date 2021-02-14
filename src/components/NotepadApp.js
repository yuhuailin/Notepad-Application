import React, { useEffect, useState }  from 'react';
import Notepad from './Notepad';

const styles = {
  AppContainer: {
    "maxWidth": "1024px",
    "minWidth": "320px",
    "overflow": "auto",
    "fontFamily": "Arial, Helvetica, sans-serif",
    "backgroundColor": "lightgray",
    "color": "#333"
  },
  MainTitle: {
    "fontSize": "24px",
    "paddingTop": "12px",
    "paddingLeft": "24px",
  }
}

export const fetchNotepads = async (url = process.env.REACT_APP_NOTEPAD_APPLICATION_HOST, data = {}) => {
  const response = await fetch(url, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
    },
  });
  const notepads = await response.json();
  const notepadsReponses = await Promise.all(notepads.map((notepad)=>fetch(`${process.env.REACT_APP_NOTEPAD_APPLICATION_HOST}/${notepad.id}`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
    },
  })))
  const notepadsWithNotes = await Promise.all(notepadsReponses.map((response)=>
    response.json()
  ))
  return notepadsWithNotes;
}

const NotepadApp = () => {
  const [notepads, setNotepads] = useState([]);
  useEffect(()=>{
    fetchNotepads()
    .then((data)=>{
      const filteredData = data.filter(notepad=>notepad.files)
      filteredData.forEach(notepad => {
        const files = notepad.files
        Object.keys(files).forEach(name => {
          files[name].content = JSON.parse(files[name].content)
        })
      })
      setNotepads(filteredData);
    })
    .catch(e=>{console.log(e)})
  }, [])

  return (
    <div style={styles.AppContainer}>
      <div style={styles.MainTitle}>Notepad Application</div>
      <div>
        <Notepad
          key={'new notepad'}
          notepad={{}}
          isNew
        />
        {notepads.map((notepad, index)=>(
          <Notepad 
            key={`${notepad.id}_${index}`}
            notepad={notepad}
          />
        ))}
      </div>
    </div>
  )
}

export default NotepadApp;