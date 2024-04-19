<script>
    import articles from '/src/article_json/articles.json';
    import Editor from '@tinymce/tinymce-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { currentArticle } from '/src/routes/account.js';

    const API_URL = 'http://localhost:3000/';

    let articleId;
    let article;
    let submitType;
    let currImgDiv = 1;
    let currTextDiv = 1;

    currentArticle.subscribe((id) => {
      articleId = id;
    });

    let title = '';
    let author = '';
    let selectedFiles = [];
    let imageTags = [];
    let imgTags = new Array(1);
    let textTags = new Array(1);

    async function handleLoad() {
      console.log('loaded');
      lastClickedArticleID = localStorage.getItem('lastClickedArticle');

      try {
        const response = await axios.get(API_URL+"api/articles", { params: { id: lastClickedArticleID } });
        article = response['data'][0];

        console.log(article);
        
        if (response.statusText === "OK") {
          let content = article.content;

          const parser = new DOMParser();
          const tags = parser.parseFromString(content, "text/html").body.childNodes;

          title = article.title;
          author = article.author;

          console.log(tags);

          textTags[0] = tags[1].innerHTML;

          const response = await axios.get(API_URL+"api/images/"+tags[0].id);
          let image = response['data']
          console.log(image);
          
          if (response.statusText === "OK") {
              let content = document.createElement('img');

              // Convert the binary data into an array
              const uint8Array = new Uint8Array(image.img.data.data);

              // Convert the Uint8Array to a base64-encoded string
              let base64Image = '';
              for (let i = 0; i < uint8Array.length; i++) {
                  base64Image += String.fromCharCode(uint8Array[i]);
              }
              base64Image = btoa(base64Image);
              
              content.src = "data:"+image.img.contentType+";base64,"+base64Image;
              content.style.width = "50%";
              content.style.height = "auto";  

              content.style.borderRadius = "10px"; 
              content.style.marginLeft = "25%"
              content.style.marginRight = "25%"
              imageTags[0] = content;
              imgTags[0] = tags[0].id;
          } else {
            console.error(response.statusText);
          }

          let contentDiv = document.getElementsByClassName('item');
          contentDiv[0].appendChild(imageTags[0]);

          for (let i = 2; i < tags.length; i++)
          {
            if (tags[i].classList.contains('get-image')) {
              const response = await axios.get(API_URL+"api/images/"+tags[i].id);
              let image = response['data']
              console.log(image);
              
              if (response.statusText === "OK") {
                  let content = document.createElement('img');

                  // Convert the binary data into an array
                  const uint8Array = new Uint8Array(image.img.data.data);

                  // Convert the Uint8Array to a base64-encoded string
                  let base64Image = '';
                  for (let i = 0; i < uint8Array.length; i++) {
                      base64Image += String.fromCharCode(uint8Array[i]);
                  }
                  base64Image = btoa(base64Image);
                  
                  content.src = "data:"+image.img.contentType+";base64,"+base64Image;
                  content.style.width = "50%";
                  content.style.height = "auto";  

                  content.style.borderRadius = "10px"; 
                  content.style.marginLeft = "25%"
                  content.style.marginRight = "25%"
                  imageTags[currImgDiv] = content;
              } else {
                console.error(response.statusText);
              }

              let contentDiv = document.getElementById('content');
              contentDiv.appendChild(imageTags[currImgDiv]);
              currImgDiv++;
            } else {
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
          }
        } else {
          console.error(response.statusText);
        }
      } catch(error) {
        console.log(error);
      }
    }

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

    async function handleSubmit () {
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

      const articleObj = {
        thumbnail: imgTags[0],
        title: title,
        author: author,
        content: articleText,
        super: false,
        topic: document.getElementById('topics').value,
        views: article.views,
        status: article.status,
        reason: 'none',
        authorid: article.authorid
      }

      if (submitType == 'save') articleObj['status'] = 'Draft';
      else if (submitType == 'send') articleObj['status'] = 'Pending review';

      console.log(articleObj);

      const data = 'article=' + JSON.stringify(articleObj);

      console.log(data);

      let response = await axios.put(API_URL+"api/articles/"+articleId+"?views="+false, data);
      console.log(response);

      // Reset form fields
      title = '';
      author = '';
      articleText = '';
      
      console.log('Article submitted!');
    }

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

<div class="form-container" use:handleLoad>
    <h1>Edit an Article</h1>

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
        
      </div>
      <div class="item text">
        <label for="articleText">Article Content:</label>
        <Editor apiKey="s6fbao0y00rlqyh56hzalaphukeu65pwwospfmj68e692t56" type="text" id="mytextarea" bind:value={textTags[0]} required />
      </div>
    </div>

    <div>
      <div>
        <button on:click={addTextBlock}>Add Text</button>
      </div>
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
