const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

const error = {
  status: 400,
  message: "Bad request",
  errors: ["Server error message"],
};

server.use((req, res, next) => {
  // Continue to JSON Server router
  next();
});

//get data from db.json
const usrData = server.get(
  "/agentSender/detailsForAgentCustomer/:agentExposableId",
  (req, res, next) => {
    const conation = req.query.email === "mohammed@codelantic.com";
    if (conation) {
      res.jsonp(router.db.get("user_data").value());
    } else {
      res.status(401).jsonp(error);
    }

    console.log(req.params.agentExposableId, req.query.email);
  }
);
