<script>
    import articles from '/src/article_json/articles.json';
    import Editor from '@tinymce/tinymce-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import ImagesPopup from '/src/routes/profile/createArticle/images/images.svelte'; 

    const API_URL = 'http://localhost:3000/';

    /*
    const multer = require('multer');

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads')
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
      }
    });

    const upload = multer({ storage: storage });
    */
    let title = '';
    let author = '';
    let articleText = '';
    let selectedFiles = [];

    const printArticlesToFile = async (formData) => {
      try {
          // Fetch the existing content of the articles.json file
          const response = await fetch('/src/article_json/articles.json');
          const existingData = await response.json();

          // Append the new article to the existing data array
          existingData.push(formData);

          // Convert the updated data array to JSON string
          const updatedDataJSON = JSON.stringify(existingData, null, 2);

          // Create a Blob containing the updated JSON data
          const blob = new Blob([updatedDataJSON], { type: 'application/json' });

          // Create a temporary URL for the Blob
          const url = URL.createObjectURL(blob);

          // Create a link element to trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'articles.json'; // Set the download attribute to specify the filename

          // Append the link to the document body and trigger the download
          document.body.appendChild(a);
          a.click();

          // Release the URL object
          URL.revokeObjectURL(url);
      } catch (error) {
          console.error('Error printing articles to file:', error);
      }
    };



    const handleFileInput = (event) => {
      selectedFiles = Array.from(event.target.files);
    };

    async function handleSubmit () {
      console.log('Handling form submit...');
      
      let formData;
      let key = 0;
      let imageIds = {};

      selectedFiles.forEach(async (file) => {
        formData = new FormData();
        formData.append('image', selectedFiles[0]);

        
        const response = await axios.post(API_URL+"api/images", formData);
        imageIds[key++] = response.data._id;
      })

      console.log(imageIds)
      const article = {
        title: title,
        author: author,
        content: articleText
      }

      console.log(article);

      const data = JSON.stringify(article);
      const images = JSON.stringify(imageIds);

      console.log(data);
      console.log(images);

      //const response = await axios.post(API_URL+"api/articles", { params: {article: article , imageids: imageIds}});
      //console.log(response);

      // Reset form fields
      title = '';
      author = '';
      articleText = '';
      
      console.log('Article submitted!');

      //window.location.href = "/src/routes/reporter";
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
        <label for="attachments">Attachments (Images or Videos):</label>
        <input
          type="file"
          id="attachments"
          multiple
          accept="image/*,video/*"
          on:change={handleFileInput}
        />
      </div>
      <div>
        <label for="addAttachments">Add Attachments (Images or Videos):</label>
        <button on:click={toggleImagesPopup}>Choose images</button>
      </div>
    
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
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
