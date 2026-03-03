const express = require("express");
const path = require("path");
const dotenv=require('dotenv');
const cors = require("cors");
const app = express()

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.port;

const corsOptions ={
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(()=>{
    console.log(`server is running on ${port}`);
})
