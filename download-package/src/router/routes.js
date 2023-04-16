import express from "express";

import VideoController from "../controller/videoController.js";
import Validate from "../middlewares/VideoMiddleware.js";

const routes = express.Router();

routes
    .get("/", (req, res) => res.status(200).send("Hello World!"))
    .get("/videos", VideoController.index)
    .get("/videos/query", VideoController.indexByLink)
    .get("/videos/:id", Validate.validateId, VideoController.indexById)
    .post("/videos", VideoController.store)
    .put("/videos/:id", Validate.validateId, VideoController.update)
    .patch("/videos/:id", Validate.validateId, VideoController.updateLiked)
    .delete("/videos/:id", Validate.validateId, VideoController.delete)

export default routes