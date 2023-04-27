const path = require("path");
const fs = require('fs');

function createNewFile(req, res, next) {

  const { name } = req.body;

  const _dir = path.resolve(__dirname, '../../text_files/');
  const newFilePath = path.resolve(_dir, name);

  if (fs.existsSync(newFilePath)) {
    res.status(301).send({message: 'this filename is already taken'});
    return;
  }

  fs.writeFileSync(newFilePath, '');

  const stats = fs.statSync(newFilePath);

  const file = {
    name: name,
    text: '',
    lastModified: [
      stats.mtime.toLocaleDateString(),
      stats.mtime.toLocaleTimeString()
    ],
    created: stats.birthtime.toLocaleDateString()
  }
  res.status(200).send(file);

  next();
}

module.exports = { createNewFile };