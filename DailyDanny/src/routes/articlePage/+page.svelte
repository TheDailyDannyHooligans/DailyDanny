<script>
    import articles from '/src/article_json/articles.json';
    import { onMount } from 'svelte';

    let lastClickedArticleIndex;
    let article;

    function getStoredArticleId() {
        // gets the last clicked article index from local storage
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

<div class="container">
    {#if article}
        <div class="article-frame">
            <h2 class="title">{article.title}</h2>

            {#if article.imageUrl}
                <img src={article.imageUrl} alt={article.title} class="article-image"/>
            {/if}
            
            <p class="article-summary">{article.summary}</p>

            <p class="article-text">{article.articleText}</p>
        </div>
    {:else}
        <p>Article not found or not selected.</p>
    {/if}
</div>

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
