import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";
import { error } from "console";

const app = express();
const port = 3000;





app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

fs.readFile("./apikeys.txt","utf-8", (err, data) => {
    if (err) throw err;
    const API_KEY = data;
    

    app.get("/", (req,res) =>{
        res.render("index.ejs",  { content: "" });
    });
    
    app.post("/submit", async(req,res) =>{2
        const city = req.body.city;
        try{
            const result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`);
            res.render("index.ejs", {content: result.data })
        }catch(error){
            res.render("index.ejs", { error: "City not found"});
            res.status(500);
            
        }
    
    });
    
});;





app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

