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

export const saveNotepad = async (url = '', data = {}) => {
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

export const createNotepad = async (url = '', data = {}) => {
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

export const deleteNotepad = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
    },
  });
  return response;
}