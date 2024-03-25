<script lang>
    import { onMount, onDestroy } from 'svelte';
    import '/src/lib/sharedStyle.css'
    import LoginPopup from '/src/routes/login/login.svelte'; 
    import SettingsPopup from '/src/routes/settings/settings.svelte'; 
    import { account, isAdmin, isEditor, isUser } from '/src/routes/account.js';

    let account_id;
    let isAdmin_value;
    let isEditor_value;
    let isUser_value;

	account.subscribe((id) => {
		account_id = id;
	});

    isAdmin.subscribe((value) => {
		isAdmin_value = value;
	});

    isEditor.subscribe((value) => {
		isEditor_value = value;
	});

    isUser.subscribe((value) => {
		isUser_value = value;
	});

    let lastScrollY = 0;
    let bannerTransform = 0;

    let loginPopupVisible = false;
    let settingsPopupVisible = false;  

        function toggleLoginPopup() {
            loginPopupVisible = !loginPopupVisible;
        }

        function toggleSettingsPopup() {
            settingsPopupVisible = !settingsPopupVisible;
        }

        function closeLoginPopup() {
            loginPopupVisible = false;
        }

        function closeSettingsPopup() {
            settingsPopupVisible = false;
        }
    
        
    onMount(() => {
        window.addEventListener('scroll', handleScroll);

        function handleScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && bannerTransform > -100){
            bannerTransform -= 10; // scroll down
        } else if (currentScrollY < lastScrollY && bannerTransform < 0){
            bannerTransform += 10;
        }
        lastScrollY = currentScrollY;  

        document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Scroll to the top of the page
            bannerTransform = 0;
        });
        });

        onDestroy(() => {
        window.removeEventListener('scroll', handleScroll);
        });
    }  
    });
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

<div id='home-banner' class='banner'>
    <a id='logo' href='/'><img alt= "Site Logo" src='/images/DailyDannyLogo.png'></a>
    <h1 id='home-title'><a href="/">THE DAILY DANNY</a></h1>

    {#if account_id == null}
    <a id='profile-btn' on:click={toggleLoginPopup}>Log in</a>
    {/if}
    {#if isAdmin_value}
    <a id='profile-btn' href='/admin'>Profile</a>
    {/if}
    {#if isEditor_value}
    <a id='profile-btn' href='/reporter'>Profile</a>
    {/if}
    {#if isUser_value}
    <a id='profile-btn' href='/user'>Profile</a>
    {/if}

    <a id='settings' on:click={toggleSettingsPopup}><i class="fas fa-cog"></i></a>

</div>


<nav id='nav-banner' class='banner' style="transform: translateY({bannerTransform}px);">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/topics/politics">Politics</a></li>
        <li><a href="/topics/sports">Sports</a></li>
        <li><a href="/topics/nature">Nature</a></li>
        <li><a href="/topics/travel">Travel</a></li>
        <li><a href="/topics/medicine">Medicine</a></li>
        <li><a href="/topics/music">Music</a></li>
        <li><a href="/profile/createArticle">Create Article</a></li>
    </ul>
</nav>
{#if loginPopupVisible}
    <LoginPopup on:close={closeLoginPopup}/>
{/if}
{#if settingsPopupVisible}
    <SettingsPopup on:close={closeSettingsPopup}/>
{/if}



<style>
    .banner {
        position: fixed;
        z-index: 1;
        display: flex;
        backdrop-filter: blur(3px); /* Apply the blur effect */
        -webkit-backdrop-filter: blur(3px); /* For Safari compatibility */
        transition: transform 0.25s ease-out;
    }
    /*Home banner moved to shared css*/

    #home-title {
        position: absolute;
        text-align: center;
        align-self: center;
        font-family: 'Lateef';
        font-size: 5em;
    }
    
    #home-title a {
        text-decoration: none;
        color: rgba(255, 255, 255, .3);
    }

    #logo img{
        position: absolute;
        top: 15px;
        left: 0;
        height: 70%;
        margin: 1px;
    }

    #profile-btn {
        margin-left: 75%;
        display: inline-block;
        border: 0.1em solid white;
        border-radius: 0.12em;
        padding: 0.35em 0.5em;
        color: white;
        box-sizing: border-box;
        text-decoration: none;
        transition: all 0.2s;
    }

    #profile-btn:hover {
        cursor: pointer;
    }

    #settings {
        margin-left: 1%;
        display: inline-block;
        border: 0.1em solid white;
        border-radius: 0.12em;
        padding: 0.35em 0.5em;
        color: white;
        box-sizing: border-box;
        text-decoration: none;
        transition: all 0.2s;
  }

    #settings:hover {
        cursor: pointer;
  }

    #profile-btn:hover {
        background-color: rgb(54, 135, 160);
    }

    #settings:hover {
        background-color: rgb(54, 135, 160);
    }

    #nav-banner {
        top: 100px; 
        left: 0;
        width: 100%;
        height: 50px; 
        background-color: rgba(65, 69, 75, 0.7);
        border-style: solid;
        border-left-style: none;
        border-color: white;
        border-width: 1px;
    }

    #nav-banner ul {
        list-style-type: none;
        height: 50px;
        padding: 0px;
        margin: 0px;
        overflow: hidden;
        display: flex;
        align-items: center;
    }

    #nav-banner a {
        color: white;
        text-decoration: none;
        padding: 1.5vw; 
        
    }

    #nav-banner a:hover {
        background-color: rgb(54, 135, 160);
    }

    #nav-banner li {
        float: left;
    }


    /* Media Query for screens less than 768px wide */
    @media only screen and (max-width: 768px) {
        #home-banner {
            height: 100px;
        }

        #home-title {
            font-size: 1.5em;
        }

        #nav-banner {
            top: 100px;
            height: 50px;
        }

        #logo {
            transform: scale(0.5);
        }

        #nav-banner a{
            transform: scale(0.8);
        }
    }

</style>


<slot></slot>
