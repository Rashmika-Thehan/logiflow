// node scripts/tracking-demo.mjs drive <driverToken> <startLat> <startLng> <destLat> <destLng>
// node scripts/tracking-demo.mjs live  <dispatcherToken>
// node scripts/tracking-demo.mjs track <trackingCode>
import { io } from 'socket.io-client';

const [mode, ...args] = process.argv.slice(2);
const base = 'http://localhost:3005';

if (mode === 'drive') {
    const [token, sLat, sLng, dLat, dLng] = args.map((a, i) => (i === 0 ? a : Number(a)));
    const socket = io(`${base}/ingest`, { auth: { token }, transports: ['websocket'] });
    let step = 0;
    socket.on('connect_error', (e) => console.error('connect_error:', e.message));
    socket.on('auth_expired', () => { console.log('token expired, reconnect with a fresh one'); process.exit(0); });
    socket.on('connect', () => {
        console.log('driving...');
        setInterval(() => {
            const t = Math.min(step++ / 120, 1);
            const ping = { lat: sLat + (dLat - sLat) * t, lng: sLng + (dLng - sLng) * t, ts: Date.now(), speedKmh: 28, heading: 90 };
            socket.emit('ping', { pings: [ping] }, (ack) => console.log(step, ack));
        }, 1000);
    });
} else {
    const socket = io(`${base}/${mode}`, mode === 'live' ? { auth: { token: args[0] }, transports: ['websocket'] } : { transports: ['websocket'] });
    socket.on('connect_error', (e) => console.error('connect_error:', e.message));
    socket.on('position', (p) => console.log(mode, 'position', JSON.stringify(p)));
    socket.on('ended', (e) => console.log('ended', e));
    if (mode === 'track') {
        socket.on('connect', () => socket.emit('subscribe', { trackingCode: args[0] }, (r) => console.log('subscribe ->', r)));
    }
}
