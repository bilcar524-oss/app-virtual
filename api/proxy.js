export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action } = req.query;
  const base = 'https://script.google.com/macros/s/AKfycbx-Nb9t-exmiro8WDEgBQ8l9mbGiBcM91RmdTR2yVViws11TPERAlBzrwH7_61x3gsj/exec';
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
