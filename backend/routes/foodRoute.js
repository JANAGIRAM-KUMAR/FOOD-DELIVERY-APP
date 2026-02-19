import express from "express"
import { addFood, listAllFoods, removeFood } from "../controllers/food-controller.js"
import multer from "multer"

const router = express.Router();

//Image Storage engine
const storage = multer. diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

//Middleware
const upload = multer({storage: storage})

router.post("/add", upload.single("image"), addFood);
router.get("/list", listAllFoods);
router.post("/remove", removeFood);



export default router;