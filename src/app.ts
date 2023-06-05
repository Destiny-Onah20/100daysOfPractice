import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import userRoute from "./routers/users.route";
import productRoute from "./routers/product.route";
dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("./upload"))

app.use("/uploaded-image", express.static("./upload"))
app.use(fileUpload({
  useTempFiles: true
}))

app.use("/api/v1", userRoute)
app.use("/api/v1", productRoute)


export default app;