<script>
      import articles from '/static/article_json/articles.json';
</script>

<div class="container">
    <div class="article-box">
        <h2 class="title">{articles[0].title}</h2>

        {#if articles[0].imageUrl}
            <img src={articles[0].imageUrl} alt={articles[0].title} class="article-image"/>
        {/if}
        
        <p class="article-summary">{articles[0].summary}</p>

        <p class="article-text">{articles[0].articleText}</p>
    </div>
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
        height: 100vh;
        width: 100vw;
        margin: 0;
        margin-top: 175px;
        padding: 0;              
    }

    .article-box {
        width: 90vw;
        height: 90vh;
        margin: auto;
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
    }

    .article-text {
        font-size: 28px;
        text-align: left;
        background-color: #c2e0ee;
        border-radius: 10px;
    }
</style>
