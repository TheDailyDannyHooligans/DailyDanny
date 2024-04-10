
<script>
    import { createEventDispatcher } from 'svelte';
    import axios from 'axios';

    const dispatch = createEventDispatcher();

    // Signup API call
    const API_URL = 'http://localhost:3000/';
    let images;
    let image;


    async function handleLoad() {
        console.log('loaded');

		try {
			const response = await axios.get(API_URL+"api/images", { params: { advertisement: true } });
			console.log(response['data']);
			console.log(response['config']);
            images = response['data']
            console.log(images);
			
			if (response.statusText === "OK") {
                images.forEach((image) => {
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

                    document.getElementById('images').appendChild(content);
                })
			} else {
				console.error(response.statusText);
			}
		} catch(error) {
			console.log(error);
		}
    }


    // Opening and closing of popups
    function handleClosePopup() {
        console.log("Closing images popup");
        dispatch('close');
    }
</script>

<div class = "popup-overlay">
    <div class="popup" use:handleLoad>
        <div class="popup-content">
            <h2>Choose Ads</h2>
            <div id='images'></div>
            <p id="error"></p>
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
        padding: 20px;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 150px;
        background-color: #5d6063;
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
