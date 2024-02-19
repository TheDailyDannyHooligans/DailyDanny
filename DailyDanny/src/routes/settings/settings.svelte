<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let switchOn = false;

    function toggleSwitch() {
        switchOn = !switchOn;
        console.log("Dark-mode: ", switchOn)
        if (typeof window !== "undefined") {
            const body = document.body;
            if (switchOn) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        }
    }

    function handleClose() {
        dispatch('close');
    }
</script>

<div class="popup-overlay">
    <div class="popup">
        <div class="popup-content">
            <h2>Settings</h2>
            <div class="setting-row">
                <div class="switch-container">
                    <span class="slider" class:active={switchOn} on:click={toggleSwitch}></span>
                    <h4>Dark Mode</h4>
                </div>
            </div>
            <button class = "close-button" on:click={handleClose}>Close</button>
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
        color : #ffffff;
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

    .switch-container {
        display: flex;
        align-items: center; 
        justify-content: space-between;
        margin-bottom: 20px;

    }

    .slider {
        position: relative;
        cursor: pointer;
        display: inline-block;
        height: 34px;
        width: 60px;
        background-color: #7b7bde;
        transition: .4s;
        border-radius: 34px;
        margin-right: 20px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        top: 4px;
        background-color: rgb(255, 254, 254);
        transition: .4s;
        border-radius: 50%;
    }

    .slider.active {
        background-color: rgb(0, 0, 0);
    }

    .slider.active:before {
        transform: translateX(26px);
    }

    .close-button {
        margin-top: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #5d6063;
        color: white;
        cursor: pointer;
        border: 0.1em solid white;
    }

    .close-button:hover {
        background-color: rgb(54, 135, 160);
    }
</style>
