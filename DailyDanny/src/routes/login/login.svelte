
<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let username = '';
    let password = '';

    function handleLogin() {
        console.log("Logging in with username:", username, "and password:", password);
        username = '';
        password = '';
    }

    function handleCloseLogin() {
        console.log("Closing login popup");
        dispatch('close');
    }
</script>
<div class = "popup-overlay">
    <div class="popup">
        <div class="popup-content">
            <h2>Login</h2>
            <form on:submit|preventDefault={handleLogin}>
                <label for="username">Username:</label>
                <input type="text" id="username" bind:value={username} />
                <label for="password">Password:</label>
                <input type="password" id="password" bind:value={password} />
                <button type="submit" class = "login-button">Login</button>
            </form>
            <button on:click={handleCloseLogin} class = "close-button">Close</button>
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
</style>
