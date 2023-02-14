const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

/**
 * Helper to extract .wav file from video file and writes it to the targetPath
 * @param {String} originalPath
 * @param {String} targetPath
 * @return Buffer of the converted file
 */
const convertToWav = (originalPath, targetPath) => {
  let outputFile;
  ffmpeg(originalPath)
    .output(targetPath)
    .format('wav')
    .outputOptions('-ab', '192k')
    .on('start', (cline) => {
      // console.log('Command Line ===>', cline);
    })
    .on('error', (err) => {
      console.log('ERROR ==>', err.message);
    })
    .run();

  fs.readFile(targetPath, (err, data) => {
    outputFile = data;
  });

  return outputFile;
};

module.exports = { convertToWav };
