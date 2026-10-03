const data = await (await fetch('sample.json')).json();
const proto = new pmtiles.Protocol(); maplibregl.addProtocol('pmtiles', proto.tile);
const lang = new URLSearchParams(location.search).get('lang') || 'am';
const label = lang === 'am' ? ['coalesce', ['get', 'name:am'], ['get', 'name']] : ['coalesce', ['get', 'name:en'], ['get', 'name']];
const font = ['NotoSansEthiopic'];
const tx = {'text-font': font, 'text-field': label};
const style = {version: 8, glyphs: location.origin + '/fonts/{fontstack}/{range}.pbf',
 sources: {omt: {type: 'vector', url: 'pmtiles://' + location.origin + '/addis.pmtiles', attribution: '© OpenMapTiles © OpenStreetMap contributors'}},
 layers: [
  {id: 'bg', type: 'background', paint: {'background-color': '#f2efe9'}},
  {id: 'park', type: 'fill', source: 'omt', 'source-layer': 'park', paint: {'fill-color': '#cfe5c4'}},
  {id: 'water', type: 'fill', source: 'omt', 'source-layer': 'water', paint: {'fill-color': '#a8cfe6'}},
  {id: 'bldg', type: 'fill', source: 'omt', 'source-layer': 'building', minzoom: 14, paint: {'fill-color': '#ddd7cb'}},
  {id: 'road', type: 'line', source: 'omt', 'source-layer': 'transportation', paint: {'line-color': '#fff', 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.5, 16, 6]}},
  {id: 'roadname', type: 'symbol', source: 'omt', 'source-layer': 'transportation_name', minzoom: 14, layout: {...tx, 'symbol-placement': 'line', 'text-size': 11}, paint: {'text-color': '#444', 'text-halo-color': '#fff', 'text-halo-width': 1.5}},
  {id: 'place', type: 'symbol', source: 'omt', 'source-layer': 'place', layout: {...tx, 'text-size': ['interpolate', ['linear'], ['zoom'], 9, 12, 14, 18]}, paint: {'text-color': '#222', 'text-halo-color': '#fff', 'text-halo-width': 1.5}},
  {id: 'poi', type: 'symbol', source: 'omt', 'source-layer': 'poi', minzoom: 14.5, layout: {...tx, 'text-size': 11, 'text-offset': [0, 0.8], 'text-anchor': 'top'}, paint: {'text-color': '#555', 'text-halo-color': '#fff', 'text-halo-width': 1.2}},
 ]};
const map = new maplibregl.Map({container: 'map', style, center: [38.7612, 9.0107], zoom: Number(new URLSearchParams(location.search).get('z') || 14.6), attributionControl: {compact: true}});
map.on('load', () => {
  map.addSource('sample', {type: 'geojson', data: {type: 'FeatureCollection', features: data.pois.map(p => ({type: 'Feature', geometry: {type: 'Point', coordinates: [p.lon, p.lat]}, properties: {name: p.name}}))}});
  map.addLayer({id: 'sample-pois', type: 'circle', source: 'sample', paint: {'circle-radius': 6, 'circle-color': '#b3261e', 'circle-stroke-color': '#fff', 'circle-stroke-width': 2}});
  window.__ready = true;
});
