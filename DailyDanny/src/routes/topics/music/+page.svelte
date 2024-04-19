<script>
    import axios from 'axios';
    import '/src/lib/sharedStyle.css'
  
    const API_URL = 'http://localhost:3000/';
  
    let articles;
    let category = 'music'
    
  
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
                  if(article.topic == category){
                    if(article.super){
                        let mainStoryBox = document.createElement('div');
                        mainStoryBox.className = 'main-story-box';
                        mainStoryBox.onclick = () => handleArticleClick(article._id);
                    }else{
                        let articleBox = document.createElement('div');
                        articleBox.className = 'article-box';
                        articleBox.onclick = () => handleArticleClick(article._id);
                    }

                    let articleBox = document.createElement('div');
                    articleBox.className = 'article-box';
                    articleBox.onclick = () => handleArticleClick(article._id);

                    let topic = document.createElement('span');
                    topic.className = 'subject-label';
                    topic.innerHTML = article.topic;
                    if(article.topic == "music"){
                        topic.innerHTML = '&#127925;';
                    }else if(article.topic == "sports"){
                        topic.innerHTML = '&#9917;';
                    }else if(article.topic == "politics"){
                        topic.innerHTML = '&#127963;';
                    }else if(article.topic == "medicine"){
                        topic.innerHTML = '&#128137;';
                    }else if(article.topic == "nature"){
                        topic.innerHTML = '&#127794;';
                    }else if(article.topic == "travel"){
                        topic.innerHTML = '&#9992;';
                    }
                    

                    if(article.super){
                        let superStory = document.createElement('span');
                        superStory.className = 'super-story-label';
                        superStory.innerHTML = '&#11088; Super';
                        articleBox.appendChild(superStory);
                    }


                    let viewCount = document.createElement('span');
                    viewCount.className = 'article-views';
                    viewCount.innerHTML =  '&#128064;: ' + article.views;

                    let title = document.createElement('h2');
                    title.className = 'article-title';
                    title.innerHTML = article.title;

                    let author = document.createElement('h3');
                    author.className = 'author';
                    author.innerHTML = article.author;

                    let content = document.createElement('div');
                    content.className = 'article-summary';
                    content.innerHTML = truncateText(article.content);


                    articleBox.appendChild(topic);
                    articleBox.appendChild(viewCount);
                    //articleBox.appendChild(superStory);
                    articleBox.appendChild(title);
                    articleBox.appendChild(author);
                    articleBox.appendChild(content);
                    

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
    <span id="topic"></span>
    <span id="superStory"></span>
    <div class="article-title"></div>
    <div id="author"></div>
    <div id="content"></div>
    <div id="views"></div>
  </div>
  <!-- {/each} -->
</div>

<!--  Styling is in sharedStyle.css file in /lib folder-->
<style>





</style>