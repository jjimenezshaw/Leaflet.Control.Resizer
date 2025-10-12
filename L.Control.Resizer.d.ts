import * as L from 'leaflet';

declare module 'leaflet' {
    namespace Control {
        interface ResizerOptions extends L.ControlOptions {
            /**
             * Direction of the resizer handle
             * 'e' - east (right)
             * 's' - south (bottom)
             * 'se' - southeast (bottom right) (default)
             */
            direction?: 'e' | 's' | 'se';

            /**
             * If true, the map is panned when the resizer handle is dragged to the edge of the map container.
             * Default is false.
             */
            pan?: boolean;

            /**
             * If true, the resizer handle is shown only when the mouse is over the map container.
             * Default is false.
             */
            onlyOnHover?: boolean;

            /**
             * If true, the resizer handle is always shown (even when the map container is not hovered),
             * and its position is updated on each map move/zoom.
             * Default is false.
             */
            updateAlways?: boolean;
        }

        class Resizer extends L.Control {
            constructor(options?: ResizerOptions);

            /** Resizer control options */
            options: ResizerOptions;

            /** Disable the resizer control */
            disable(): this;

            /** Returns true if the resizer control is enabled */
            enabled(): boolean;

            /** Simulate a hover event on the map container for the given milliseconds */
            fakeHover(ms: number): void;
        }

    }

    namespace control {
        function resizer(options: Control.ResizerOptions): Control.Resizer;
    }
}
