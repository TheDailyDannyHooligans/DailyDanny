export async function post(request) {
    try {
      const { title, author, articleText } = JSON.parse(request.body);
  
      // Here you would include code to post the article data to your KV database
      // This could be done using Vercel's KV API or through a custom server route
  
      // For demonstration purposes, let's assume you have a KV namespace named "articles"
      // and you want to store each article with a unique key
      const response = await fetch(`https://api.vercel.com/v1/kv/namespaces/daily-danny-database`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.N9XbBWcJEqVTmcBU8Cfe0ouI}`,
        },
        body: JSON.stringify({
          key: title, // Assuming title is unique
          value: {
            title,
            author,
            articleText,
          },
        }),
      });
  
      if (response.ok) {
        return {
          status: 200,
          body: JSON.stringify({ success: true }),
        };
      } else {
        return {
          status: response.status,
          body: JSON.stringify({ success: false, error: 'Failed to store article in KV database' }),
        };
      }
    } catch (error) {
      return {
        status: 500,
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }
  }
  