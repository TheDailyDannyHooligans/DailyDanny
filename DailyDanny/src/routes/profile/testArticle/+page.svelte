<div class="profile">
  <a class = "page-buttons" href="/profile/testArticle/all">All articles example</a><br/>
  <a class = "page-buttons" href="/profile/testArticle/topics">Specific topic example</a><br/>
  <a class = "page-buttons" href="/profile/testArticle/individual">Individual example</a><br/>
  <a class = "page-buttons" href="/profile/testArticle/super">Super title example</a><br/>
  <a class = "page-buttons" href="/profile/testArticle/top">Top news example</a><br/>
</div>

<style>
  .profile {
      margin-top: 175px;
  }
  .logout,
  .change-password,
  .page-buttons{
    margin: 1%;
    display: inline-block;
    border: 0.1em solid rgb(77, 77, 77);
    border-radius: 0.5em;
    padding: 0.35em 0.5em;
    color: rgb(0, 0, 0);
    text-decoration: none;
    transition: all 0.2s;
    background: rgb(179, 179, 179)
  }

  .page-buttons:hover {
    cursor: pointer;
    background-color: rgb(54, 135, 160);
    color: white;
  }

  .logout:hover,
  .change-password:hover {
    cursor: pointer;
    background-color: salmon;
    color: white;
  }
</style>