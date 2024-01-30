<script>
    import logo from '$lib/images/DailyDannyLogo.png';
</script>

<div id='home-banner' class='banner'>
    <img id='logo' alt= "Site Logo" src={logo}>
    <h1 id='home-title'>THE DAILY DANNY</h1>
    <button id='profile-btn'>Login</button>
</div>
<nav id='nav-banner' class='banner'>
    
</nav>

<style>
    .banner {
        position: fixed;
        z-index: 1;
        display: flex;
    }

    #home-banner {
        top: 0;
        left: 0;
        right: 0;
        height:10%;
        width: 100%;
        align-items: center;
        justify-content: center;
        background-color: #41454B;
    }

    #home-title {
        position: relative;
        text-align: center;
        color: white;
        font-family: 'Lateef';
        
    }

    #logo {
        position: absolute;
        left: 0;
        height: 100%;
        margin: 1px;
    }

    #profile-btn {
        position: absolute;
        right: 5%;
    }

    #nav-banner {
        top: 10%;
        left: 0;
        width: 100%;
        height: 5%;
        background-color: #41454B;
        border-style: solid;
        border-left-style: none;
        border-color: white;
        border-width: 1px;
    }
</style>