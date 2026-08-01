import { createServer } from 'node:http';
import { mintInkPremiumLicenseKey } from '../dist/index.js';

const PORT = Number(process.env.PORT || 8787);
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

const licenses = new Map();

const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

const readBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
};

createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/webhooks/stripe') {
    const raw = await readBody(req);
    const event = JSON.parse(raw.toString('utf8'));

    if (!STRIPE_WEBHOOK_SECRET) {
      console.warn('STRIPE_WEBHOOK_SECRET missing — verify signatures in production');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_details?.email || session.customer_email || 'unknown';
      const key = mintInkPremiumLicenseKey();
      licenses.set(email, key);
      console.log(`Ink Premium license for ${email}: ${key}`);
      return json(res, 200, { received: true, email, licenseKey: key });
    }

    return json(res, 200, { received: true });
  }

  if (req.method === 'GET' && req.url?.startsWith('/license?')) {
    const email = new URL(req.url, 'http://localhost').searchParams.get('email') || '';
    const key = licenses.get(email);
    if (!key) return json(res, 404, { error: 'not_found' });
    return json(res, 200, { email, licenseKey: key });
  }

  json(res, 404, { error: 'not_found' });
}).listen(PORT, () => {
  console.log(`Ink Premium Stripe webhook stub on :${PORT}`);
});
