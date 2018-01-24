#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');

const csvParse = require('csv-parse');
const request = require('request');
const sort = require('sort-stream');
const transform = require('stream-transform');
const stringify = require('streaming-json-stringify');

// http://www.pathfindercommunity.net/home/databases/spells
const spreadsheetId = '1cuwb3QSvWDD7GG5McdvyyRBpqycYuKMRsXgyrvxvLFI';
const url = `https://docs.google.com/spreadsheet/ccc?usp=sharing&output=csv&key=${spreadsheetId}`;


async function main() {
  const sources = new Set();
  request(url)
    // .pipe(fs.createWriteStream('out.csv'))
    .pipe(csvParse({
      auto_parse: true,
      columns: true,
      trim: true,
    }))
    .pipe(transform(data => Object.entries(data)
      .sort()
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: (value === 'NULL' || value === '') ? undefined : value,
      }), {})))
    .pipe(transform((data) => {
      sources.add(data.source);
      return data;
    }))
    .pipe(transform(data => ({
      area: data.area,
      components: data.components,
      description: data.description.split(/\s{2,}/g),
      duration: data.duration,
      effect: data.effect,
      levels: {
        adept: data.adept,
        alchemist: data.alchemist,
        antipaladin: data.antipaladin,
        bard: data.bard,
        bloodrager: data.bloodrager,
        cleric: data.cleric,
        druid: data.druid,
        hunter: data.hunter,
        inquisitor: data.inquisitor,
        magus: data.magus,
        medium: data.medium,
        mesmerist: data.mesmerist,
        occultist: data.occultist,
        oracle: data.oracle,
        paladin: data.paladin,
        psychic: data.psychic,
        ranger: data.ranger,
        shaman: data.shaman,
        skald: data.skald,
        sorcerer: data.sor,
        spiritualist: data.spiritualist,
        summoner: data.summoner,
        witch: data.witch,
        wizard: data.wiz,
      },
      range: data.range,
      resist: data.spell_resistence,
      save: data.saving_throw,
      school: data.school + (data.subschool ? ` (${data.subschool})` : ''),
      source: data.source,
      target: data.targets,
      time: data.casting_time,
      title: data.name,
    })))
    .pipe(sort((a, b) => (a.title > b.title ? 1 : -1)))
    .pipe(stringify({
      seperator: ',\n',
      stringifier(value) {
        return JSON.stringify(value, null, 2).replace(/^/gm, '  ');
      },
    }))
    .pipe(fs.createWriteStream('data/spells.json'))
    .on('finish', () => {
      console.log('done');
    })
    .on('error', (error) => {
      process.exitCode = 1;
      console.error(error);
    });
}


main();
