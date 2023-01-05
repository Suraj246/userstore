import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config.env" });
mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("database is connected"))
    .catch((err) => console.error(err));

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// schema
const userSchema = new mongoose.Schema({
    name: String,
    address: String,
});

const UserStore = new mongoose.model("UserStore", userSchema);

// store users in the database
app.post("/users", async (req, res) => {
    const { name, address } = req.body;
    console.log(req.body);
    try {
        const user = new UserStore({ name, address });
        const newUser = await user.save();
        if (newUser) {
            return res.status(201).json({ success: "user successfully created" });
        }
    } catch (err) {
        return res.status(422).json({ message: "error" });
    }
});

app.listen(PORT, () => {
    console.log("listening on", PORT);
});
