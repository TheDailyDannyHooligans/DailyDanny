import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Parse the request body to get article data
            const { title, author, content } = req.body;

            // Read existing articles from KV store
            let articles = await kv.get('articles') || [];

            // Determine the ID for the new article
            const nextId = articles.length > 0 ? articles[articles.length - 1].id + 1 : 1;

            // Create new article object
            const newArticle = {
                id: nextId,
                title,
                author,
                content
            };

            // Add the new article to the existing articles
            articles.push(newArticle);

            // Store the updated articles back to KV store
            await kv.put('articles', articles);

            // Send response
            res.status(201).json({ success: true });
        } catch (error) {
            console.error('Failed to create article:', error);
            res.status(500).json({ success: false, error: 'Failed to create article.' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}

  