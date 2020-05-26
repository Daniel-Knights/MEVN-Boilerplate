<h1>MEVN Boilerplate</h1>

A MEVN boilerplate setup with example CRUD, auth/user, lazy-loaded photos, and pagination functionality out of the box.

Includes Heroku deployment walkthrough.

Requires manually setting up a [MongoDB](https://www.mongodb.com) database.

[Demo](https://vue-express-js.herokuapp.com/)

## From boilerplate

```bash
npm i

npm run dev

cd client

npm i

npm run serve
```

In `server/config/default.json` add your MongoDB connection string.

In `server/routes/api/auth.js` and `server/routes/api/posts.js`, inside the collection functions, replace "vue_express" with your database name:

```bash
return client.db("vue_express").collection("users");
```

For the photo page to work, go to [Pixabay](https://pixabay.com/accounts/register/) and register for an account. Then go to the [docs page](https://pixabay.com/api/docs/), copy your given API key and replace ```<API_KEY>``` in the Axios request of the photos page. 

Else, you can set up your own backend solution for photos and the frontend should fit to suit.

Then it will be available at http://localhost:8080.

## From scratch

**Express**

```bash
npm init

npm i express cors mongodb bcryptjs jsonwebtoken -D nodemon
```

In `package.json` replace

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

with

```json
"scripts": {
    "start": "node server/index.js",
    "dev": "nodemon server/index.js"
},
```

**Vue**

```bash
npm i -g @vue/cli #If not already installed

vue create client

cd client

npm i axios vue-axios vue-outside-events vue-meta vue-lazyload
```

**Git**

```bash
git init
git add . && git commit -m 'Initial commit'
git push
```

# Deploy to Heroku

**Vue**

```
cd client
npm run build
```

**Heroku**

Make an [account](http://heroku.com) if you haven't already.

Then from your terminal:

```bash
heroku login
heroku create <!your-app-name>
```

Then go to https://dashboard.heroku.com/apps click on your app, click 'deploy', choose the GitHub deployment method and follow the instructions.

## Troubleshooting

If you've chosen automatic GitHub deployment on Heroku and something isn't working, try manually deploying instead, sometimes the automatic deployment can act a little strange.

In MongoDB Atlas go to network access and allow IP addresses from anywhere.

If you're having trouble with Sass, make sure to install [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) (if using VSCode, otherwise consult the [docs](https://sass-lang.com/)) and configure your settings.json to include this:

```json
"liveSassCompile.settings.formats": [
    {
        "format": "compressed",
        "extensionName": ".min.css",
        "savePath": "/client/public/css"
    }
],
```

Otherwise, it may be an error on my end so submit an issue if you think this is the case.

## Credit

Credit to Brad Traversy for providing most of this code from his tutorials. To learn more about this repo check out his videos covering both [MERN](https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE) and [MEVN](https://www.youtube.com/watch?v=j55fHUJqtyw&list=PLillGF-RfqbYSx-Ab1xWVanGKtowTsnNm).
