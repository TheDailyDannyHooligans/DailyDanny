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

                let topic = document.createElement('span');
                topic.className = 'topic';
                topic.innerHTML = article.topic;

                let author = document.createElement('h3');
                author.className = 'author';
                author.innerHTML = article.author;

                let viewCount = document.createElement('p');
                viewCount.className = 'views';
                viewCount.innerHTML = 'Number of views: ' + article.views;


                document.getElementById('title').appendChild(title);
                document.getElementById('topic').appendChild = article.topic;
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
    <span class="subject-label" id = "topic"></span>
    <div id="title"></div>
    <div id="author"></div>
    <div id="content"></div>
    <div id="views"></div>
  </div>
</body>

<!--  Styling is in sharedStyle.css file in /lib folder-->
<style>
    :global(body) {
        background-color: #bacadd; 
        font-family: 'Times New Roman', sans-serif;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        margin-top: 175px;
        padding: 0;              
    }

    
@media screen and (max-width: 768px){
    .container {
        width: 97vw
    }

    .title {
        font-size: 20px;
    }

    .article-summary {
        font-size: 16px;
    }

    .article-text {
        font-size: 16px;
    }
}
</style>