<script>
    import articles from '/src/article_json/articles.json';
    import Editor from '@tinymce/tinymce-svelte';
    import { onMount } from 'svelte';
    
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

    function handleSubmit () {
      console.log('Handling form submit...');
      console.log(title);
      console.log(author);
      console.log(articleText);

      let formData = {
          title,
          author,
          articleText
      };

      printArticlesToFile(formData);
      console.log('Updated File:');


      // Reset form fields
      title = '';
      author = '';
      articleText = '';
      
      console.log('Article submitted!');
    };
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
        <Editor apiKey="s6fbao0y00rlqyh56hzalaphukeu65pwwospfmj68e692t56" bind:value={articleText}/>
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
        <button type="submit">Submit</button>
      </div>
    </form>
</div>

<div class="form-container">
  <form action="http://localhost:3000/api/images" method="POST" enctype="multipart/form-data">
      <div>
          <label for="name">Image Title</label>
          <input
              type="text"
              id="name"
              placeholder="Name"
              value=""
              name="name"
              required
          />
      </div>
      <div>
          <label for="image">Upload Image</label>
          <input type="file" id="image" name="image" value="" required />
      </div>
      <div>
          <button type="submit">Submit</button>
      </div>
  </form>
</div>
  
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
