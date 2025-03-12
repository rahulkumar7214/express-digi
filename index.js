import express from "express"; // this is ES6 syntax for importing modules

const app = express(); // create an express app which means we are creating a server 
const port = 3000;

/*
app.get("/", (req, res) => {
  res.send("Hello from Hitesh and his tea!");
});

app.get("/ice-tea", (req, res) => {
  res.send("What ice tea would you  prefer?");
});

app.get("/twitter", (req, res) => {
  res.send("rahuldotcom");
});
*/

//it is a simple crud application to add, update, delete and get the tea data from the server 

app.use(express.json()); // this is a middleware to parse the incoming request body as JSON from the client(frontend)

let teaData = []; // this is an array to store the tea data
let nextId = 1; // this is a variable to store the next id for the tea

// add a new tea
app.post("/teas", (req, res) => {  // this states that when a POST request is made to /teas, the following function will be executed
  // post request is used to add a new resource
  
  const { name, price } = req.body;  // this line is used to extract the name and price from the request body sent by the client 

  const newTea = { 
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea); 
  res.status(201).send(newTea); // this line is used to send the newly created tea back to the client with a status code of 201
});

// get all teas
app.get("/teas", (req, res) => { // it is used to get all the teas from the server and send it back to the client
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id)); // this line is used to find the tea with the given id that is sent by the client in the request URL 
  // that is why we use req.params.id and every thing in the url is in thr form of string so we use parseInt to convert it into integer

  if (!tea) {  // if the tea is not found then we send a 404 status code with a message "Tea not found"
    return res.status(404).send("Tea not found");
  }

  res.status(200).send(tea);
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const{name, price} = req.body;
  tea.name = name;
  tea.price = price;
  
  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }

  teaData.splice(index, 1);
  res.status(204).send("Deleted");
  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
