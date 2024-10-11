import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js"

//We'll creaste our server
const app = express()
//Become json response
app.use(express.json())
//Hability the cors
app.use(cors())
//Define a port
const PORT = process.env.port ?? 3000
//Call the routes
app.use(UserRoute)

//Running the serve
app.listen(PORT, ()=>{
    console.log(`Server running at the port ${PORT}`);
})