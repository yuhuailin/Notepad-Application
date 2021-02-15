import React, { useEffect, useState }  from 'react';
import Notepad from './Notepad';
import { fetchNotepads } from '../services/index';

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

const NotepadApp = () => {
  const [notepads, setNotepads] = useState([]);
  const [refetch, setRefetch] = useState(false);

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

  useEffect(()=>{
    if (refetch) {
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
      .finally(()=>{setRefetch(false)})
    }
  }, [refetch])

  return (
    <div style={styles.AppContainer}>
      <div style={styles.MainTitle}>Notepad Application</div>
      <div>
        <Notepad
          key={'new notepad'}
          notepad={{}}
          setRefetch={setRefetch}
          isNew
        />
        {notepads.map((notepad, index)=>(
          <Notepad 
            key={`${notepad.id}_${index}`}
            notepad={notepad}
            setRefetch={setRefetch}
          />
        ))}
      </div>
    </div>
  )
}

export default NotepadApp;