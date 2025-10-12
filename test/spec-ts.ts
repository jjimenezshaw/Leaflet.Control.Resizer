import * as L from 'leaflet';
import 'L.Control.Resizer';

const map = L.map('map').setView([51.505, -0.09], 13);
const e = new L.Control.Resizer({ direction: 'se', pan: true }).addTo(map);

e.disable();
e.enabled();
e.fakeHover(1000);

L.control.resizer({ direction: 'e' });
L.control.resizer({ direction: 's' });
L.control.resizer({ direction: 'se' });
L.control.resizer({ pan: true });
L.control.resizer({ onlyOnHover: true });
L.control.resizer({ updateAlways: true });
