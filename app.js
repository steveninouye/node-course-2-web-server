const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n', error => {
    if (error) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //   res.send("<h1>Hello Express!</h1>");
  res.render('../views/home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the Home Page',
    time: new Date().getTime()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

//   /bad
app.get('/bad', (req, res) => {
  res.send({
    bad: 'stuff',
    error: 'not here'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${[port]}`);
});
