const express = require('express'); 
const bodyParser = require('body-parser');
const mC = require(__dirname + '/controllers/comments_controller');


const app = express();

app.use(bodyParser.json());
    
app.post('/api/comments', mC.create);
app.get('/api/comments', mC.read);
app.put('/api/comments/:id', mC.update)
app.delete('/api/comments/:id', mC.delete)

app.get('/api/comments/search', mC.getByExpanison)

port = 4001;
app.listen(port,console.log(`server running on port ${port}`))