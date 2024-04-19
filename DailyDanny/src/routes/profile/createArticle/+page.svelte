<script>
  import articles from '/src/article_json/articles.json';
  import Editor from '@tinymce/tinymce-svelte';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { account } from '/src/routes/account.js';

  const API_URL = 'http://localhost:3000/';

  let accountId;
  let submitType;
  let currImgDiv = 1;
  let currTextDiv = 1;

  account.subscribe((id) => {
    accountId = id;
  });

  let title = '';
  let author = '';
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
    let textIndex = 0;
    let imgIndex = 0;

    console.log(textTags);
    console.log(imgTags);

    for(let i = 0; i < content.length; i++) {
      if (content[i].classList.contains('text')) {
        articleText += (textTags[textIndex]);
        textIndex++;
      } else if (content[i].classList.contains('image')) {
        let tag = document.createElement('div');
        tag.id = imgTags[imgIndex];
        tag.classList.add('get-image');
        articleText += (tag.outerHTML);
        imgIndex++;
      }
    }
    
    console.log(articleText);

    const article = {
      thumbnailid: imgTags[0],
      title: title,
      author: author,
      content: articleText,
      super: false,
      topic: document.getElementById('topics').value,
      views: 0,
      status: 'Pending review',
      reason: 'Recently submitted',
      authorid: accountId
    }

    if (submitType == 'save') article['status'] = 'Draft'

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

  function addTextBlock() {
    const textContainer = document.createElement('div');
    textContainer.id = currTextDiv;
    textContainer.classList.add('item');
    textContainer.classList.add('text');
    textTags.push('');
    const textTag = new Editor({
      target: textContainer,
      props: {
        apiKey: 's6fbao0y00rlqyh56hzalaphukeu65pwwospfmj68e692t56',
        type: 'text',
        bindvalue: textTags[currTextDiv],
        required: true
      }
    });
    //textContainer.appendChild(textTag);

    currTextDiv++;

    document.getElementById('content').appendChild(textContainer);
  }

  function addImageBlock() {
    const tag = document.createElement('div');
    const local = document.createElement('div');

    const local_label = document.createElement('label');
    const local_input = document.createElement('input');

    tag.id = currImgDiv;
    tag.classList.add('item');
    tag.classList.add('image');

    local_label.for = 'attachments';
    local_label.innerHTML = 'Attachments (Images or Videos):';

    local_input.type = 'file';
    local_input.id = 'attachments';
    local_input.multipleaccept = 'image/*,video/*';

    local.appendChild(local_label);
    local.appendChild(local_input);

    local_input.onchange = async (event) => {
      local_label.remove();
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
      console.log(images);

      imgTags.push(images[0]);
      currImgDiv++;
    }

    tag.appendChild(local);


    document.getElementById('content').appendChild(tag);

    currImgDiv++;
  }

</script>

<div class="form-container">
  <h1>Write an Article</h1>

  <div>
    <label for="title">Title:</label>
    <input type="text" id="title" bind:value={title} required />
  </div>

  <div>
    <label for="author">Author:</label>
    <input type="text" id="author" bind:value={author} required />
  </div>
  <div id='content'>
    <div class="item image">
      <label for="attachments">Add Thumbnail:</label>
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
    <div class="item text">
      <label for="articleText">Article Content:</label>
      <Editor apiKey="s6fbao0y00rlqyh56hzalaphukeu65pwwospfmj68e692t56" type="text" id="mytextarea" bind:value={textTags[0]} required />
    </div>
  </div>

  <div>
    <!-- <div>
      <button on:click={addTextBlock}>Add Text</button>
    </div> -->
    <div>
      <button on:click={addImageBlock}>Add Image</button>
    </div>
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
    <button type="submit" id="save" on:click={setSave}>Save</button>
    <button type="submit" id="send" on:click={setSend}>Submit for approval</button>
  </div>
  
</div>

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
