
<script>
    import { createEventDispatcher } from 'svelte';
    import axios from 'axios';
    import { account } from '/src/routes/account.js';

    const dispatch = createEventDispatcher();

    // Login API call
    const API_URL = 'http://localhost:3000/';

    let newPassword = '';
    let confirmPassword = '';
    let id;
    let user;

    account.subscribe((accountId) => {
        id = accountId;
    });

    async function handleChange(event) {
        event.preventDefault();

        if (newPassword === '') {
            console.error('New password is required');
            document.getElementById('error').innerText = 'New password is required';
            return;
        } else if (confirmPassword === '') {
            console.error('Confirmation of password is required');
            document.getElementById('error').innerText = 'Confirmation of password is required';
            return;
        } else if (confirmPassword !== newPassword) {
            console.error('Passwords are not the same');
            document.getElementById('error').innerText = 'Passwords are not the same';
            return;
        }

        try {
            const response = await axios.put(API_URL+"api/users/"+id+"?password="+newPassword)

            if (response.status === 200) {
                user = await response.data;
				console.log(user)

                console.log("Password changed");
                handleClosePopup();
            }
        } catch (error) {
            console.error('ERROR:', error);
        }
    }
    
    function handleClosePopup() {
        console.log("Closing change password popup");
        dispatch('close');
    }
</script>

<div class = "popup-overlay">
    <div class="popup">
        <div class="popup-content">
            <h2>Change Password</h2>
            <form on:submit={handleChange}>
                <label for="new-password">New Password:</label>
                <br/>
                <input type="password" id="new-password" bind:value={newPassword} />
                <br/>
                <label for="new-password">Confirm Password:</label>
                <br/>
                <input type="password" id="confirm-password" bind:value={confirmPassword} />
                <br/>
                <button type="submit" class = "change-button">Submit</button>
            </form>
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
    .login-button{
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
    .login-button:hover {
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
