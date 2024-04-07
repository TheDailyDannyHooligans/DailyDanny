<script>
    import axios from 'axios';
    import '/src/lib/sharedStyle.css'

    const API_URL = 'http://localhost:3000/';

    async function handleLoad() {
        console.log('loaded');

		try {
			const response = await axios.get(API_URL+"api/articles", { params: { top: true } });
			let articles = response['data'];

      console.log(response);
      console.log(articles);
      console.log(articles[0]);
			
			if (response.statusText === "OK") {
                let title = document.createElement('h2');
                let author = document.createElement('h3');
                let viewCount = document.createElement('p');

                title.innerHTML = articles[0].title;
                author.innerHTML = articles[0].author;
                viewCount.innerHTML = 'Number of views: ' + articles[0].views;

                document.getElementById('title').appendChild(title);
                document.getElementById('author').appendChild(author);
                document.getElementById('content').insertAdjacentHTML('beforeend', articles[0].content);
                document.getElementById('views').appendChild(viewCount);
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
    <div id="title"></div>
    <div id="author"></div>
    <div id="content"></div>
    <div id="views"></div>
  </div>
</body>

<!--  Styling is in sharedStyle.css file in /lib folder-->
<style>

</style>