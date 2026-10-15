# Shellyard demo app

A tiny notes API (no dependencies) used to demo [Shellyard](https://github.com/devcoreio-com/shellyard):
add a server, clone this repository as a project, and put a coding agent to work on a branch.

```sh
npm test      # node --test
npm start     # http://localhost:3000/notes
```

Routes: `GET /notes`, `POST /notes` with `{"text": "..."}`.
