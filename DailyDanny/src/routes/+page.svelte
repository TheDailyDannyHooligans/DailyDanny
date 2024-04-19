<meta charset="UTF-8">
<script>
    import axios from 'axios';
    import '/src/lib/sharedStyle.css'

    const API_URL = 'http://localhost:3000/';

    let articles;
    

    async function handleLoad() {
        console.log('loaded');

    try {
            const response = await axios.get(API_URL + "api/articles", { params: { status: 'Approved' } });
            articles = response.data;

            console.log(articles);

            if (typeof window !== "undefined") {
                // Get the entire cookie string
                const allCookies = document.cookie;

                // Split the string into individual cookies
                const cookiesArray = allCookies.split('; ');

                // Initialize a variable to store the theme value
                let themeValue = null;

                // Search for the 'theme' cookie
                for (const cookie of cookiesArray) {
                    const [key, value] = cookie.split('=');
                    if (key === 'theme') {
                        themeValue = value;
                        break; // Exit the loop once found
                    }
                }

                const body = document.body;

                // Check the theme value
                if (themeValue === 'dark') {
                    console.log('The theme is dark.');
                    body.classList.add('dark-mode');
                } else if (themeValue === 'light') {
                    body.classList.remove('dark-mode');
                    console.log('The theme is light.');
                } else {
                    console.log('The theme is not set or has an unknown value.');
                }
            }

            if (response.statusText === "OK") {
                const frame = document.querySelector('.article-frame');
                frame.innerHTML = '';  // Clear existing content

                // Loop through all approved articles, saving the id as you go with i
                let x, y = false;
                articles.forEach(async (article) => {
                  console.log(x);
                    if(article.super){
                      if(!x)
                      {
                        let mainStoryBox = document.createElement('div');
                        mainStoryBox.className = 'main-story-box';
                        mainStoryBox.onclick = () => handleArticleClick(article._id);
                        x = true;
                      }
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
                    

                    if(article.super & !y){
                        let superStory = document.createElement('span');
                        superStory.className = 'super-story-label';
                        superStory.innerHTML = '&#11088;&#11088;&#11088;';
                        articleBox.appendChild(superStory);
                        y = true;
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

                    let thumbnail = document.createElement('img');
                    author.className = 'thumbnail';

                    if (article.thumbnailid) {
                        const response = await axios.get(API_URL+"api/images/"+article.thumbnailid);
                        let image = response['data']

                        if (response.statusText === "OK") {
                            // Convert the binary data into an array
                            const uint8Array = new Uint8Array(image.img.data.data);

                            // Convert the Uint8Array to a base64-encoded string
                            let base64Image = '';
                            for (let i = 0; i < uint8Array.length; i++) {
                                base64Image += String.fromCharCode(uint8Array[i]);
                            }
                            base64Image = btoa(base64Image);
                            
                            //styling
                            thumbnail.style.width = "95%";
                            thumbnail.style.height = "auto";  
                            thumbnail.style.marginLeft = "2.5%";
                            thumbnail.style.borderRadius = "10px"; 

                            thumbnail.src = "data:"+image.img.contentType+";base64,"+base64Image;
                        } else {
                            console.error(response.statusText);
                        }
                    }

                    let content = document.createElement('div');
                    content.className = 'article-summary';
                    content.innerHTML = truncateText(article.content);


                    articleBox.appendChild(topic);
                    articleBox.appendChild(viewCount);
                    //articleBox.appendChild(superStory);
                    articleBox.appendChild(title);
                    articleBox.appendChild(author);
                    articleBox.appendChild(thumbnail);
                    articleBox.appendChild(content);
                    

                    frame.appendChild(articleBox);
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
        return words.join(' ');
      }
    }

  async function handleArticleClick(articleID) {
    console.log("Article clicked", articleID);
    localStorage.setItem('lastClickedArticle', articleID);
    // incrementViewCount(articleID);

    window.location.href = '/articlePage';
  }

  function incrementViewCount(articleId) {
    fetch(`/api/articles/increment-view/${articleId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => console.log("Views incremented:", data))
    .catch(error => console.error("Error incrementing views:", error));
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