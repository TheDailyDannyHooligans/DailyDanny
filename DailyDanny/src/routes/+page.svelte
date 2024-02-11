<script>
  import articles from './articles.json';
</script>

<div class="articles">
  {#if articles.length > 0}
    <div class="article-box-main-story article-box-common">
      <span class="super-story-label">Highlighted Story</span>
      <h2 class="article-title">{articles[0].title}</h2>
      {#if articles[0].imageUrl}
        <img src={articles[0].imageUrl} alt={articles[0].title} class="article-image"/>
      {/if}
      <p class="article-summary">{articles[0].summary}</p>
    </div>
  {/if}

  {#each articles.slice(1) as article}
    <div class={article.imageUrl ? 'article-box article-box-common' : 'half-article-box article-box-common'}>
      {#if article.topArticle == "True"}
        <span class="top-story-label">Top Story</span>
      {/if}
      <h2 class="article-title">{article.title}</h2>
      {#if article.imageUrl}
        <img src={article.imageUrl} alt={article.title} class="article-image"/>
      {/if}
      <p class="article-summary">{article.summary}</p>
    </div>
  {/each}
</div>

<style>
:global(body) {
  background-color: #bacadd; 
  font-family: 'Times New Roman', sans-serif;
}

.article-image {
  width: 100%; 
  height: auto;
  border-radius: 8px; 
}

.article-summary{
    font-size: 21px;
}

.article-title{
    font-size: 30px;
    font-weight: bold;
    background-color: rgba(170, 201, 219, 0.5);
    padding: 10px;
    border-radius: 10px;
}

.articles {
  margin-top: 250px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.article-box {
  grid-column: span 1; /* Spans 1 column */
  grid-row: span 2; /* Spans 2 rows*/
  background-color: #70b3d3; /* Fallback color */
  background-image: linear-gradient(to right, hsl(157, 37%, 93%), #d7e5ec, #f0e9ef);
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 8px;
  margin-top: 0px;
  overflow: auto; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-box-main-story {
  grid-column: span 2; /* Spans 2 column */
  grid-row: span 2; /* Spans 2 rows */
  background-color: #70b3d3; /* Fallback color */
  background-image: linear-gradient(to right, hsl(157, 37%, 93%), #d7e5ec, #f0e9ef);
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 8px;
  overflow: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.half-article-box {
  grid-column: span 1; /* Spans 1 column */
  grid-row: span 1; /* Spans 1 row */
  background-color: #70b3d3; /* Fallback color */
  background-image: linear-gradient(to right, hsl(157, 37%, 93%), #d7e5ec, #f0e9ef);
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 8px;
  overflow: auto; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.top-story-label {
background-color: rgb(248, 191, 191);
color: rgb(180, 0, 0);
padding: 5px;
border-radius: 8px;
font-weight: bold;
font: "Courier New", Courier, monospace;
}

.super-story-label {
background-color: rgb(139, 143, 200);
color: rgb(255, 255, 255);
padding: 5px;
border-radius: 8px;
font-weight: bold;
font: "Courier New", Courier, monospace;
}
.article-box-common {
transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-box-common:hover {
transform: scale(1.05);
box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

  </style>