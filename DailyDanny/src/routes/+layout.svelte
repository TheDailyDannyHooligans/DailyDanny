<script>
    import logo from '/images/DailyDannyLogo.png';
</script>

<div id='home-banner' class='banner'>
    <img id='logo' alt= "Site Logo" src={logo}>
    <h1 id='home-title'>THE DAILY DANNY</h1>
    <a href="/" id='profile-btn'>Log in</a>
</div>
<nav id='nav-banner' class='banner'>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/topics/politics">Politics</a></li>
        <li><a href="/topics/sports">Sports</a></li>
        <li><a href="/topics/nature">Nature</a></li>
        <li><a href="/topics/travel">Travel</a></li>
        <li><a href="/topics/medicine">Medicine</a></li>
        <li><a href="/topics/music">Music</a></li>

    </ul>
</nav>
<!-- i did it -->
<style>
    .banner {
    position: fixed;
    z-index: 1;
    display: flex;
    backdrop-filter: blur(10px); /* Apply the blur effect */
    -webkit-backdrop-filter: blur(10px); /* For Safari compatibility */
    }   
    #home-banner {
        top: 0;
        left: 0;
        right: 0;
        height:10%;
        width: 100%;
        align-items: center;
        justify-content: center;
        background-color: rgba(65, 69, 75, 0.7);
    }

    #home-title {
        position: relative;
        text-align: center;
        font-family: 'Lateef';
        font-size: 6em;
        color: rgba(255, 255, 255, .1);
    }

    #logo {
        position: absolute;
        left: 0;
        height: 70%;
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
        background-color: rgba(65, 69, 75, 0.7);
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
        margin-bottom: 1px;
    }

    #nav-banner a{
        color: white;
        text-decoration: none;
        padding: 14px;
        display: block; 
        
    }

    #nav-banner a:hover {
        background-color: rgb(54, 135, 160);
    }

    #nav-banner li{
        float: left;
    }
</style>

<slot></slot>