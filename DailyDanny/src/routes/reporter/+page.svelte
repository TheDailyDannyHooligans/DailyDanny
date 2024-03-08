<script>
    import articles from '/src/article_json/articles.json';
    import Editor from '@tinymce/tinymce-svelte';
    import { onMount } from 'svelte';
    import '/src/lib/sharedStyle.css'
    
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
  
<style>
  .form-container {
    margin: 150px auto 20px;
    width: 75%;
    max-width: 800px;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 2;
    position: relative;
  }

  .form-title {
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .form-class {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .form-class > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }

  .form-class > div > label {
    align-self: flex-start;
    width: calc(100% - 40px);
    margin: 0 20px; 
    text-align: left; 
  }

  .form-class input,
  .form-class button {
    width: calc(100% - 40px);
    margin: 10px 20px;
    padding: 10px;
    box-sizing: border-box;
  }

  .editor-container {
    width: calc(100% - 40px); 
    margin: 10px 20px; 
    padding: 0; 
  }

  .blank {
    padding: 100px;
  }
</style>

<div class="form-container">
  <h2 class = "form-title">Write an Article</h2>

  <form class="form-class" on:submit={handleSubmit}>
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
      <div class="editor-container">
        <Editor apiKey="s6fbao0y00rlqyh56hzalaphukeu65pwwospfmj68e692t56" bind:value={articleText}/> 
      </div>
      
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

<div class="blank"></div>