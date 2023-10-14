const path = require("path");
const express = require("express");
const expbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");
const helpers = require("./utils/helpers")//add helper file after
const hbs = expbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 2099;

const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "Super secret blog",
    cookie: {
        maxAge: 900000,
        httpOnly: true,
        ssecure: false,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});