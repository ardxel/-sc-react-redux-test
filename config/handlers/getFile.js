const path = require("path");
const fs = require("fs");

function getFile(req,res) {
  const { filename } = req.params;

  const _dir = path.resolve(__dirname, '../../text_files');

  const files = fs.readdirSync(_dir);

  if (!files.length) {
    res.status(404);
    return
  }

  const matchedFilename = files.find(file => file === filename)
  console.log(matchedFilename);
  if (!matchedFilename) {
    res.send('this file was not found');
  }
  const stats = fs.statSync(`${_dir}/${filename}`);
  console.log(stats);
  const fileText = fs.readFileSync(`${_dir}/${filename}`, {encoding: 'utf-8'})
  const file = {
    name: filename,
    text: fileText,
    lastModified: [
      stats.mtime.toLocaleDateString(),
      stats.mtime.toLocaleTimeString()
    ],
    created: stats.birthtime.toLocaleDateString()
  }
  res.send(file);
}

module.exports = { getFile }