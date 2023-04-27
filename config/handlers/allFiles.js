const path = require('path');
const fs = require('fs');

function allFiles(req, res) {
  const _dir = path.resolve(__dirname, '../../text_files');

  const files = fs.readdirSync(_dir);

  if (!files.length) {
    res.send('no files');
    return
  }

  const result = files.map(file => {
    const absolutePath = `${_dir}/${file}`;

    const stats = fs.statSync(absolutePath);
    const text = fs.readFileSync(absolutePath, {encoding: 'utf-8'}) || 'Is Empty';

    return {
      name: file,
      text: text,
      lastModified: [
        stats.mtime.toLocaleDateString(),
        stats.mtime.toLocaleTimeString()
      ],
      created: stats.birthtime.toLocaleDateString()
    }
  })

  res.send(result);
}

module.exports = { allFiles }