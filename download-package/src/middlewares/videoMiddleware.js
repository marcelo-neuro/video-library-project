import {validate as isUuid} from "uuid";
import Video from "../models/Video.js";

class Validate {
    static async validateId(req, res, next) {
        const { id } = req.params;

        if(!isUuid(id)){
            return res.status(400).json({ message: "Ivalid ID"});
        }

        try{
            const video = await Video.findById(id);
            res.video = video;

            if(!video) {
                return res.status(404).json({ message: "Video not found."})
            }
        } catch(error) {
            return res.status(500).json({ error: error.message});
        }

        next();
    } 
}

export default Validate;