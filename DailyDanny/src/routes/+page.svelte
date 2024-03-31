<script>

  import articles from '/src/article_json/articles.json';
  import '/src/lib/sharedStyle.css'

  function handleArticleClick(index) {
    //store the index of the last clicked article in local storage. essentially a global variable.
    localStorage.setItem('lastClickedArticle', index);
  }
</script>


<body class = "body">
<div class="articles">
  {#if articles.length > 0}
    <div class="article-box-main-story article-box-common">
       <a href="/articlePage" class="article-link" on:click={() => handleArticleClick(articles[0].index)}>
      <span class="super-story-label">Highlighted Story</span>
      <span class="subject-label">{articles[0].subject}</span>
      <h2 class="article-title">{articles[0].title}</h2>
      
      {#if articles[0].imageUrl}
        <img src={articles[0].imageUrl} alt={articles[0].title} class="article-image"/>
      {/if}

      <p class="article-summary">{articles[0].summary}</p>
      </a>
    </div>
  {/if}

   <!--Loops through the articles array and displays the articles --->
  {#each articles.slice(1) as article}
    <div class={article.isAd == "True" ? 'ad-box' : (article.imageUrl ? 'article-box article-box-common' : 'half-article-box article-box-common')}>
      <a href="/articlePage" class="article-link" on:click={() => handleArticleClick(article.index)}>
      {#if article.topArticle == "True"}
         <span class="top-story-label">Top Story</span>
      {/if}

      {#if article.subject != "Ad"}
      <span class="subject-label">{article.subject}</span>
      {/if}

      {#if article.isAd == "True"}
        <span class="ad-label">Ad</span>
      {/if}

      {#if article.title}
      <h2 class="article-title">{article.title}</h2>
      {/if}

      {#if article.imageUrl}
        <img src={article.imageUrl} alt={article.title} class="article-image"/>
      {/if}
      <p class="article-summary">{article.summary}</p>
      </a>
    </div>
    
  {/each}
</div>
</body>
<!--  Styling is in sharedStyle.css file in /lib folder-->
<style>

</style>