# Notes App
Web app to manage notes (read, save, update and delete).

## Requirements

You need to have installed 

- MongoDB. You can download here [MongoDB Community Server](https://www.mongodb.com/try/download/community).

- And also [Node JS](https://nodejs.org/en/download/).

## Installation

- Use the package manager *npm* to install the dependencies with the command: `npm ci`.

- In the root directory create a .env file, put the next fields in this file and fill it with your data.

```
PORT=
NOTES_APP_MONGODB_HOST=
NOTES_APP_MONGODB_DB=
SESSION_SECRET=
```

Example:

```
PORT=3000
NOTES_APP_MONGODB_HOST=localhost
NOTES_APP_MONGODB_DB=notes-app-db
SESSION_SECRET=some-session-secret
```

## Usage

- Run the next command `npm run dev`.

- Open in the browser http://localhost:3000/ (port 3000 by default).


