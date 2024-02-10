<script>
  import articles from './articles.json';
</script>

<div class="articles">
  {#if articles.length > 0}
    <div class="article-box-main-story">
      <h2 class = "article-title">{articles[0].title}</h2>
      {#if articles[0].imageUrl}
        <img src={articles[0].imageUrl} alt={articles[0].title} class="article-image"/>
      {/if}
      <p class="article-summary">{articles[0].summary}</p>
    </div>
  {/if}

  {#each articles.slice(1) as article}
    <div class="article-box">
      <h2 class = "article-title">{article.title}</h2>
      {#if article.imageUrl}
        <img src={article.imageUrl} alt={article.title} class="article-image"/>
      {/if}
      <p class="article-summary">{article.summary}</p>
    </div>
  {/each}
</div>



<style>
:global(body) {
  background-color: #cbd6e2; 
  font-family: 'Times New Roman', sans-serif;
}

.article-image {
  width: 100%; 
  height: auto;
  border-radius: 8px; 
}

.article-summary{
    font-size: 20px;
}

.article-title{
    font-size: 30px;
    font-weight: bold;
}

.articles {
  margin-top: 250px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.article-box {
  background-color: #70b3d3; /* Fallback color */
  background-image: linear-gradient(to right, hsl(157, 37%, 93%), #d7e5ec, #f0e9ef);
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px; 
  max-height: 600px; 
  overflow: auto; 
}

.article-box-main-story {
  grid-column: span 2; 
  background-color: #70b3d3; /* Fallback color */
  background-image: linear-gradient(to right, hsl(157, 37%, 93%), #d7e5ec, #f0e9ef);
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 8px;
  max-width:675px; 
  max-height: 600px; 
  overflow: auto;
}
  </style>