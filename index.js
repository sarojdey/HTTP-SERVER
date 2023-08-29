const http = require("http");

const PORT = 3000;

const server = http.createServer(); //! step-1 create server

const friends = [
  { id: 0, name: "saroj" },
  { id: 1, name: "bikram" }, // this is the data
  { id: 2, name: "gouri" },
];

server.on("request", (req, res) => {
  //! step-2 set call back for request event
  // on event : request we get req as a readable stream having a header and body res is a writeable stream that we are going to return
  const items = req.url.split("/"); // we split the url to separate the parameter from the parameterised url
  if (req.method === "POST" && items[1] === "friends") {
    //! step-3 routing
    req.on("data", (data) => {
      const friend = data.toString(); // req gives a readble stream file so we convert it into string
      friends.push(JSON.parse(friend)); // then using JSON.parse() we convert it into an object
      console.log(friend);
      res.statusCode = 200; // we need to send the response status code
    });
    req.pipe(res); // after the whole data is recieved we pipe it directly into res.. here the req and res are same
  } else if (req.method === "GET" && items[1] === "friends") {
    res.setHeader("Content-Type", "text/plain"); // if we are sending back any data we need to specify the Content-Type using setHeader()
    if (Number(items[2]) >= friends.length) {
      res.statusCode = 404; // if any error expected then return statusCode = 404
      res.end(); // dont forget to end res everytime
    }
    if (items.length === 3) {
      res.statusCode = 200;
      res.end(JSON.stringify(friends[Number(items[2])])); // here we are returing a response but the end() takes string so we convert object to string
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("this page returns messages");
  } else if (req.method === "GET" && items[1] === "") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello");
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}..`); //! step-4 make sure the srever is listening by using listen(port,callback())
}); 

//127.0.0.1 = localhost
