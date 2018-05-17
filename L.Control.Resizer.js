'use strict';

(function(L) {
    if (typeof L === 'undefined') {
        throw new Error('Leaflet must be included first');
    }

    L.Control.Resizer = L.Control.extend({
        options: {
            direction: 'e',  // valid values e, s, se
            onlyOnHover: false,
            updateAlways: true,
            callbackStart: null,
            callbackMove: null,
            callbackEnd: null,
        },

        initialize: function(options) {
            L.Util.setOptions(this, options);
            this._initialOffsetX = 0;
            this._initialOffsetY = 0;
            this.options.position = 'leaflet-control-resizer-corner-' + this.options.direction;
        },

        onAdd: function (map) {
            this._prepareLocation(map);

            var className = 'leaflet-control-resizer';
            var classNameTransp = className + (this.options.onlyOnHover ? '-transparent' : '-opaque');
            var classNameLoc = className + '-' + this.options.direction;
            this._container = L.DomUtil.create('div',
                                               className + ' ' + classNameTransp + ' ' + classNameLoc,
                                               map.getContainer());
            var container = this._container;

            L.DomEvent.on(container, 'mousedown mouseup click touchstart drag', L.DomEvent.stopPropagation);

            /* IE11 seems to process events in the wrong order, so the only way to prevent map movement while dragging the
             * slider is to disable map dragging when the cursor enters the slider (by the time the mousedown event fires
             * it's too late becuase the event seems to go to the map first, which results in any subsequent motion
             * resulting in map movement even after map.dragging.disable() is called.
             */
            L.DomEvent.on(container, 'mouseenter', function (e) { map.dragging.disable(); });
            L.DomEvent.on(container, 'mouseleave', function (e) { map.dragging.enable(); });

            L.DomEvent.on(container, 'mousedown touchstart', this._initResize, this);

            return this._container;
        },

        onRemove: function(map) {
            L.DomEvent.off(this._container, 'mousedown touchstart', this._initResize, this);
        },

        fakeHover: function(ms) {
            var className = 'leaflet-control-resizer-transparent-fakedhover';
            var cont = this._container;
            L.DomUtil.addClass(cont, className);
            setTimeout(function() { L.DomUtil.removeClass(cont, className); }, ms | 1000);
        },

        _prepareLocation: function(map) {
            var corners = map._controlCorners;
            var l = 'leaflet-control-resizer-corner-' + this.options.direction;
            var container = map._controlContainer;

            corners[l] = L.DomUtil.create('div', l, container);
        },

        _initResize: function (e) {
            var mapCont = this._map.getContainer();
            var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e)

            L.DomUtil.disableImageDrag();
            L.DomUtil.disableTextSelection();

            this._initialOffsetX = mapCont.offsetWidth + mapCont.offsetLeft - first.clientX;
            this._initialOffsetY = mapCont.offsetHeight + mapCont.offsetTop - first.clientY;

            L.DomEvent.on(window, 'mouseup touchend', this._stopResizing, this);
            L.DomEvent.on(this._container, 'mouseup touchend', this._stopResizing, this);

            L.DomEvent.on(window, 'mousemove touchmove', this._duringResizing, this);

            if (this.options.callbackStart) {
                this.options.callbackStart(e);
            }

        },

        _duringResizing: function (e) {
            var mapCont = this._map.getContainer();
            var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e)

            if (this.options.direction.indexOf('e') >=0) {
                mapCont.style.width = (first.clientX - mapCont.offsetLeft + this._initialOffsetX) + 'px';
            }
            if (this.options.direction.indexOf('s') >=0) {
                mapCont.style.height = (first.clientY - mapCont.offsetTop + this._initialOffsetY) + 'px';
            }

            if (this.options.updateAlways) {
                this._map.invalidateSize({ pan: false });
            }
            if (this.options.callbackMove) {
                this.options.callbackMove(e);
            }

        },

        _stopResizing: function(e) {
            L.DomEvent.off(window, 'mousemove touchmove', this._duringResizing, this);

            L.DomEvent.off(window, 'mouseup touchend', this._stopResizing, this);
            L.DomEvent.off(this._container, 'mouseup touchend', this._stopResizing, this);

            this._map.invalidateSize({ pan: false });
            if (this.options.callbackEnd) {
                this.options.callbackEnd(e);
            }

            L.DomUtil.enableImageDrag();
            L.DomUtil.enableTextSelection();
        }

    });

    L.Control.Resizer.include(L.Evented.prototype);

    L.control.resizer = function (options) {
        return new L.Control.Resizer(options);
    };
})(L);
