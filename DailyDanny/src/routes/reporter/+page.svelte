<script lang>
    import '/src/lib/sharedStyle.css'
    import ChangePasswordPopup from '/src/routes/profile/changePassword/changePassword.svelte';
    import LogoutPopup from '/src/routes/profile/logout/logout.svelte';

    let changePasswordPopupVisible = false;
    let logoutPopupVisible = false;

    function toggleChangePasswordPopup() {
        changePasswordPopupVisible = !changePasswordPopupVisible;
    }

    function toggleLogoutPopup() {
        logoutPopupVisible = !logoutPopupVisible;
    }

    function closeChangePasswordPopup() {
        changePasswordPopupVisible = false;
    }

    function closeLogoutPopup() {
        logoutPopupVisible = false;
    }
</script>

<div class="profile">
  <a class = "prof-buttons" href="/profile/testArticle">Test article</a><br/>
  <a class = "prof-buttons" href="/profile/createArticle">Create article</a><br/>
  <a class = "prof-buttons" href="/profile/viewArticles/all">View articles</a><br/>
  <a class = "prof-buttons" href="/profile/viewArticles/drafts">View drafts</a><br/>
  <a class = "prof-buttons" href="/profile/viewArticles/rejected">View rejected articles</a><br/>
  <a id="change-password" on:click={toggleChangePasswordPopup}>Change your password</a><br/>
  <a id="logout" on:click={toggleLogoutPopup}>Logout</a> <!-- THIS IS A POPOUT FOR CONFIRMATION -->
</div>

{#if changePasswordPopupVisible}
    <ChangePasswordPopup on:close={closeChangePasswordPopup}/>
{/if}
{#if logoutPopupVisible}
  <LogoutPopup on:close={closeLogoutPopup}/>
{/if}

<style>
  .profile {
      margin-top: 175px;
  }

  .prof-buttons{
        margin:1%;
        display: inline-block;
        border: 0.1em solid rgb(0, 0, 0);
        border-radius: 0.12em;
        padding: 0.35em 0.5em;
        color: rgb(0, 0, 0);
        box-sizing: border-box;
        text-decoration: none;
        transition: all 0.2s;
        background: white;
  }
  .prof-buttons:hover{
        background-color:rgb(88, 102, 102);
        color: white;
  }

  #logout,
  #change-password{
        margin:1%;
        display: inline-block;
        border: 0.1em solid rgb(0, 0, 0);
        border-radius: 0.12em;
        padding: 0.35em 0.5em;
        color: rgb(0, 0, 0);
        box-sizing: border-box;
        text-decoration: none;
        transition: all 0.2s;
        background: white;
  }

  #logout:hover,
  #change-password:hover{
        background-color: salmon;
        color: white;
  }
</style>