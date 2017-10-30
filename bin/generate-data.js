#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs-extra');
const stringify = require('json-stable-stringify');

const cheerio = require('cheerio');
const rp = require('request-promise');


const request = rp.defaults({
  baseUrl: 'https://paizo.com',
  transform(body) {
    return cheerio.load(body);
  },
});


// eslint-disable-next-line
async function getSpellURLs() {
  const $ = await request('/pathfinderRPG/prd/indices/spelllists.html');
  const urls = $('#spelllist tr>td:nth-child(2) a')
    .toArray()
    .map(el => $(el).attr('href'))
    .map(href => href.split('#')[0]);
  return Array.from(new Set(urls)).sort();
}


function trim(value) {
  return value.replace(/(^[;:\s]*)|([;:\s]*$)/g, '');
}


function extractSpell($elements, $, url) {
  const result = [];
  let baseSpell;
  let currentSpell;
  $elements
    .each((i, element) => {
      const p = $(element);
      if (p.hasClass('stat-block-title')) {
        if (baseSpell == null) {
          baseSpell = {
            title: p.text(),
            url: `${url}#${p.attr('id')}`,
            description: [],
          };
          currentSpell = baseSpell;
        } else {
          currentSpell = Object.assign({}, baseSpell, {
            title: p.text(),
            url: `${url}#${p.attr('id')}`,
            description: [],
          });
        }
        result.push(currentSpell);
        return;
      }
      if (p.hasClass('stat-block-1')) {
        let currentKey;
        let parsingKey = false;
        p.contents()
          .each((index, el) => {
            const $el = $(el);
            if (['b', 'strong'].includes(el.name)) {
              if (!/\w/.test($el.text())) {
                return;
              }
              if (!parsingKey) {
                currentKey = '';
              }
              currentKey += trim($el.text()).toLowerCase().replace(/\W/g, '');
              parsingKey = true;
            } else {
              if (currentKey == null) {
                return;
              }
              if (parsingKey) {
                if (/^\s*$/.test($el.text())) {
                  return;
                }
                currentSpell[currentKey] = '';
              }
              currentSpell[currentKey] += $el.text();
              parsingKey = false;
            }
          });
        return;
      }
      currentSpell.description.push(p.text());
    });
  return result;
}


async function processSpellURL(url) {
  console.log('Processing', url);
  let result = [];
  let race;
  try {
    const $ = await request(url);
    const spellSection = $('h2[id$="spell"], h2[id$="spells"], h3[id$="spells"]');
    let $elements;
    if (spellSection.length === 0) {
      $elements = $('.body>p');
    } else {
      race = $('h1[id]').first().text();
      $elements = spellSection.nextUntil('.stat-block-1').nextUntil('h1, h2, h3', '.body>p');
    }
    result = extractSpell($elements, $, url);
    result = result.map(spell => ({
      ...spell,
      race,
    }));
    let currentTable;
    let tableCounter = 0;
    $('.right>table>tbody>tr')
      .each((i, element) => {
        if (element.children[0].name === 'th') {
          currentTable = [];
          result[tableCounter].table = currentTable;
          tableCounter += 1;
          return;
        }
        const [nameTag, subtypeTag] = element.children;
        const subtypeText = trim($(subtypeTag).text());
        currentTable.push({
          name: trim($(nameTag).text()),
          subtype: subtypeText === '—' ? undefined : subtypeText,
        });
      });
  } catch (e) {
    if (e.statusCode) {
      console.error('Unable to fetch', url, `(${e.statusCode})`);
    } else {
      console.error('Error processing', url, e);
    }
    return [];
  }
  console.log(`Processed ${url}`);
  return result;
}


function normalizeSpell(raw) {
  console.log(`Normalizing ${raw.title}`);
  return Object.assign(...Object.entries(raw)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      switch (key) {
        case 'description':
        case 'url':
        case 'table':
          return { [key]: value };
        case 'area':
        case 'components':
        case 'duration':
        case 'effect':
        case 'race':
        case 'range':
        case 'save':
        case 'school':
        case 'target':
        case 'time':
        case 'title':
          return { [key]: trim(value) };
        case 'spellresistance':
          return { resist: trim(value) };
        case 'areaortarget':
        case 'targetorarea':
          return {
            area: trim(value),
            target: trim(value),
          };
        case 'casting':
        case 'castingtime':
          return { time: trim(value) };
        case 'component':
          return { components: trim(value) };
        case 'saving':
        case 'savingthrow':
        case 'sr':
          return { save: trim(value) };
        case 'targeteffect':
          return {
            effect: trim(value),
            target: trim(value),
          };
        case 'targeteffectarea':
        case 'targeteffectorarea':
          return {
            area: trim(value),
            effect: trim(value),
            target: trim(value),
          };
        case 'targetortargets':
        case 'targets':
          return { target: trim(value) };
        case 'level':
          return {
            levels: value
              .match(/([\w/]+)/g)
              .reduce((r, classes, index, contents) => {
                if (index % 2 === 0) {
                  classes.split('/').forEach((cls) => {
                  // eslint-disable-next-line no-param-reassign
                    r[cls] = parseInt(contents[index + 1], 10);
                  });
                }
                return r;
              }, {}),
          };
        default:
          throw new Error(`Unhandled property ${key} on ${raw.url}`);
      }
    }));
}


async function main() {
  try {
    const urls = await getSpellURLs();
    const spellGroups = await Promise.all(urls.map(processSpellURL));
    const rawSpells = [].concat(...spellGroups).sort((a, b) => a.title.localeCompare(b.title));
    const normalizedSpells = rawSpells.map(normalizeSpell);
    await fs.outputFile('data/spells.json', stringify(normalizedSpells, { space: 2 }));
  } catch (e) {
    process.exitCode = 1;
    console.error(e);
  }
}


main();
