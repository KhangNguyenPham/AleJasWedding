export default async function handler(req, res) {
    const GAS_URL = process.env.GAS_URL;
  
    if (req.method === "GET") {
      try {
        const response = await fetch(GAS_URL);
        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(200).json(data);
      } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
      }
    }
  
    if (req.method === "POST") {
      try {
        const response = await fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(200).json(data);
      } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
      }
    }
  
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      return res.status(200).end();
    }
  
    res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  