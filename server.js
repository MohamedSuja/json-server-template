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
server.get(
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

server.post("/v1/auth/authenticate", (req, res) => {
  const conation =
    req.body.username === "mohammed@codelantic.com" &&
    req.body.password === "Test_1user";

  if (conation) {
    res.jsonp(router.db.get("auth").value());
  } else {
    res.status(401).jsonp(error);
  }
});

const PORT = process.env.PORT || 3000;
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
