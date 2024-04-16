<script>
  import axios from 'axios';
  import '/src/lib/sharedStyle.css'

  const API_URL = 'http://localhost:3000/';
  const topic = 'medicine';

  async function handleLoad() {
      console.log('loaded');

  try {
    // get article by topic
    const response1 = await axios.get(API_URL+"api/articles", { params: { topic: topic } });
    let articleId = response1['data'][0]._id;

    // Update article view count!
    const update = await axios.put(API_URL+"api/articles/"+articleId+"?views="+true);
    
    // get article by id
    const response2 = await axios.get(API_URL+"api/articles", { params: { id: articleId } });
    let article = response2['data'][0];

    console.log(response2);
    console.log(response2['data'])
    console.log(article);
    
    if (response2.statusText === "OK") {
              let title = document.createElement('h2');
              let author = document.createElement('h3');
              let viewCount = document.createElement('p');

              title.innerHTML = article.title;
              author.innerHTML = article.author;
              viewCount.innerHTML = 'Number of views: ' + article.views;

              document.getElementById('title').appendChild(title);
              document.getElementById('author').appendChild(author);
              document.getElementById('content').insertAdjacentHTML('beforeend', article.content);
              document.getElementById('views').appendChild(viewCount);
    } else {
      console.error(response2.statusText);
    }
  } catch(error) {
    console.log(error);
  }
  }

</script>

<body class = "body">
<div class="articles" id="article" use:handleLoad>
  <div id="title"></div>
  <div id="author"></div>
  <div id="content"></div>
  <div id="views"></div>
</div>
</body>

<!--  Styling is in sharedStyle.css file in /lib folder-->
<style>

</style>