import React from 'react';
import Notepad from './Notepad';

const mockData = [
  {
    id: '1',
    description: 'test notepad',
    files: {
      'test.json': {
        content: "{\"title\": \"title1\", \"content\": \"content1\"}"
      }
    }
  },
]

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
  return (
    <div style={styles.AppContainer}>
      <div style={styles.MainTitle}>Notepad Application</div>
      <div>
        <Notepad
          key={'new notepad'}
          notepad={{}}
          isNew
        />
        {mockData.map((notepad, index)=>(
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