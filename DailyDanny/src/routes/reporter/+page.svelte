<script>
  // import Editor from '@tinymce/tinymce-svelte';

  //   export let form;
  //   let title = '';
  //   let author = '';
  //   let articleText = '';
  //   let sucess = false;

  //   $: {
  //     if (form && form.sucess) {
  //       sucess = true;
  //       setTimeout(() => {
  //         sucess = false;
  //       }, 3000);
  //     }
  //   }

  //   $: articleData = form?.article;

  async function handleSubmit() {
    const formData = {
      title,
      author,
      articleText,
    };

  const response = await fetch('/api/submitArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
}

</script>


<div class="form-container">
  <h2 class = "form-title">Write an Article</h2>
  <form class="form-class" on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="title">Title:</label>
      <input name="title" type="title" bind:value={title} required />
    </div>
  
    <div>
      <label for="author">Author:</label>
      <input name="author" type="author" bind:value={author} required />
    </div>
  
    <div>
      <label for="articleText">Article Content:</label>
      <div class="editor-container">
        <!-- <Editor apiKey="s6fbao0y00rlqyh56hzalaphukeu65pwwospfmj68e692t56" bind:value={articleText}/>  -->
        <textarea name="articleText" type="articleText" bind:value={articleText} />
      </div>
      
    </div>
  
    <!-- <div>
      <label for="attachments">Attachments (Images or Videos):</label>
      <input
        type="file"
        id="attachments"
        multiple
        accept="image/*,video/*"
        on:change={handleFileInput}
      />
    </div> -->
  
    <div>
      <button type="submit">Submit</button>
    </div>

  </form>
</div>

<div class="blank"></div>
  
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