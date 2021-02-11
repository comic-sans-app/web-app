# comics-sans

### ✨🧚check out comic sans [here](http://comicsans-app.herokuapp.com/)🧚✨

### 💅🏼 Spinning up frontend

`cd client`\
`npm start`\
Navigate to `http://localhost:3000/` to access the front end.

### ◼️ Spinning up backend

`cd server`\
`npm start`\
Navigate to `http://localhost:8080/` to access all things server related.

### 💾 Setting up the database

run `createdb comic-sans` to create the database.\
run `npm run seed` to seed the database, don't forget to run this script from /server.

To test server connection, spin up the server and navigate to
`http://localhost:8080/ping` in your browser. \

### 🚀 Deploying

For development purposes we need to comment out the following block of code in db.js.\
`dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }`

Before pushing to main, make sure to leave this code in, otherwise it will break SSL connection in production environment.

`git push heroku main` will run heroku-postbuild script, bundle the app and serve all files generated during build process. \

**Post build actions** \
Run `heroku run bash` to connect to production dyno. \
`cd /server` and `npm run seed` to seed the database.

Made with ❤️ by\
[Desiree Nelson](https://github.com/Anzu4)\
[Laura Gilbert](https://github.com/laurakathryngilbert)\
[Kat Papaloukas](https://github.com/codingwithkat)\
[Yuliya Kandratsyeva](https://github.com/heyitsyuliya)
