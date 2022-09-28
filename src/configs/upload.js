const crypto = require("crypto");
const path = require("path");
const multer = require("multer");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const hashFile = crypto.randomBytes(10).toString("hex"),
      fileName = `${hashFile} + ${file.originalname}`

      return callback(null, fileName)
    }
})
}

module.exports= {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
}