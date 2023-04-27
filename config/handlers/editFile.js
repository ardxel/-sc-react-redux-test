const path = require("path");
const fs = require('fs');

function editFile(req, res, next) {

  const { name, text } = req.body;

  const _dir = path.resolve(__dirname, '../../text_files');

  fs.writeFileSync(`${_dir}/${name}`, text)

  const matchedName = fs.readdirSync(_dir).find(filename => filename === name);

  if (matchedName) {
    res.status(200).send({});
  } else {
    res.status(400).send("Server Error");
  }
  next();
}

module.exports = { editFile };