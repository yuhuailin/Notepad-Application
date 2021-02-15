To run the app:

before start, create a bearer token to authorize gist API in Personal access tokens page (https://github.com/settings/tokens) on your github account and update the token variable REACT_APP_BEARER_TOKEN in .env file

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Functional descriptions:

1. `Create` will create a new notepad, given that at least one note is added and all inputs fields are validated
2. `Delete` for notepad will delete an existing notepad
3. `Save` for notepad will save all additions, deletions and modifications of notes and changes for title of notepad
4. `Add` will add a new note in local, given that note title and content are validated. Changes will be saved to github when click save button
5. `Delete` for note will delete an existing note, by marking note (gist file) as isDeleted in gist. Changes will be saved to github when click save button
