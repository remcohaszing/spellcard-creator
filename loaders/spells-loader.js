function getString(value) {
  if (!value) {
    return undefined;
  }
  return value;
}


function getNumber(value) {
  const num = Number(value);
  if (Number.isNaN(num)) {
    return undefined;
  }
  return num;
}


function getBoolean(value) {
  if (value === '0') {
    return undefined;
  }
  return true;
}


function getAlignment(col) {
  let alignment = '';
  if (getBoolean(col.chaotic)) {
    alignment += 'C';
  } else if (getBoolean(col.lawful)) {
    alignment += 'L';
  }
  if (getBoolean(col.good)) {
    alignment += 'G';
  } else if (getBoolean(col.evil)) {
    alignment += 'E';
  }
  return alignment || undefined;
}


module.exports = function spellsLoader(value) {
  return value
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .map(col => ({
      alignment: getAlignment(col),
      area: getString(col.area),
      components: getString(col.components),
      description: getString(col.description).split(/\s{2,}/g),
      duration: getString(col.duration),
      effect: getString(col.effect),
      levels: {
        adept: getNumber(col.adept),
        alchemist: getNumber(col.alchemist),
        antipaladin: getNumber(col.antipaladin),
        bard: getNumber(col.bard),
        bloodrager: getNumber(col.bloodrager),
        cleric: getNumber(col.cleric),
        druid: getNumber(col.druid),
        hunter: getNumber(col.hunter),
        inquisitor: getNumber(col.inquisitor),
        investigator: getNumber(col.investigator),
        magus: getNumber(col.magus),
        medium: getNumber(col.medium),
        mesmerist: getNumber(col.mesmerist),
        occultist: getNumber(col.occultist),
        oracle: getNumber(col.oracle),
        paladin: getNumber(col.paladin),
        psychic: getNumber(col.psychic),
        ranger: getNumber(col.ranger),
        shaman: getNumber(col.shaman),
        skald: getNumber(col.skald),
        sorcerer: getNumber(col.sor),
        spiritualist: getNumber(col.spiritualist),
        summoner: getNumber(col.summoner),
        witch: getNumber(col.witch),
        wizard: getNumber(col.wiz),
      },
      range: getString(col.range),
      resist: getString(col.spell_resistence),
      save: getString(col.saving_throw),
      school: getString(col.school),
      source: getString(col.source),
      subschool: getString(col.subschool),
      target: getString(col.targets),
      time: getString(col.casting_time),
      title: getString(col.name),
    }));
};
