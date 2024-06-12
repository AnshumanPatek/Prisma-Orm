import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000 ;

// * Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    console.log("Hii this side Anshuman");
    res.send("This side anshuman");
})


// //* Routes file
// import routes from "./routes/userRoutes";
// app.use(routes);

import routes from "./routes/index.js";
app.use(routes);




app.listen (PORT,()=>console.log(`Server is running on ${PORT}`
));

