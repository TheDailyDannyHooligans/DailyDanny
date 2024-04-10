<script lang>
    import '/src/lib/sharedStyle.css'
    import CreateUserPopup from '/src/routes/profile/createUser/createUser.svelte';
    import ChangePasswordPopup from '/src/routes/profile/changePassword/changePassword.svelte';
    import LogoutPopup from '/src/routes/profile/logout/logout.svelte';

    let createUserPopupVisible = false;
    let changePasswordPopupVisible = false;
    let logoutPopupVisible = false;

    function toggleCreateUserPopup() {
        createUserPopupVisible = !createUserPopupVisible;
    }

    function toggleChangePasswordPopup() {
        changePasswordPopupVisible = !changePasswordPopupVisible;
    }

    function toggleLogoutPopup() {
        logoutPopupVisible = !logoutPopupVisible;
    }

    function closeCreateUserPopup() {
        createUserPopupVisible = false;
    }

    function closeChangePasswordPopup() {
        changePasswordPopupVisible = false;
    }

    function closeLogoutPopup() {
        logoutPopupVisible = false;
    }
</script>

<div class="profile">
  <a id="create-user" on:click={toggleCreateUserPopup}>Create admin/editor account</a><br/>
  <a href="/profile/viewArticles/all">View all articles</a><br/>
  <a href="/profile/viewArticles/pending">View pending articles</a><br/>
  <a id="change-password" on:click={toggleChangePasswordPopup}>Change your password</a><br/>
  <a id="logout" on:click={toggleLogoutPopup}>Logout</a>
</div>

{#if createUserPopupVisible}
    <CreateUserPopup on:close={closeCreateUserPopup}/>
{/if}
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