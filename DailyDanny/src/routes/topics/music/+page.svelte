<script>
    import articles from '/src/article_json/articles.json';
    import { onMount } from 'svelte';

    function handleArticleClick(articleIndex) {
        localStorage.setItem('lastClickedArticle', articleIndex);
    }

    let lastClickedArticleIndex;
    let article;

    function getStoredArticleId() {
        const storedIndex = localStorage.getItem('lastClickedArticle');
        lastClickedArticleIndex = storedIndex ? parseInt(storedIndex, 10) : null;

        if (lastClickedArticleIndex !== null && lastClickedArticleIndex >= 0 && lastClickedArticleIndex < articles.length) {
            article = articles[lastClickedArticleIndex];
        } else {
            article = null;
        }
    }

    onMount(() => {
        getStoredArticleId();
    });
</script>

<div class="articles">
    {#each articles as article, index}
      {#if article.subject === 'Music'}
        <div class={article.isAd == "True" ? 'ad-box' : (article.imageUrl ? 'article-box article-box-common' : 'half-article-box article-box-common')}>
          <a href="/articlePage" class="article-link" on:click={() => handleArticleClick(index)}>
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
