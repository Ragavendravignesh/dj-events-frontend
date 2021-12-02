const { events } = require('./data.json');

export default (req, res) => {
    const result = events.filter(ev => ev.slug === req.query.slug);

    if(req.method === 'GET') {
        res.status(200).json(result)
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} is not found`})
    }
}