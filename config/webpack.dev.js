const common_config = require('./webpack.common');
const { merge } = require('webpack-merge');
const cors = require('cors')
const bodyParser = require('body-parser');
const { allFiles }= require('./handlers/allFiles');
const { getFile } = require('./handlers/getFile');
const { editFile } = require("./handlers/editFile");
const { deleteFile } = require('./handlers/deleteFile');
const { createNewFile } = require('./handlers/createNewFile');

module.exports = (env,argv) => {

  const config_dev = {
    devtool: 'source-map',
    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
      setupMiddlewares: (mw, devServer) => {
        devServer.app.use(cors())
        devServer.app.use(bodyParser.json());
        devServer.app.use(bodyParser.urlencoded({extended: true}))
        devServer.app.use((req, res, next) => {
          console.log(`Got request: ${req.method} ${req.url}`);
          next();
        })
        devServer.app.listen(5000);
        devServer.app.get('/allFiles', allFiles)
        devServer.app.get('/getFile/:filename', getFile);
        devServer.app.post('/editFile', editFile);
        devServer.app.post('/deleteFile', deleteFile);
        devServer.app.post('/createNewFile', createNewFile);
        return mw;
      },
    }
  }

  return merge([config_dev, common_config(env,argv)])
}