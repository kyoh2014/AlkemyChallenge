const app = require('../app');
const {PORT} = require('../configs/index');
const db = require('../configs/db');

// Database connection
app.listen(PORT, ()=> {
    console.log("conected in port: " + PORT);
    db.sync({force: false})
    // Connected to database
    .then(() => {
        console.log('We have connected to the database.');
    }).catch(error => {
        console.log('An error has occurred', error);
    })
});