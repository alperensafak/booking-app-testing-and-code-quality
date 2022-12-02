# NodeJS - Testing with Jest

**Booking App**

This is a Node.js and Express application that accepts and lists restaurant reservations.

## Getting Started

```bash
npm install
npm start
```

The server runs on port 8000.

There are three routes:

- http://localhost:8000/ - homepage
- http://localhost:8000/reservations - submit a reservation booking request
- http://localhost:8000/admin - view all booking requests; basic auth login/password `admin`

The server persists using a SQLite3 database named `database.sqlite` in the site root.

## Development

This project uses EditorConfig to standardize text editor configuration. Visit https://editorconfig.org for details.

This project uses ESLint to detect suspicious code in JavaScript files. Visit https://eslint.org for details.
### Testing

This project uses Jest for testing. Visit https://jestjs.io for details.

To execute tests: "npm test".

### Debugging

This project uses https://www.npmjs.com/package/debug for development logging. To start `nodemon` and enable logging:

```bash
npm run debug
```