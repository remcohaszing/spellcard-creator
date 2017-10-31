const tag = document.createElement('style');
document.head.appendChild(tag);
const styleSheet = [].find.call(document.styleSheets, ({ ownerNode }) => ownerNode === tag);


const loaded = [];


export default async function loadFont(name) {
  if (loaded.includes(name)) {
    return;
  }
  loaded.push(name);
  const request = await fetch(`https://fonts.googleapis.com/css?family=${name.replace(/ /, '+')}`);
  const css = await request.text();
  const regex = /@font-face\s+{([\s\S]*?)}/g;
  let match = regex.exec(css);
  while (match != null) {
    styleSheet.addRule('@font-face', match[1]);
    match = regex.exec(css);
  }
}
