<script>
    import axios from 'axios';
    import '/src/lib/sharedStyle.css'
    import { currentArticle } from '/src/routes/account.js';
    import { onMount } from 'svelte';

    const API_URL = 'http://localhost:3000/';
    const topic = 'medicine';

    let articleId;

    currentArticle.subscribe((id) => {
        articleId = id;
    });

    async function handleLoad() {
        console.log('loaded');

    let lastClickedArticleID;
    let article;

    // gets the last clicked article id from local storage
    lastClickedArticleID = localStorage.getItem('lastClickedArticle');
    console.log(lastClickedArticleID);

    try {
    // Find article with stored id
    // { params: { id: lastClickedArticleID } }
      const update = await axios.put(API_URL+"api/articles/"+lastClickedArticleID+"?views="+true);
      const response = await axios.get(API_URL+"api/articles", { params: { id: lastClickedArticleID } });
      article = response.data[0];
      console.log(response);
      console.log(article);


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

    // Create object for article if found
      if (response.statusText === "OK") {
                let container = document.createElement('div');
                container.className = 'container';
                

                let title = document.createElement('h2');                
                title.className = 'title';
                title.innerHTML = article.title;
                

                let author = document.createElement('h3');
                author.className = 'author';
                author.innerHTML = article.author;

                let viewCount = document.createElement('p');
                viewCount.className = 'article-views';
                viewCount.innerHTML = 'Views: ' + article.views;

                document.getElementById(article)
                document.getElementById('title').appendChild(title);
                document.getElementById('author').appendChild(author);
                document.getElementById('content').insertAdjacentHTML('beforeend', article.content);
                document.getElementById('views').appendChild(viewCount);

                let images = document.getElementsByClassName('get-image');
                console.log(images);
                for (let i = 0; i < images.length; i++)
                {
                  console.log(images[i]);
                  const response = await axios.get(API_URL+"api/images/"+images[i].id);
                  let image = response['data']
                  console.log(image);
                  
                  if (response.statusText === "OK") {
                      let content = document.createElement('img');

                      // Convert the binary data into an array
                      const uint8Array = new Uint8Array(image.img.data.data);

                      // Convert the Uint8Array to a base64-encoded string
                      let base64Image = '';
                      for (let i = 0; i < uint8Array.length; i++) {
                          base64Image += String.fromCharCode(uint8Array[i]);
                      }
                      base64Image = btoa(base64Image);
                      
                      content.src = "data:"+image.img.contentType+";base64,"+base64Image;
                      content.style.width = "50%";
                      content.style.height = "auto";  

                      content.style.borderRadius = "10px"; 
                      content.style.marginLeft = "25%"
                      content.style.marginRight = "25%"
                      images[i].appendChild(content);
                  } else {
                    console.error(response.statusText);
                  }
                }
      }
    } catch(error) {
        console.log(error);
    }};
</script>

<body class = "body">

  <div class="container" id="article" use:handleLoad>
    <div id="title"></div>
    <div id="author"></div>
    <div id="content"></div>
    <div id="views"></div>
  </div>
</body>

<!--  Styling is in sharedStyle.css file in /lib folder-->
<style>
    :global(body) {
        background-color: #bacadd; 
        font-family: 'Times New Roman', sans-serif;
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 90%;
      margin-top: 175px;
      padding: 10%;         
    }



    
@media screen and (max-width: 768px){
    .container {
        width: 97vw
    }
  }
</style>