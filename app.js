import express from "express";
import mongoose from "mongoose";
import todoModel from "./models/todoSchema.js";
import cors from "cors";




const URI = "mongodb+srv://uzairatif911:uzairatif911@cluster0.map97.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(URI)
.then(() => console.log("mongodb connected"))
.catch((error) => console.log("mongodb failed to connect", error.message))


const app = express()
const PORT = 5000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/createTodo", async (req, res) => {
    try {
        const response = await todoModel.create(req.body)
        console.log(response);

        res.json({
            message: "todo created",
            data : response
        })
    } catch (error) {
        console.log(error.message);

    }
})

app.get("/getTodos", async (req, res) => {
    try {
        const todoResponse = await todoModel.find()
        console.log(todoResponse);

        res.json({
            message: "fetch all todos",
            data: todoResponse
        })

    } catch (error) {
        res.json({
            message: error.message || "failed to get"
        })

    }
})


app.put("/updateTodo/:id", async (req, res) => {
    try {
        const updateData = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Updated successfully", updateData });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
});




app.delete("/deleteTodo/:id", async (req, res) => {
    try {
        const id = req.params.id

        const deleteResponse = await todoModel.findByIdAndDelete(id)

        res.json({
            message: "todo deleted sucsessfully"
        })
    } catch (error) {
        res.json({
            message: "failed to delete" || error.message
        })
    }
})






app.listen(PORT, () => {
    console.log("server running on http://localhost:5000");
})