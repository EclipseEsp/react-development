// Expressjs
const express = require('express'); //exports a single function , funcion createApplication()
//if 'express' module returns a object express = object, if it returns a function express = function
const path = require('path')
const app = express();
// require('express') exports a single function, function createApplication() {...}
// express is then assigned that function express = function createApplication() {...}
// express is now a function that can be used to an app (see ./lib/expresss)


// app.use is used to bind application-level (http://localhost:8000) to ./build containing .html
// in this case, serve a static content from the build directory
// Without this line, http://localhost:8000 will result in "Cannot Get/""
// server.listen(8000) use to listen for http get request which is
// later served a static page with app.use
app.use(express.static(path.join(__dirname,'build')))

//--------------------------------------------------------------------------------------
// Establish Connection to MySQL
const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'ReactDB'
// });
//--------------------------------------------------------------------------------------

// Socket.io ,  // require
const server = require('http').Server(app); // create http server with app function (from express)
const io = require ('socket.io')(server); // io is now Socket.IO.Server

// server.js is the routes
// server.listen(listen)
// io.listen(listens on the socket 8000)

server.listen(8000,()=>{
    console.log("listening on port 8000:")
});

// io.on means ON RECEIVE connection do this...
// RECAP: callback function just a normal function to be called when an event happens.
io.on('connection', (socket) => { // callback function(socket) receives a socket { socket.emit...; socket.on...;}
    socket.emit('news', { server: 'Acknowledged Connection' }); // emit back {hello: 'world'} to client.
    // socket is receiving end, wheneven receive 'my other event', data will be displayed
    
    // FLOW: Client1: messages -> Server.js -> insertDB & update Client2
    socket.on('Client1', (data) => {
        console.log(data);
        //console.log(Object.values(data)[0]);

        //Connect to MYSQL --------------------------------------------------------------
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'ReactDB'
        });

        connection.connect( function(err) { // same as (err) => {...}
            if(err) throw err;
    
            console.log('Connected!');
            
            // Inserting a ROW into customers with columns- (name,address) = ('Company PTE LTD', 'Highway 42')
            
            var sql = "INSERT INTO messages (user_id, message_body, sent_date) VALUES ('" 
                    + Object.values(data)[0] + "','"
                    + Object.values(data)[1] + "',"
                    + "Now() );";
            //var sql = "DELETE FROM customers WHERE id = 7";
            //var sql = "SELECT * FROM customers";
            
            // .query takes in ("sql statement", function(error,result){ execute when error/result}  );
            
            connection.query(sql, function (err, result, fields) {    
                if (err) throw err;
                connection.end();
                console.log("1 record inserted");
                console.log(result);
                emitMessages();
            });
        });
    });
    socket.on('Chatbox Initialise',(data) => {
        console.log(data); // receive { message: 'request} from client
        emitMessages();
   });
});

//function to send socket with Messages
function emitMessages(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'ReactDB'
    });
    var sql = "SELECT * FROM messages";
    connection.query(sql, function (err, result, fields) {    
        if (err) throw err;
        connection.end();
        console.log(result);
        //socket.emit('from server', { server: result }); { result } == array[][]
        io.sockets.emit('Client2', result);
    });
}

// app.get('/fetch', (req, res) => {
//     console.log('fetching')
//   return res.send('fetch result')
// })

//app.listen(3000)


// connection.connect( function(err) { // same as (err) => {...}
//     if(err) throw err;
//     console.log('Connected!');
    
//     // Inserting a ROW into customers with columns- (name,address) = ('Company PTE LTD', 'Highway 42')
    
//     //var sql = "INSERT INTO customers (name, address) VALUES ('Company PTE LTD', 'Highway 42')";
//     //var sql = "DELETE FROM customers WHERE id = 7";
//     var sql = "SELECT * FROM customers";
    
//     // .query takes in ("sql statement", function(error,result){ execute when error/result}  );
//     connection.query(sql, function (err, result, fields) {    
//         if (err) throw err;
//         console.log("1 record inserted");
//         console.log(fields);
//     });
    
//     // connection.query("SELECT * FROM customers", function(err, result, fields){
//     //     if (err) throw err;
//     //     console.log(result);
//     // });
// })