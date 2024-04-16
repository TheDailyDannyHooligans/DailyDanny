<script>
  import axios from 'axios';
  import '/src/lib/sharedStyle.css'

  const API_URL = 'http://localhost:3000/';

  let articles;
  let category = 'sports'
  

  async function handleLoad() {
      console.log('loaded');

  try {
          const response = await axios.get(API_URL + "api/articles", { params: { topic : 'music' , status : 'Approved'} });
          articles =response.data;

          console.log(articles);

          if (response.statusText === "OK") {
              const frame = document.querySelector('.article-frame');
              frame.innerHTML = '';  // Clear existing content

              // Loop through all approved articles, saving the id as you go with i
              articles.forEach(article => {
                if (article.topic == category)
                {
                  let articleBox = document.createElement('div');
                  articleBox.className = 'article-box';
                  articleBox.onclick = () => handleArticleClick(article._id);

                  let title = document.createElement('h2');
                  title.className = 'title';
                  title.innerHTML = article.title;

                  let author = document.createElement('h3');
                  author.className = 'author';
                  author.innerHTML = article.author;

                  let content = document.createElement('div');
                  content.className = 'content';
                  content.innerHTML = truncateText(article.content);

                  let viewCount = document.createElement('p');
                  viewCount.className = 'views';
                  viewCount.innerHTML = 'Number of views: ' + article.views;

                  articleBox.appendChild(title);
                  articleBox.appendChild(author);
                  articleBox.appendChild(content);
                  articleBox.appendChild(viewCount);

                  frame.appendChild(articleBox);
                }
              });
          } else {
              console.error(response.statusText);
          }
      } catch(error) {
          console.log(error);
      }
    
      //truncates the content of the article
    function truncateText(content) {
      const wordLimit = 8;
      const words = content.split(' ', wordLimit);
      if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(' ') + '...';
      }
      return words.join(' '); // Join the words back if less than or equal to limit
    }
  }

function handleArticleClick(articleID) {
  // store article id as a global variable
  console.log("Article clicked", articleID);
  localStorage.setItem('lastClickedArticle', articleID);
  window.location.href = '/articlePage';
}

</script>

<!-- On click, go to handleArticleCLick function -->
<div class = "article-frame">
<!-- {#each articles as article} -->
<div class="article-box" id="article" use:handleLoad>
  <a href="/profile/testArticle/all/articlePage" class="article-link" on:click={() => handleArticleClick(article.articleID)}> 
  <div id="title"></div>
  <div id="author"></div>
  <div id="content"></div>
  <div id="views"></div>
</div>
<!-- {/each} -->
</div>

<!--  Styling is in sharedStyle.css file in /lib folder-->
<style>
  :global(body) {
      background-color: #bacadd; 
      font-family: 'Times New Roman', sans-serif;
  }

.article-frame {
    width: 95vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    grid-gap: 10px;
    justify-content: center;
    align-items: start;
    margin: 10px;
    margin-top: 15%;
    padding: 20px;
    overflow: auto;
    border: 2px solid #000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #70b3d3;
    background-image: linear-gradient(to right, hsl(157, 37%, 93%), #d7e5ec, #f0e9ef);
}

  .title {
      font-size: 30px;
      font-weight: bold;
      background-color: rgba(114, 163, 191, 0.5);
      padding: 10px;
      border-radius: 10px;
  }

  .article-image {
      width: 80%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 20px;
  }

  .article-summary {
      font-size: 21px;
      text-align: center;
      background-color: #c2e0ee;
      border-radius: 10px;
  }

  .article-text {
      font-size: 28px;
      text-align: left;
      padding: 20px;
      width: 95%;
  }

@media screen and (max-width: 768px){
  .container {
      width: 97vw
  }

  .article-box {
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