export default async function handler(req, res) {
  const { action } = req.query;
  const url = `https://script.google.com/macros/s/AKfycbz6EH7QGJ0HlHhEf2CoUvAqE-gnIi2sb7ajQPzjuHK8TlUyOEOTAO01OSqlmpVwCXJX/exec?action=${action}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
