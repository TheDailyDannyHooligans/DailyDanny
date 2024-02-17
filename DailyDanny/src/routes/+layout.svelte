<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<div id='home-banner' class='banner'>
    <img id='logo' alt= "Site Logo" src='/images/DailyDannyLogo.png'>
    <h1 id='home-title'>THE DAILY DANNY</h1>
    <a href="/" id='profile-btn'>Log in</a>

    <!--Example of a reactive button working--->
    <button on:click={handleClick}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

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

<style>
    .banner {
        position: fixed;
        z-index: 1;
        display: flex;
        backdrop-filter: blur(3px); /* Apply the blur effect */
        -webkit-backdrop-filter: blur(3px); /* For Safari compatibility */
    }

    #home-banner {
        top: 0;
        left: 0;
        right: 0;
        height: 100px; 
        width: 100%;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to top, rgba(65, 69, 75, 0.7), #bacadd);
    }

    #home-title {
        position: relative;
        text-align: center;
        font-family: 'Lateef';
        font-size: 5em; 
        color: rgba(255, 255, 255, .3);
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
        padding: 0px;
        margin: 0px;
        overflow: hidden;
        align-self: center;
    }

    #nav-banner a {
        color: white;
        text-decoration: none;
        padding: 1.5vw;
        display: block;
        
    }

    #nav-banner a:hover {
        background-color: rgb(54, 135, 160);
    }

    #nav-banner li {
        float: left;
    }

    .nav--hidden {
        transform: translateY(-50px);
        box-shadow: none;
    }

    /* Media Query for screens less than 768px wide */
    @media only screen and (max-width: 768px) {
        #home-banner {
            height: 100px;
        }

        #home-title {
            font-size: 2em;
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
