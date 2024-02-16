<script>
    import articles from '/src/article_json/articles.json';
    import '/src/lib/sharedStyle.css'
</script>

<div class="articles">
    {#each articles.slice(0) as article}
      {#if article.subject === 'Politics'}
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

<!--  Styling is in sharedStyle.css file in /lib folder-->

<style>
  :global(body) {
    background-color: #bacadd;
    font-family: 'Times New Roman', sans-serif;
}
</style>