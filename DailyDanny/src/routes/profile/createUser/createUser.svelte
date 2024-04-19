
<script>
    import { createEventDispatcher } from 'svelte';
    import LoginPopup from '/src/routes/login/login.svelte'; 
    import axios from 'axios';
    import { account, isAdmin, isEditor, isUser } from '/src/routes/account.js';

    const dispatch = createEventDispatcher();

    // Signup API call
    const API_URL = 'http://localhost:3000/';

    let firstname = '';
    let lastname = '';
    let email = '';
    let password = '';
    let admin = false;
    let reporter = false;

    // if (document.getElementById('admin').checked == true) {
    //     admin = true;
    //     reporter = false;
    // } else if (document.getElementById('reporter').checked == true) {
    //     admin = false;
    //     reporter = true;
    // }


    function updateRole(role) {
        if (role === 'admin') {
            admin = true;
            reporter = false;
        } else if (role === 'reporter') {
            admin = false;
            reporter = true;
        }
    }

    async function handleSignup(event) {
        event.preventDefault();

        console.log

        if (firstname === '') {
            console.error('First name is required');
            document.getElementById('error').innerText = 'First name is required';
            return;
        } else if (lastname === '') {
            console.error('Last name is required');
            document.getElementById('error').innerText = 'Last name is required';
            return;
        } else if (email === '') {
            console.error('Email is required');
            document.getElementById('error').innerText = 'Email is required';
            return;
        } else if (password === '') {
            console.error('Password is required');
            document.getElementById('error').innerText = 'Password is required';
            return;
        } else if (admin === false && reporter === false) {
            console.error('Account type is required');
            document.getElementById('error').innerText = 'Account type is required';
            return;
        }

		try {
			const data = JSON.stringify({
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: password,
				admin: admin,
				editor: reporter,
				user: false
			});

			const response = await axios.post(API_URL+"api/users", data)
			console.log(response);
			console.log(response['config']);
			
			if (response.statusText === "OK") {
				firstname = '';
                lastname = '';
                email = '';
                password = '';

                console.log('User created');
                handleCloseSignup();
			} else {
				console.error(response.statusText);
			}
		} catch(error) {
			console.log(error);
		}
    }


    // Opening and closing of popups
    function handleCloseSignup() {
        console.log("Closing sign up popup");
        dispatch('close');
    }

</script>
<div class = "popup-overlay">
    <div class="popup">
        <div class="popup-content">
            <h2>Create Admin/Reporter</h2>
            <form on:submit={handleSignup}>
                <label for="firstname">First Name:</label>
                <br/>
                <input type="text" id="firstname" bind:value={firstname} />
                <br/>
                <label for="lastname">Last Name:</label>
                <br/>
                <input type="text" id="lastname" bind:value={lastname} />
                <br/>
                <label for="email">Email:</label>
                <br/>
                <input type="text" id="email" bind:value={email} />
                <br/>
                <label for="password">Password:</label>
                <br/>
                <input type="password" id="password" bind:value={password} />
                <br/>
                <label for="type">Account Type:</label>
                <br/>
                <input type="radio" name="type" id="admin" value="admin" onchange={updateRole('admin')}/>
                <label for="admin">Admin</label>
                <input type="radio" name="type" id="reporter" value="reporter" onchange={updateRole('reporter')}/>
                <label for="reporter">Reporter</label>

                <button type="submit" class = "signup-button">Create User</button>
            </form>
            <p id="error"></p>
            <button on:click={handleCloseSignup} class = "close-button">Close</button>
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
