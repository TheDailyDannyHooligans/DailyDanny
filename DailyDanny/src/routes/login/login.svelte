
<script>
    import { createEventDispatcher } from 'svelte';
    import SignupPopup from '/src/routes/signup/signup.svelte'; 
    import axios from 'axios';
    import { account, isAdmin, isEditor, isUser } from '/src/routes/account.js';

    const dispatch = createEventDispatcher();

    // Login API call
    const API_URL = 'http://localhost:3000/';

    let user;
    let email = '';
    let password = '';

    async function handleLogin(event) {
        event.preventDefault();

        if (email === '') {
            console.error('Email is required');
            document.getElementById('error').innerText = 'Email is required';
            return;
        } else if (password === '') {
            console.error('Password is required');
            document.getElementById('error').innerText = 'Password is required';
            return;
        }

        try {
            const response = await axios.get(API_URL+"api/users", { params: { email: email, password: password } })
            console.log('API Response:', response);
            if (response.status === 200) {
                user = await response.data;
				console.log(user)

                account.update((id) => user._id)
                isAdmin.update((val) => user.admin)
                isEditor.update((val) => user.editor)
                isUser.update((val) => user.user)

                console.log("Closing login popup");
                dispatch('close');
            }
        } catch (error) {
            if (error.response.status === 500) {
                if (email === '') {
                    console.error('Email is required');
                    document.getElementById('error').innerText = 'Email is required';
                } else if (password === '') {
                    console.error('Password is required');
                    document.getElementById('error').innerText = 'Password is required';
                } else {
                    console.error('The text boxes cannot be left blank');
                    document.getElementById('error').innerText = 'The text boxes cannot be left blank';
                }
            } else if (error.response.status === 404) {
                console.error('Account with this email does not exist');
                document.getElementById('error').innerText = 'Account with this email does not exist';
            } else if (error.response.status === 400) {
                console.error('Incorrect password');
                document.getElementById('error').innerText = 'Incorrect password';
            } else {
                console.error('Failed to fetch user:', error);
            }
        }
    }
    
    // Opening and closing of popups
    function handleCloseLogin() {
        console.log("Closing login popup");
        dispatch('close');
    }

    let signupPopupVisible = false;  

    function toggleSignupPopup() {
        signupPopupVisible = !signupPopupVisible;
    }

    function closeSignupPopup() {
        signupPopupVisible = !signupPopupVisible;
    }
</script>
<div class = "popup-overlay">
    <div class="popup">
        <div class="popup-content">
            <h2>Login</h2>
            <form on:submit={handleLogin}>
                <label for="email">Email:</label>
                <br/>
                <input type="text" id="email" bind:value={email} />
                <br/>
                <label for="password">Password:</label>
                <br/>
                <input type="password" id="password" bind:value={password} />
                <br/>
                <button type="submit" class = "login-button">Login</button>
            </form>
            <p id="error"></p>
            <button on:click={handleCloseLogin} class = "close-button">Close</button>
            <p>Don't have an account? <a on:click={toggleSignupPopup} id='new-popup'>Sign up here.</a></p>
        </div>
    </div>
</div>

{#if signupPopupVisible}
    <SignupPopup on:close={closeSignupPopup}/>
{/if}

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
