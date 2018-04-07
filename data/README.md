# Data

This document describes the raw data as it is defined in the CSV files. The CSV files are downloaded from the Google Speadsheets that are specified on http://www.pathfindercommunity.net/home/databases. This is the same data that underlies https://www.d20pfsrd.com.

- Boolean values are specified as either `1` (true) or `0` (false).
- Null values of the string type are empty strings.
- Null values of non-string type are specified as the string `NULL`.


## Spells

> http://www.pathfindercommunity.net/home/databases/spells

| Name                 | Type      | Description
| -------------------- | --------- | -----------
| name                 | `string`  | The name of the spell as it appears in the source book.
| school               | `string`  | The school as a string enum.
| subschool            | `string`  | The subschool as a string enum.
| descriptor           | `string`  |
| spell_level          | `string`  | The spell levels as they appear on https://paizo.com.
| casting_time         | `string`  | The casting time as it appears on https://paizo.com.
| components           | `string`  | The spell components as they appear on https://paizo.com.
| costly_components    | `boolean` |
| range                | `string`  | The spell range as it appears on https://paizo.com.
| area                 | `string`  | The spell area as it appears on https://paizo.com.
| effect               | `string`  |
| targets              | `string`  |
| duration             | `string`  | The spell duration as it appears on https://paizo.com.
| dismissible          | `boolean` |
| shapeable            | `boolean` |
| saving_throw         | `string`  | The saving throw as it appears on https://paizo.com.
| spell_resistence     | `string`  | The spell resistence as it appears on https://paizo.com.
| description          | `string`  | The description as it appears on https://d20pfsrd.com. A line break is represented by 2 spaces.
| description_formated | `string`  | The description as it appears on https://d20pfsrd.com, but formatted as HTML.
| source               | `string`  | The ID of the original source. the is typically a book.
| full_text            | `string`  | Some HTML string
| verbal               | `boolean` | Whether or not the spell contains a verbal component.
| somatic              | `boolean` | Whether or not the spell contains a somatic component.
| material             | `boolean` | Whether or not the spell contains a material component.
| focus                | `boolean` |
| divine_focus         | `boolean` |
| sor                  | `number`  | At which level a sorcerer learns the spell.
| wiz                  | `number`  | At which level a wizard learns the spell.
| cleric               | `number`  | At which level a cleric learns the spell.
| druid                | `number`  | At which level a druid learns the spell.
| ranger               | `number`  | At which level a ranger learns the spell.
| bard                 | `number`  | At which level a bard learns the spell.
| paladin              | `number`  | At which level a paladin learns the spell.
| alchemist            | `number`  | At which level an alchemist learns the spell.
| summoner             | `number`  | At which level a summoner learns the spell.
| witch                | `number`  | At which level a witch learns the spell.
| inquisitor           | `number`  | At which level an inquisitor learns the spell.
| oracle               | `number`  | At which level an oracle learns the spell.
| antipaladin          | `number`  | At which level an antipaladin learns the spell.
| magus                | `number`  | At which level a magus learns the spell.
| adept                | `number`  | At which level an adept learns the spell.
| deity                | `string`  | To which deity the is spell is bound.
| SLA_Level            | `number`  | The caster level when the is used as a spell-like ability.
| domain               | `string`  |
| short_description    | `string`  | A short description of the spell.
| acid                 | `boolean` | Whether or not the spell causes acid damage.
| air                  | `boolean` |
| chaotic              | `boolean` | Whether or not the spell is bound to a chaotic alignment.
| cold                 | `boolean` |
| curse                | `boolean` |
| darkness             | `boolean` |
| death                | `boolean` |
| disease              | `boolean` | Whether or not the spell causes disease.
| earth                | `boolean` |
| electricity          | `boolean` | Whether or not the spell causes electricity damage.
| emotion              | `boolean` |
| evil                 | `boolean` | Whether or not the spell is bound to an evil alignment.
| fear                 | `boolean` | Whether or not the spell causes fear.
| fire                 | `boolean` | Whether or not the spell causes fire damage.
| force                | `boolean` |
| good                 | `boolean` | Whether or not the spell is bound to a good alignment.
| language_dependent   | `boolean` |
| lawful               | `boolean` | Whether or not the spell is bound to a lawful alignment.
| light                | `boolean` |
| mind_affecting       | `boolean` |
| pain                 | `boolean` |
| poison               | `boolean` |
| shadow               | `boolean` |
| sonic                | `boolean` |
| water                | `boolean` |
| linktext             | `string`  | XXX The name, again ?
| id                   | `number`  |
| material_costs       | `number`  | The material cost specified in copper pieces.
| bloodline            | `string`  |
| patron               | `string`  |
| mythic_text          | `string`  |
| augmented            | `string`  |
| mythic               | `boolean` |
| bloodrager           | `number`  | At which level a bloodrager learns the spell.
| shaman               | `number`  | At which level a shaman learns the spell.
| psychic              | `number`  | At which level a psychic learns the spell.
| medium               | `number`  | At which level a medium learns the spell.
| mesmerist            | `number`  | At which level a mesmerist learns the spell.
| occultist            | `number`  | At which level an occultist learns the spell.
| spiritualist         | `number`  | At which level a spiritualist learns the spell.
| skald                | `number`  | At which level a skald learns the spell.
| investigator         | `number`  | At which level an investigator learns the spell.
| hunter               | `number`  | At which level a hunter learns the spell.
| haunt_statistics     | `string`  |
| ruse                 | `boolean` |
| draconic             | `boolean` |
| meditative           | `boolean` |
| summoner_unchained   | `number`  |
