<script>
    import logo from '$lib/images/DailyDannyLogo.png';
</script>

<div id='home-banner' class='banner'>
    <img id='logo' alt= "Site Logo" src={logo}>
    <h1 id='home-title'>THE DAILY DANNY</h1>
    <a href="/" id='profile-btn'>Log in</a>
</div>
<nav id='nav-banner' class='banner'>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/topics/art">Art</a></li>
        <li><a href="/topics/sports">Sports</a></li>
    </ul>
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
        background-color: rgb(54, 135, 160);
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

    #nav-banner ul {
        list-style-type: none;
        padding: 0px;
        margin: 0px;
        overflow: hidden;
    }

    #nav-banner a{
        color: white;
        text-decoration: none;
        padding: 15px;
        display: block;
        text-align: center;
    }

    #nav-banner a:hover {
        background-color: rgb(54, 135, 160);
    }

    #nav-banner li{
        float: left;
    }
</style>

<slot></slot>