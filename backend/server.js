const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

// for testing purposes
// const helloRoute = require("./routes/router");
// app.use('/api',helloRoute);

app.listen(PORT, ()=>{
    console.log("Server Listening on PORT: ", PORT);
});

