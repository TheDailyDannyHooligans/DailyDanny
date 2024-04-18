<script>
    import articles from '/src/article_json/articles.json';
    import Editor from '@tinymce/tinymce-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import ImagesPopup from '/src/routes/profile/createArticle/images/images.svelte'; 
    import { currentArticle } from '/src/routes/account.js';

    const API_URL = 'http://localhost:3000/';

    let articleId;
    let article;

    currentArticle.subscribe((id) => {
      articleId = id;
    })

    let title = '';
    let author = '';
    let articleText = '';
    let isSuper = false;
    let status = '';
    let reason = '';
    let selectedFiles = [];

    async function handleLoad() {
      console.log('loaded');

      try {
        const response = await axios.get(API_URL+"api/articles", { params: { id: articleId } });
        article = response['data'][0];

        console.log(article);
        
        if (response.statusText === "OK") {
          title = article.title;
          author = article.author;
          articleText = article.content;
        } else {
          console.error(response.statusText);
        }
      } catch(error) {
        console.log(error);
      }
    }

    const handleFileInput = (event) => {
      selectedFiles = Array.from(event.target.files);
    };

    async function handleSubmit () {
      console.log('Handling form submit...');
      
      let formData;
      let key = 0;
      let adIds = {};

      selectedFiles.forEach(async (file) => {
        formData = new FormData();
        formData.append('image', selectedFiles[0]);
        formData.append('advertisement', true);
        
        const response = await axios.post(API_URL+"api/images", formData);
        adIds[key++] = response.data._id;
      })

      if (document.getElementById('yes') && document.getElementById('yes').checked) {
          isSuper = true;
      } else if (document.getElementById('no') && document.getElementById('no').checked) {
          isSuper = false;
      }

      if (document.getElementById('approved') && document.getElementById('approved').checked) {
          status = 'Approved';
      } else if (document.getElementById('rejected') && document.getElementById('rejected').checked) {
          status = 'Rejected';
      }

      console.log(adIds)

      const articleObj = {
        title: title,
        author: author,
        content: articleText,
        super: isSuper,
        topic: document.getElementById('topics').value,
        status: status,
        reason: reason
      }

      console.log(articleObj);

      const data = 'article=' + JSON.stringify(articleObj);
      const ads = JSON.stringify(adIds);

      console.log(data);
      console.log(ads);

      const response = await axios.put(API_URL+"api/articles/"+articleId+"?views="+false, data);
      console.log(response);
      
      console.log('Article updated!');
    };

    let adsPopupVisible = false;  

    function toggleAdsPopup() {
      adsPopupVisible = !adsPopupVisible;
    }

    function closeAdsPopup() {
      adsPopupVisible = false;
    }
</script>

<div class="form-container" use:handleLoad>
    <h1>Write an Article</h1>

    <form on:submit={handleSubmit}>
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" bind:value={title} required />
      </div>
    
      <div>
        <label for="author">Author:</label>
        <input type="text" id="author" bind:value={author} required />
      </div>
    
      <div>
        <label for="articleText">Article Content:</label>
        <Editor apiKey="s6fbao0y00rlqyh56hzalaphukeu65pwwospfmj68e692t56" type="text" id="articleText" bind:value={articleText} required />
      </div>
    
      <div>
        <label for="attachments">Advertisements (Images or Videos):</label>
        <input
          type="file"
          id="attachments"
          multiple
          accept="image/*,video/*"
          on:change={handleFileInput}
        />
      </div>
      <div>
        <label for="addAttachments">Add Advertisements (Images or Videos):</label>
        <button on:click={toggleAdsPopup}>Choose advertisements</button>
      </div>

      <div>
        <label for="topic">Article Topic:</label>
        <select name="topic" id="topics">
          <option value="medicine">Medicine</option>
          <option value="music">Music</option>
          <option value="nature">Nature</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="travel">Travel</option>
        </select>
      </div>

      <div>
        <label for="super">Will this article be given the super title:</label>
        <input type="radio" name="super" id="yes" value="yes" />
        <label for="yes">Yes</label>
        <input type="radio" name="super" id="no" value="no" />
        <label for="no">No</label>
      </div>
      <div>
        <label for="status">Is this article approved or rejected:</label>
        <input type="radio" name="status" id="approved" value="approved" />
        <label for="approved">Approved</label>
        <input type="radio" name="status" id="rejected" value="rejected" />
        <label for="rejected">Rejected</label>
      </div>
      <div>
        <label for="reason">If rejected, give your reasoning as to why:</label>
        <br/>
        <input type="text" id="reason" bind:value={reason} />
      </div>
    
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
</div>

{#if adsPopupVisible}
    <ImagesPopup on:close={closeAdsPopup}/>
{/if}

<style>
  .form-container {
    margin-top: 200px;
  }

  form {
    position: absolute;
    top: 15%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  div {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  textarea {
    height: 150px;
  }

  button[type="submit"] {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button[type="submit"]:hover {
    background-color: #0056b3;
  }
</style>
