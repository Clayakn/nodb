const express = require('express'); 
const bodyParser = require('body-parser');
const mC = require(__dirname + '/controllers/storyboards_controller');


const app = express();

app.use(bodyParser.json());
    
app.post('/api/storyboards', mC.create);
app.get('/api/storyboards', mC.read);
app.put('/api/storyboards/:id', mC.update)
app.delete('/api/storyboards/:id', mC.delete)

app.get('/api/storyboards/search', mC.getByExpanison)

port = 4000;
app.listen(port,console.log(`server running on port ${port}`))