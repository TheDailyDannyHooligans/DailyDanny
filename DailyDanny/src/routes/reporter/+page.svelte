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
  <a href="/profile/createArticle">Create article</a><br/>
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
</style>