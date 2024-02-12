<script>
    let title = '';
    let author = '';
    let content = '';
    let selectedFiles = [];
  
    const handleFileInput = (event) => {
      selectedFiles = Array.from(event.target.files);
    };
  
    const handleSubmit = () => {
      const formData = {
      title,
      author,
      content
    };
    articles = [...articles, formData]; // Add new article to the array

    // Reset form fields
    title = '';
    author = '';
    content = '';
    };
  </script>
  
  <style>
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
      <label for="content">Content:</label>
      <textarea id="content" bind:value={content} required></textarea>
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
  
 