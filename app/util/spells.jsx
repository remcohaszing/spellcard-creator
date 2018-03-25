import spellsURL from '../../data/spells.json';


let mappedByClass;


export function noop() {}


export function mapByClass() {
  if (!mappedByClass) {
    mappedByClass = new Promise(async (resolve) => {
      const response = await fetch('../data/spells.json');
      const spells = await response.json();
      const result = {};
      spells.forEach((spell) => {
        Object.entries(spell.levels).forEach(([cls, level]) => {
          const classMap = result[cls] || {};
          result[cls] = classMap;
          const spellList = classMap[level] || [];
          classMap[level] = spellList;
          spellList.push(spell);
        });
      });
      resolve(result);
    });
  }
  return mappedByClass;
}
