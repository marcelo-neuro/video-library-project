import {v4 as uuid} from "uuid"

import Video from "../models/Video.js";

class VideoController {

    static async index(req, res) {
        try{
            const video = await Video.find();
            return res.status(200).json(video)
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }

    static indexById(req, res) {
        const video = res.video;

        try{
            return res.status(200).json(video)
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }

    static async indexByLink(req, res) {
        const link = req.query.link;

        if(!link) {
            return res.status(400).json({ message: "Missing link."})
        }
            
        try {
            const video = await Video.find({"link": link}, {});
            return res.status(200).json(video);
        } catch(error) {
            return res.status(500).json({ error: error.message});
        }
    }

    static async store(req, res) {
        const { title , link } = req.body;

        if(!title || !link) {
            return res.status(400).json({ message: 'missing title or link.' });
        }

        const video = new Video(
            {
                _id: uuid(),
                title,
                link,
                liked: false
            }
        );
        
        try{
            await video.save();
            return res.status(201).json({ message: "Video was added successfully." })
        } catch(error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        const { title, link } = req.body;

        if(!title && !link) {
            return res.status(400).json({ message: "You must inform a new title or new link." })
        }

        if(title) {
            res.video.title = title;
        }
        if(link) {
            res.video.link = link;
        }

        try {
            await res.video.save();
            return res.status(200).json({ message: "Video updated successfully." })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    static async updateLiked(req, res) {
        res.video.liked = !res.video.liked;

        try{
            await res.video.save();
            return res.status(200).json({ message: `Video ${res.video.liked ? "liked" : "unliked"} successfully.` });
        } catch(error) {
            return res.status(500).json({ error: error.message});
        }
    }

    static async delete(req, res) {
        try {
            await res.video.remove();
            return res.status(200).json({ message: "Video deleted successfully." })
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

export default VideoController