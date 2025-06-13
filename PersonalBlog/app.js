const express = require(`express`);
const app = express();
const { posts, appPort, appURL } = require(`./data/db`);
const postsRouter = require('./routers/posts');


app.use(express.static(`public`));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Server del mio blog`);
});

app.get(`/bacheca`, (req, res) => {
    res.json({ posts });
});

// Routers
app.use(`/posts`, postsRouter);

// Middlewares
const notFound = require(`./middlewares/notFound`);
app.use(notFound);

const errorHandler = require(`./middlewares/errorHandler`);
app.use(errorHandler);

app.listen(appPort, () => {
    console.log(`Server listening on ${appURL}`);
});