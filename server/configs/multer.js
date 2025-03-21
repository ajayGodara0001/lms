import multer from "multer";

// Use memory storage to avoid local file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
