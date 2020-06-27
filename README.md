<h1>MEVN Boilerplate</h1>

A MEVN boilerplate setup with:

<ul>
 <li>Example CRUD functionality</li>
 <li>Auth/user functionality</li>
 <li>Lazy-loaded photos</li>
 <li>Email</li>
 <li>Validation</li>
 <li>Pagination</li> 
</ul> 

Includes Heroku deployment walkthrough.

Requires manually setting up a [MongoDB](https://www.mongodb.com) database.

[Demo](https://mevn-js.herokuapp.com/)

## From boilerplate

```bash
npm i -g nodemon
nodemon

cd client

npm i
npm run serve
```

Create a `.env` file in your root directory and add:

```txt
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=sl_myJwtSecret
EMAIL_ACCOUNT=<your-gmail-account>
EMAIL_PASSWORD=<your-google-app-password>
PORT=3000
```

Create a `.env` file in the `client` directory and add:

```txt
VUE_APP_NODE_ENV=development
```

In `server/routes/api/auth.js` and `server/routes/api/posts.js`, inside the collection functions, replace "vue_express" with your database name:

```js
return connection.db("vue_express").collection("users");
```

For the photo page to work, go to [Pixabay](https://pixabay.com/accounts/register/) and register for an account. Then go to the [docs page](https://pixabay.com/api/docs/), copy your given API key and replace `<API_KEY>` in the Axios request of the photos page.

Else, you can set up your own backend solution for photos and the frontend should fit to suit.

Create a [Fontawesome kit](https://fontawesome.com/) and replace the one already in the `<head>` of `client/public/index.html`.

Then it will be available at http://localhost:8080.

## From scratch

**Express**

```bash
npm init

npm i express cors mongodb dotenv bcryptjs jsonwebtoken compression helmet nodemailer morgan
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
    "start": "node server/server.js",
    "serve": "npm run serve --prefix client",
},
```

**Vue**

```bash
npm i -g @vue/cli #If not already installed

vue create client

cd client

npm i axios vue-axios vue-outside-events vue-meta vue-lazyload vue-scrollactive
```

# Deploy to Heroku

**Vue**

```bash
cd client
npm run build
```

**Heroku**

Make an [account](http://heroku.com) if you haven't already.

Then from your terminal:

```bash
heroku login
heroku create <your-app-name>
```

Then go to https://dashboard.heroku.com/apps click on your app, click 'deploy', choose the GitHub deployment method and follow the instructions.

Also, go to your apps settings and set config vars matching your root `.env` variables. Set a config var for `VUE_APP_NODE_ENV` but add a value of `production` instead of `development`, then add another variable with a key of `NODE_ENV` and value of `production`.

## Troubleshooting

If you've chosen automatic GitHub deployment on Heroku and something isn't working, try manually deploying instead, sometimes the automatic deployment can act a little strange.

In MongoDB Atlas go to network access and allow IP addresses from anywhere or add specific IP addresses if known.

Make sure you run `npm run build` in `/client` before deploying or your changes won't be served.

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
