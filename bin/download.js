#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Download the Google docs speadsheet as a CSV document.
 */
const https = require('https');
const fs = require('fs');


async function download(url, filename) {
  console.log('Starting download', url, '→', filename);
  await new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`${response.statusCode} ${response.statusMessage}`));
        return;
      }
      const file = fs.createWriteStream(filename);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (error) => {
      fs.unlink(filename);
      reject(error);
    });
  });
  console.log('Finished download', url, '→', filename);
}


download('https://docs.google.com/spreadsheets/d/1cuwb3QSvWDD7GG5McdvyyRBpqycYuKMRsXgyrvxvLFI/export?format=csv&amp;usp=sharing', 'data/spells.csv');
