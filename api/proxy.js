export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action } = req.query;
  const base = 'https://script.google.com/macros/s/AKfycbz6EH7QGJ0HlHhEf2CoUvAqE-gnIi2sb7ajQPzjuHK8TlUyOEOTAO01OSqlmpVwCXJX/exec';

  try {
    const response = await fetch(action ? `${base}?action=${action}` : base, {
      redirect: 'follow'
    });
    const text = await response.text();
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message, detail: err.toString() });
  }
}
