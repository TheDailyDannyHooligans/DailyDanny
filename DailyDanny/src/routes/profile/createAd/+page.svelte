<script>
    import articles from '/src/article_json/articles.json';
    import Editor from '@tinymce/tinymce-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import ImagesPopup from '/src/routes/profile/createArticle/images/images.svelte'; 
    import { account } from '/src/routes/account.js';
  
    const API_URL = 'http://localhost:3000/';
  
    let accountId;
    let submitType;
    let currImgDiv = 1;
    let currTextDiv = 1;
  
    account.subscribe((id) => {
      accountId = id;
    });
  
    let selectedFiles = [];
    let imageTags = [];
    let imgTags = new Array(1);
    let textTags = new Array(1);
  
    async function handleFileInput(event) {
      selectedFiles = Array.from(event.target.files);
  
      let images = [];
      let promises = selectedFiles.map(async (file) => {
        let formData = new FormData();
        formData.append('image', file);
        formData.append('advertisement', false);
        
        const response = await axios.post(API_URL+"api/images", formData);
        return response.data._id;
      });
  
      images = await Promise.all(promises);
  
      imgTags[0] = images[0];
    }
  
    function setSave() {
      submitType = 'save';
      handleSubmit();
    }
  
    function setSend() {
      submitType = 'send';
      handleSubmit();
    }
  
    async function handleSubmit() {
      console.log('Handling form submit...');
  
      let content = document.getElementsByClassName('item');
  
      let articleText = '';
  
      console.log(imgTags);
  
      if (content[0].classList.contains('image')) {
        let tag = document.createElement('div');
        tag.id = imgTags[0];
        tag.classList.add('get-image');
        articleText += (tag.outerHTML);
      }
      
      // console.log(articleText);
  
      const article = {
        thumbnailid: imgTags[0],
        views: 0,
        status: 'Approved',
        reason: 'Recently submitted',
        authorid: accountId
      }
  
      // if (submitType == 'save') article['status'] = 'Draft'
  
      console.log(article);
  
      const data = 'article=' + JSON.stringify(article);
      console.log(data);
  
      const response = await axios.post(API_URL+"api/articles", data);
      console.log(response);
  
      // Reset form fields
      title = '';
      author = '';
      articleText = '';
      
      console.log('Article submitted!');
    };
  
    let imagesPopupVisible = false;  
  
    function toggleImagesPopup() {
      imagesPopupVisible = !imagesPopupVisible;
    }
  
    function closeImagesPopup() {
      imagesPopupVisible = false;
    }

  
  </script>

  <div class="form-container">
    <h1>Create an Advertisement</h1>
    <div id='content'>
      <div class="item image">
        <label for="attachments"></label>
        <div>
          <label for="attachments">Attachments (Images or Videos):</label>
          <input
            type="file"
            id="attachments"
            multiple
            accept="image/*,video/*"
            on:change={handleFileInput}
          />
        </div>
      </div>
    </div>
  </div>
  <div>
    <button type="submit" id="send" on:click={setSend}>Submit</button>
  </div>
  {#if imagesPopupVisible}
    <ImagesPopup on:close={closeImagesPopup}/>
  {/if}
  
  <style>
  .form-container {
    margin-top: 200px;
  }
  
  form {
    position: absolute;
    top: 20%;
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
  