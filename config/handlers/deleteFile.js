const path = require("path");
const fs = require('fs');

function deleteFile(req, res, next) {
  const filePath = path.resolve(__dirname, '../../text_files', req.body.filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.status(200).send({filename: req.body.filename});
  } else {
    res.status(400);
  }

  next();
}

module.exports = { deleteFile }