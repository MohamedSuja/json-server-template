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

//get user data from db.json
server.get(
  "/agentSender/detailsForAgentCustomer/:agentExposableId",
  (req, res, next) => {
    const conation = req.query.email === "mohammed@codelantic.com";
    if (conation) {
      res.jsonp(router.db.get("user_data").value());
    } else {
      res.jsonp({
        status: false,
        errorCode: 777,
        errorDescription: "Specified Email does not exist",
        responseDto: null,
      });
    }

    console.log(req.params.agentExposableId, req.query.email);
  }
);

//update user data from db.json
server.put("/user/update", (req, res) => {
  const conation = req.body.userId == 357;
  if (conation) {
    res.jsonp({
      status: true,
      errorCode: 0,
      errorDescription: null,
      responseDto: {
        id: 357,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        contactNo: req.body.contactNo,
        address: req.body.address,
        password: req.body.password,
        isRegistred: "CREATED",
      },
    });
  } else {
    res.jsonp({
      status: false,
      errorCode: 777,
      errorDescription: "Specified Usee id does not exists",
      responseDto: null,
    });
  }
});

//agentExposableId
server.get("/agentSender/getExposableIdByUsername", (req, res) => {
  const conation = req.query.username === "mohammed@codelantic.com";
  if (conation) {
    res.jsonp({
      status: true,
      errorCode: 0,
      errorDescription: null,
      responseDto: {
        agentExposableId: "JVb3mfaNS29",
      },
    });
  } else {
    res.status(401).jsonp({
      timestamp: "2023-12-25T11:11:03.221+00:00",
      status: "BAD_REQUEST",
      errors: ["Specified Email does not exist"],
    });
  }
});

server.post("/v1/auth/authenticate", (req, res) => {
  const conation =
    req.body.username === "mohammed@codelantic.com" &&
    req.body.password === "Test_1user";

  if (conation) {
    res.jsonp(router.db.get("auth").value());
  } else {
    res.status(401).jsonp({
      path: "/v1/auth/authenticate",
      error: "Unauthorized",
      message: "Please provide correct Credentials.",
      timestamp: 1703489927578,
      status: 401,
    });
  }
});

//request otp
server.post("/resetPassword/request", (req, res) => {
  const conation = req.body.username === "mohammed@codelantic.com";
  if (conation) {
    res.jsonp({
      sucess: true,
    });
  } else {
    res.status(401).jsonp({
      timestamp: "2023-12-25T13:12:03.198+00:00",
      status: 400,
      errors: ["Please provide a valid Activated by mail address."],
    });
  }
});

//Verify otp
server.get("/resetPassword/validate", (req, res) => {
  const conation = req.query.token === "177408";
  if (conation) {
    res.jsonp({
      status: true,
      errorCode: 0,
      errorDescription: null,
      responseDto: "failed",
    });
  } else {
    res.status(401).jsonp({
      timestamp: "2023-12-25T13:15:03.001+00:00",
      status: 400,
      errors: ["Enter a valid OTP"],
    });
  }
});

//reset password
server.post("/resetPassword/reset", (req, res) => {
  const conation = req.body.token === "177408";
  if (conation) {
    res.jsonp({
      status: true,
      errorCode: 0,
      errorDescription: null,
      responseDto: "failed",
    });
  } else {
    res.status(401).jsonp({
      timestamp: "2023-12-25T13:15:03.001+00:00",
      status: 400,
      errors: ["Token can't be blank"],
    });
  }
});

const PORT = process.env.PORT || 3000;
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
