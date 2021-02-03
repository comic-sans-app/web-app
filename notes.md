# Code Review I

## Roses / Thorns

### Roses
* Katerina: learning Fabric.js
* Yulia: All roses so far, collaboration, good team enthusiasm and synchrony
* Laura: looking forward to working w/ team 
* Desiree: good luck pulling from other codebases

### Thorns
* Katerina: also learning Fabric/Canvas
* Yuliya: It's all roses so far, saving canvas to Redux store is a tough challenge
* Laura: Thorny day on adding new page without understanding how we manage state
* Desiree: no thorns

## Workflow
* Good to see emphasis on pair programming, ~60% of work in pairs
* Individual sandbox learning on new tech, document learning moments on slack
* Demo days for showing, critiquing code
* Excellent use of taskboard, Love the User Stories broken into Vertical slices and horizontal tasks

## Proof of Concept

* Excellent UI
* Buttons are a little wonkily placed, but I think we know this
* What is our design library, if any? Glad it doesn't look bootstrappy
* Bootstrap can be pretty bloated, but consider auditing just for using design tools needed
* Nitpik: lets avoid building out UI for features that don't exist yet
* Are images uploaded in reverse?

`Canvas.js`
* Lots of code should be moved into their own components
* Take any hard-coded values, and move them to a `shape-config.json` that is imported as necessary
* In general, this is a large file which may be a mantainability risk, break into smaller hooked components for shapes and nav
* Why Fabric and not just Canvas?
    * Fabric allows for OO interface, rather than raw SVG
    * This will make state mgmt a bit trickier than vectors

### API
* Relational postgres will work, but not sure if necessary
* This seems like more a DOCUMENT based need rather than a RELATIONAL based need
```javascript
{
 1 :{
name: "Dan",
 comics: [
     {
         title : "Power Puff Girls Fight Mojojojo!"
         content : {
             .....
         }
     }, 
     {
         title : "Batman + Superman BFFs <3"
         content : {
             .....
         }
     }, 
 ],
 2 : { 
    name: "Betsy",
    comics: [
     {
         title : "Family picnice"
         content : {
             .....
         }
     }, 
     {
         title : "blah blah"
         content : {
             .....
         }
     }, 
 ]
 }
}
```
* Postgres allows for JSONs as a supported data type, but most other SQL variants will not

## MVP Roadmap

* Let's Deploy ASAP
* Finish up all UX stories (lots of dummy buttons that exist)
* Save images for account
* Social media feed to post creations
* Look into React Context for sharing canvas between components