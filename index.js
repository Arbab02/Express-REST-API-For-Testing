// const path = require('path')
// const express = require('express')
// const app = express()
// const port = 3000
// const hostname = '127.0.0.1'


// const staticPath = path.join(__dirname, './public')
// app.use(express.static(staticPath))

// // console.log(__dirname, './src')
// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>')

// })



// app.get('/about', (req, res) => {
//   res.send('<h1>Hello About</h1>')
// })


// app.get('/user', (req, res) => {
//   res.send(
//     {
//     name: 'Arbab',
//     id: 22

//   })
// })

// app.listen(port, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })


// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Use the bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create an array to store sample data
const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Define routes for your API

// Get a list of items
app.get('/items', (req, res) => {
  res.json(data);
});

// Get a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = data.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = data.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    data.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongodb+srv://arbab02:<password>@cluster0.m3fklkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority