<script>
  import axios from 'axios';
  import { account, isAdmin } from '/src/routes/account.js';
  import '/src/lib/sharedStyle.css'

  const API_URL = 'http://localhost:3000/';

  let accountId;
  let admin;

  account.subscribe((id) => {
    accountId = id;
  });

  isAdmin.subscribe((status) => {
    admin = status;
  });

  async function handleLoad() {
    console.log('loaded');

    try {
      if (admin) {
        const response = await axios.get(API_URL+"api/articles");
        let articles = response['data'];

        console.log(response);
        console.log(articles);
        console.log(articles[0]);
        
        if (response.statusText === "OK") {
          articles.forEach((article) => {
            let article_div = document.createElement('div');
            let title_div = document.createElement('div');
            let status_div = document.createElement('div');
            let reason_div = document.createElement('div');
            let title = document.createElement('h3');
            let status = document.createElement('p');
            let reason = document.createElement('p');
            
            title.innerHTML = article.title;
            status.innerHTML = article.status;
            reason.innerHTML = article.reason;

            title_div.appendChild(title);
            status_div.appendChild(status);
            reason_div.appendChild(reason);

            article_div.appendChild(title_div);
            article_div.appendChild(status_div);
            article_div.appendChild(reason_div);

            document.getElementById('articles').appendChild(article_div);
          });
        } else {
          console.error(response.statusText);
        }
      } else {
        const response = await axios.get(API_URL+"api/articles", { params: { authorid: accountId } });
        let articles = response['data'];

        console.log(response);
        console.log(articles);
        console.log(articles[0]);
        
        if (response.statusText === "OK") {
          articles.forEach((article) => {
            let article_div = document.createElement('div');
            let title_div = document.createElement('div');
            let status_div = document.createElement('div');
            let reason_div = document.createElement('div');
            let title = document.createElement('h3');
            let status = document.createElement('p');
            let reason = document.createElement('p');
            
            title.innerHTML = article.title;
            status.innerHTML = article.status;
            reason.innerHTML = article.reason;

            title_div.appendChild(title);
            status_div.appendChild(status);
            reason_div.appendChild(reason);

            article_div.appendChild(title_div);
            article_div.appendChild(status_div);
            article_div.appendChild(reason_div);

            document.getElementById('articles').appendChild(article_div);
          });
        } else {
          console.error(response.statusText);
        }
      }
    } catch(error) {
      console.log(error);
    }
  }

</script>

<body class = "body">
  <div class="articles" id="article" use:handleLoad>
    <div id="articles"></div>
    <!-- ADD A LINK TO VIEW THE ARTICLE -->
  </div>
</body>

<!--  Styling is in sharedStyle.css file in /lib folder-->
<style>

</style>