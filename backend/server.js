const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Note = require("./models/Note");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
    res.send("Backend Running");
});


// POST API
app.post("/notes", async (req,res)=>{

    try{

        const { title, content } = req.body;

        const newNote = new Note({
            title,
            content
        });

        await newNote.save();

        res.status(201).json(newNote);

    }catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});


// GET API
app.get("/notes", async (req,res)=>{

    try{

        const notes = await Note.find();

        res.status(200).json(notes);

    }catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});


app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});