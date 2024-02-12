<script>
    import articles from '/static/article_json/articles.json';
</script>

<div class="articles">
    {#each articles.slice(0) as article}
      {#if article.subject === 'Nature'}
        <div class={article.isAd == "True" ? 'ad-box' : (article.imageUrl ? 'article-box article-box-common' : 'half-article-box article-box-common')}>
          <a href="/articlePage" class="article-link">
            {#if article.topArticle == "True"}
              <span class="top-story-label">Top Story</span>
            {/if}

            <span class="subject-label">{article.subject}</span>

            {#if article.title}
              <h2 class="article-title">{article.title}</h2>
            {/if}

            {#if article.imageUrl}
              <img src={article.imageUrl} alt={article.title} class="article-image"/>
            {/if}
            <p class="article-summary">{article.summary}</p>
          </a>
        </div>
      {/if}
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
  border-radius: 8px; margin-top: 20px;
}

.article-text-preview{
    font-size: 16px;
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
  grid-template-rows: repeat(auto-fill, minmax(min-content, 100));
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

.ad-box {
  grid-column: span 1; /* Spans 2 column */
  grid-row: span 1; /* Spans 1 row */
  background-color: #e4e3ca; /* Fallback color */
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 8px;
  overflow: auto; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.top-story-label {
background-color: rgb(219, 119, 119);
color: rgb(255, 255, 255);
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

.subject-label {
background-color: rgb(131, 183, 192);
color: rgb(255, 255, 255);
padding: 5px;
border-radius: 8px;
font-weight: bold;
font: "Courier New", Courier, monospace;
}

.ad-label{
background-color: rgb(228, 219, 111);
color: rgb(255, 255, 255);
padding: 5px;
border-radius: 8px;
font-weight: bold;
font: "Courier New", Courier, monospace;
}

.article-box-common:hover {
transform: scale(1.05);
box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

.article-box-main-story:hover {
transform: scale(1.025);
box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

.article-link {
  text-decoration: none; /* Removes the underline from links */
  color: inherit; /* Keeps the text color consistent with the rest of the article box */
}

  </style>