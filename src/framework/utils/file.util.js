const fs = require('fs');
const { removeSync } = require('fs-extra');
const Logger = require('./logger.util');

module.exports = class FileUtil{

  static createFolder(pathToFolder){
    fs.access(pathToFolder, fs.constants.F_OK, (err) => {
      if(err) {
        Logger.logInfo(`Create folder "${pathToFolder}"`);
        return fs.mkdirSync(pathToFolder);
      }
    });
  }

  static reCreateFolder(pathToFolder){
    Logger.logInfo(`Recreate folder "${pathToFolder}"`);
    fs.access(pathToFolder, fs.constants.F_OK, (err) => {
      if(!err) {
        removeSync(pathToFolder);
      }
      return fs.mkdirSync(pathToFolder);
    });
  }

  static deleteFile(pathToFile){
    Logger.logInfo(`Delete file "${pathToFile}"`);
    fs.access(pathToFile, fs.constants.F_OK, (err) => {
      if(!err) {
        return fs.unlinkSync(pathToFile);
      }
    });
  }

  static writeToFile(pathToFile, content){
    Logger.logInfo(`Write to "${pathToFile}"`);
    return fs.writeFileSync(pathToFile, content);
  }

}