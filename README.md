# comics-sans
Create digital comics, sans the hassle!

---

### Table of contents
* Introduction
* Demo
* Tech Stack
* Setup
* About the team

---
### 👋 Introduction

Comic Sans is an online comic creator. Artists can use shapes and characters to craft digital creations! Add text and drawings to personalize, then save or download your art!
Comic Sans is an online comic creator built with the fabric.js library. Users can select shapes, colors, characters, text and drawings to create their own digital art. Fabric granted the ability to select and change the elements on the canvas, but presented a real learning curve for our team. React was used for our clean interface, and Redux allows the user to save their canvas.

--- 

### 📹 Demo 
✨🧚check out comic sans [here](http://comicsans-app.herokuapp.com/)🧚✨

--- 

### 🥞 Tech Stack

**Frontend:**
* React / Redux 
* Fabric.js
* React Bootstrap

**Backend:**
* Node.js / Express
* PostgreSQL / Sequelize

---

### 👾 Instructions

#### 💅🏼 Spinning up frontend

`cd client`\
`npm start`\
Navigate to `http://localhost:3000/` to access the front end.

#### ◼️ Spinning up backend

`cd server`\
`npm start`\
Navigate to `http://localhost:8080/` to access all things server related.

#### 💾 Setting up the database

run `createdb comic-sans` to create the database.\
run `npm run seed` to seed the database, don't forget to run this script from /server.

To test server connection, spin up the server and navigate to
`http://localhost:8080/ping` in your browser. \

#### 🚀 Deployment

Run `deploy.sh` script when main branch is ready to be promoted to production. The script will create a separate deploy branch, push the code to heroku's main. 

**Post build actions** \
Run `heroku run bash` to connect to production dyno. \
`cd /server` and `npm run seed` to seed the database.

---

### 🙋‍♀️ Amazing humans that made this app a reality

Made with ❤️ by\
[Laura Gilbert](https://github.com/laurakathryngilbert)\
[Yuliya Kandratsyeva](https://github.com/heyitsyuliya)\
[Desiree Nelson](https://github.com/Anzu4)\
[Kat Papaloukas](https://github.com/codingwithkat)
