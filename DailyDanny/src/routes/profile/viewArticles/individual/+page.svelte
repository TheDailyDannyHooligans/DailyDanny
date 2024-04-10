<script>
    import axios from 'axios';
    import { currentArticle } from '/src/routes/account.js';
    import '/src/lib/sharedStyle.css'

    const API_URL = 'http://localhost:3000/';
    const topic = 'medicine';
    let articleId;

    currentArticle.subscribe((id) => {
        articleId = id;
    });

    async function handleLoad() {
      console.log('loaded');

      try {
        const update = await axios.put(API_URL+"api/articles/"+articleId+"?views="+true);
        const response = await axios.get(API_URL+"api/articles", { params: { id: articleId } });
        let article = response['data'][0];

        console.log(article);
        
        if (response.statusText === "OK") {
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
          console.error(response.statusText);
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