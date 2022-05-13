const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const expbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
const session = require("express-session");

app.engine("handlebars", expbs.engine());
app.set("view engine", "handlebars");

const session = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});
