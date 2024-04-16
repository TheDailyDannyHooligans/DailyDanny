<script>
    import axios from 'axios';
    import '/src/lib/sharedStyle.css'
    import { onMount } from 'svelte';

    const API_URL = 'http://localhost:3000/';
    const topic = 'medicine';

    async function handleLoad() {
        console.log('loaded');

    let lastClickedArticleID;
    let article;

    // gets the last clicked article id from local storage
    lastClickedArticleID = localStorage.getItem('lastClickedArticle');
    console.log(lastClickedArticleID);

    try {
    // Find article with stored id
    // { params: { id: lastClickedArticleID } }
      const response = await axios.get(API_URL+"api/articles", { params: { id: lastClickedArticleID } });
      article = response.data[0];
      console.log(response);
      console.log(article);

    // Create object for article if found
      if (response.statusText === "OK") {
                let title = document.createElement('h2');                
                title.className = 'title';
                title.innerHTML = article.title;

                let author = document.createElement('h3');
                author.className = 'author';
                author.innerHTML = article.author;

                let viewCount = document.createElement('p');
                viewCount.className = 'views';
                viewCount.innerHTML = 'Number of views: ' + article.views;

                document.getElementById('title').appendChild(title);
                document.getElementById('author').appendChild(author);
                document.getElementById('content').insertAdjacentHTML('beforeend', article.content);
                document.getElementById('views').appendChild(viewCount);
      }
    } catch(error) {
        console.log(error);
    }};
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