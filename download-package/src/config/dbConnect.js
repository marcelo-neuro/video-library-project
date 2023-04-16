import mongoose from "mongoose";

function connectToDatabase() {
    mongoose.set("strictQuery", true)

    mongoose.connect(porcess.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const db = mongoose.connection;
    
    db.on("error", (erro) => {
        console.log(erro)
    });
    
    db.once("open", () => {
        console.log("Connected to database.")
    });
}

export default connectToDatabase