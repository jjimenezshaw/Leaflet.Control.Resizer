# Leaflet.Control.Resizer
[![NPM version](https://img.shields.io/npm/v/leaflet.control.resizer.svg)](https://www.npmjs.com/package/leaflet.control.resizer)
[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg?style=flat)](LICENSE)
[![Leaflet 1.x compatible!](https://img.shields.io/badge/Leaflet%201.x-%E2%9C%93-1EB300.svg?style=flat)](http://leafletjs.com/reference.html)

Control to resize a Leaflet map

[Simple example in action](https://jjimenezshaw.github.io/Leaflet.Control.Resizer/examples/basic.html)

## Description
This plugin creates a control to resize your map on the right or bottom side. See that top and left are not a 'resize' but a 'move' inside your DOM... that is another story.

## Installation
Using npm for browserify `npm install leaflet.control.resizer` (and `require('leaflet.control.resizer')`), or just download `L.Control.Resizer.js` and `L.Control.Resizer.css` and add a script and link tag for it in your html.

## Compatibility
Tested with Leaflet 1.0.3 and 1.3.1. It does not work with 0.7 due to deprecated functionalities. However it is easy to change the code to make it compatible (come on, it is time to update to Leaflet 1.x)

## Usage
Just add a control as usual.
```javascript
  var osm = L.tileLayer(
      '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {attribution: '© OpenStreetMap contributors'}
  );
  var map = L.map('map', {
      layers: [osm],
      center: [40, 0],
      zoom: 3
  });


  L.control.resizer({ direction: 'e' }).addTo(map);
```

## API
### `L.Control.Resizer`
The main (and only) 'class' involved in this plugin. It exteds `L.Control`, so most of its methods are available. 
#### `L.control.resizer(options)`
Creates the control. The arguments are:
* `options`: `<Object>` specific options for this control.

##### constructor options
* `direction`: `<String>` Direction of the resizer. Valid values are 'e', 's', 'se'. Default 'e'.
* `onlyOnHover`: `<Boolean>` Shows the control only when the mouse is over. Default 'false'.
* `updateAlways`: `<Boolean>` Determines if `invalidateSize` is called on every mouse movement. Default 'true'.
* `pan`: `<Boolean>` Specifies if the fixed point during the resize is the center. If not, it is the top left corner (that means that the map doesn't move. Default 'false'.

If you don't like the style of the handles, overwrite the css styles ;)

#### `enable()`
Enables the control. Run by default on construction. Returns `this`.

#### `disable()`
Disables the control. Returns `this`.

#### `fakeHover(ms)`
Fakes the hover effect during `ms` milliseconds, that is, when the mouse passes over the control. Useful when `onlyOnHover` is true, and you want to show where is the control.

### Events
This class fires the same events as `L.Draggable`. You can get them as usual. For example:
```javascript
var southResizer = L.control.resizer({ direction: 's' }).addTo(map);
L.DomEvent.on(southResizer, 'dragstart', function(e){ console.log(e.type, e) });
```
The events are:
* `down`: When the mouse is clicked over the control.
* `dragstart`: When the drag starts.
* `predrag`: On every movement, just before the map resize.
* `drag`: On every movement, just after the map resize.
* `dragend`: At the end of the resize.
