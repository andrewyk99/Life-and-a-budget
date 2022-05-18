const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const expbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const PORT = process.env.PORT || 3002;

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.engine("handlebars", expbs.engine());
app.set("view engine", "handlebars");

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
  sequelize.sync({
    force: false,
  });
});

// router.get("/login", (req, res) => {
//   res.render("login");
// });
