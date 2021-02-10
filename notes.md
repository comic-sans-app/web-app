# Code Review II

## Retro

#### Roses
* Pairing on authentication led to a lot of "lightbulb moments" (Laura)
* Stronger knowledge of fullstack data flow (Kate)
* Reading other teammates' code, (e.g, Redux) creates lightbulbs (Desiree)
* Seeing app coming together, higher-order knowledge of app development, state mgmt (Yuliya)

#### Thorns
* Deployment sans-Boilermaker (Laura + Yuliya)
* Firebase image URLs is pre-rose, currently taints Canvas (Kate + Yuliya)
* Sidebar layer w/ React Context was a false start (Desiree)


## MVP

* Overall quite robust what we have on deployed
* Remove Redux Logger
* Disable download button if img is added (if we can't solve tainted canvas)
    * Bonus: Include Toast Warning "Comics w/ Images may not be saved .... grumble grumble copyright law?"


## Product Roadmap

### Priority Features
* Auth
* Save collection to user
* Continuously work on art, when logged in
* Debounce for panel implementation
    * check if x/y of panel intersects w/ x/y of shape, and simple disable placement if true

```
class Square {
    top-left: [15, 50],
    bottom-left : [15, 0],
    top-right : [50,50],
    bottom-right: [50, 0]
}

const findRange = (Square) => ({
    x: [Square.top-left[0], Square.top-right[0]],
    y : [Square.top-left[1], Square.bottom-left[1]],
})

const border = {
    x: {min: -50, max: 50},
    y: 0
}

const isOverlapping = (Square, border) => {
    //if any x on Square is between min and max of border && any y on Square is between min and max of border, return false

    // If the left-most corner of Square is greater than leftmost border x val OR right-most corner is less that rightmost AND it overlaps w/ y value, this square can't be placed
    if((Square.x[0]) > border.x.min) || (Square.x[1]) < border.x.max) &&  (Square.y[0]) > border.y) || (Square.y[1]) < border,y) return false
    
    // else return true
    else return true
    
}

```

### Yuliya's Deployment adventure

#### Challenges
* Heroku errs: Heroku wants `package.json`, but CRA was a blocker
* building vs ejecting
* Did we end up using a buildpack?
    * Yes for node.js, no for CRA

#### Solutions

Some solutions to consider w/ CRA deployment:

1) Microservices
    * Client-side service
        ** CRA w/ Heroku "Zero-config" buildpack
        ** Talks to separately-deployed Express Server
        ** Protip: make sure any AJAX requests reflect deployed server URL NOT localhost

2) Eject CRA (you can even have a CI/CD hook e.g, Travis, Gulp, Codeship do this)
    * Have your express server serve Ejected app as a static asset


### SSL Dev vs Prod

```

let db;
if(process.env.NODE_ENV === 'production') {
    db = new Sequelize("url", {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
} else {
    db = new Sequelize("url", {
        // no dialect options here
    })
}



```

### Tainted Canvas
* Can save images as SVGs? Fabric will block this. 
* Hosting images on firebase 

### Secondary Features
* Send via email/social media
* collaborative art

* Deployment woes
* Security w/ Firebase
* Image flow w/ Firebase