function getURLParam(params, name, fallback, parse) {
  const raw = params.get(name);
  if (raw == null) {
    return fallback;
  }
  return parse ? parse(raw) : raw;
}


export default function getThemeFromURL() {
  const params = new URL(window.location).searchParams;
  return {
    backgroundColor: getURLParam(params, 'backgroundColor', 'rgba(160,173,134,0.7)'),
    backgroundImage: getURLParam(params, 'backgroundImage', null),
    borderColor: getURLParam(params, 'borderColor', 'rgba(230,161,26,0.7)'),
    borderSize: getURLParam(params, 'borderSize', 10, parseFloat),
    contentFont: {
      color: 'rgba(0,0,0,1)',
      family: getURLParam(params, 'contentFont', 'Droid Sans'),
      size: 10,
    },
    headerFont: {
      color: 'rgba(0,0,0,1)',
      family: getURLParam(params, 'headerFont', 'Droid Serif'),
      size: 14,
    },
    height: getURLParam(params, 'height', 3.5, parseFloat),
    levelFont: {
      color: 'rgba(0,0,0,1)',
      family: getURLParam(params, 'levelFont', 'Lobster'),
      size: 18,
    },
    width: getURLParam(params, 'width', 2.5, parseFloat),
  };
}
