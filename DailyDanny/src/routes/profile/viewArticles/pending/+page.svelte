<script>
  import axios from 'axios';
  import { currentArticle, account } from '/src/routes/account.js';
  import '/src/lib/sharedStyle.css'

  const API_URL = 'http://localhost:3000/';

  let accountId;

  account.subscribe((id) => {
    accountId = id;
  });

  async function handleLoad() {
    console.log('loaded');

    try {
      const response = await axios.get(API_URL+"api/articles", { params: { status: 'Pending review' } });
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
          let title_link = document.createElement('a');
          let status = document.createElement('p');

          title_link.addEventListener('click', () => currentArticle.update((id) => article._id));
            
          title_link.innerHTML = article.title;
          title_link.href = '../editArticle/admin'
          status.innerHTML = article.status;

          title.appendChild(title_link);
          title_div.appendChild(title);
          status_div.appendChild(status);

          article_div.appendChild(title_div);
          article_div.appendChild(status_div);

          document.getElementById('articles').appendChild(article_div);
        });
      } else {
        console.error(response.statusText);
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