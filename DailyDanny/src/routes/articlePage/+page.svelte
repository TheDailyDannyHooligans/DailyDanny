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

    .article-frame {
        width: 95vw;
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border: 2px solid #000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: auto;
        background-color: #70b3d3;
        background-image: linear-gradient(to right, hsl(157, 37%, 93%), #d7e5ec, #f0e9ef);
        border-radius: 8px;
        padding: 20px;
        padding-top: 40px;
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
