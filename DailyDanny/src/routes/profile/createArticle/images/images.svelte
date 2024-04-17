<script>
    import { createEventDispatcher } from 'svelte';
    import axios from 'axios';

    const dispatch = createEventDispatcher();

    // Signup API call
    const API_URL = 'http://localhost:3000/';
    let images;
    let mainImageTags;

    async function handleLoad() {
        console.log('loaded');

		try {
			const response = await axios.get(API_URL+"api/images", { params: { advertisement: false } });
			console.log(response['data']);
			console.log(response['config']);
            images = response['data']
            console.log(images);

            mainImageTags = new Array(images.length);

            for (let i = 0; i < images.length; i++) mainImageTags[i] = null;
			
			if (response.statusText === "OK") {
                let id = 0;

                const promises = images.map((image) => {
                    let content = document.createElement('img');

                    // Convert the binary data into an array
                    const uint8Array = new Uint8Array(image.img.data.data);

                    // Convert the Uint8Array to a base64-encoded string
                    let base64Image = '';
                    for (let i = 0; i < uint8Array.length; i++) {
                        base64Image += String.fromCharCode(uint8Array[i]);
                    }
                    base64Image = btoa(base64Image);
                    
                    content.id = `${id}`;
                    content.src = "data:"+image.img.contentType+";base64,"+base64Image;
                    content.style.maxWidth = '100%';
                    content.style.maxHeight = '100%';
                    content.style.marginBottom = '10px';
                    content.style.objectFit = 'contain';
                    content.style.display = 'block';
                    content.onclick = () => {
                        if (content.style.border == 'solid white') {
                            mainImageTags[content.id] = null;
                            content.style.border = '';
                        } else {
                            mainImageTags[content.id] = content;
                            content.style.border = 'solid white';
                        }
                    };
                    
                    id++;
                    
                    return content;
                });

                const imageTags = await Promise.all(promises);

                imageTags.forEach((tag) => {
                    if (tag !== null) document.getElementById('images').appendChild(tag);
                });
			} else {
				console.error(response.statusText);
			}
		} catch(error) {
			console.log(error);
		}
    }


    // Opening and closing of popups
    function handleSubmit() {
        console.log(mainImageTags);
        mainImageTags.forEach((tag) => {
            if (tag !== null) document.getElementById('chosen-images').appendChild(tag);
        });

        handleClosePopup();
    }

    function handleClosePopup() {
        console.log("Closing images popup");
        dispatch('close');
    }
</script>

<div class = "popup-overlay">
    <div class="popup" use:handleLoad>
        <div class="popup-content">
            <h2>Choose Images</h2>
            <div id='images'></div>
            <p id="error"></p>
            <button on:click={handleSubmit} class = "close-button">Choose Images</button>
            <button on:click={handleClosePopup} class = "close-button">Close</button>
        </div>
    </div>
</div>

<style>
    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        border-radius: 5px;
        color : #fbfbff;
    }

    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(101, 97, 97, 0.1);
        backdrop-filter: blur(10px); /* Apply the blur effect */
        -webkit-backdrop-filter: blur(5px); /* For Safari compatibility */
        z-index: 998; /* Ensure the overlay is behind the popup */
    }

    .popup-content {
        width: 100%;
        height: 80%;
        padding: 150px;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #5d6063;
        overflow-y: auto;
        overflow-x: hidden; /* No horizontal scroll */
    }

    #images {
        align-items: center;
    }

    .close-button,
    .signup-button{
        margin-top: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #5d6063;
        color: white;
        cursor: pointer;
        border: 0.1em solid white;
    }

    .close-button:hover,
    .signup-button:hover {
        background-color: rgb(54, 135, 160);
    }

    #new-popup {
        color: rgb(18, 1, 255);
    }

    #new-popup:hover {
        color: rgb(65, 0, 245);  
    }

    #error {
        color: red;
    }
</style>