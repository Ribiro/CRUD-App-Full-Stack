<template>
  <div class="container mt-4">
    <!-- title  -->
    <h1 class="title center-heading">
      <span>Icon </span>
      Phone Book App
    </h1>
    <!-- end of title  -->

    <!-- subtitle and add button  -->
    <div class="columns is-mobile mt-4">
      <div class="column is-half">
        <h2 class="subtitle">Contacts</h2>
      </div>
      <div class="column is-half has-text-right">
        <button class="button is-link">Add Contact</button>
      </div>
    </div>
    <!-- end of subtitle and add button  -->

    <!-- search bar -->
    <div class="field mt-4">
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Search for contact by last name ...">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
    <!-- end of search bar  -->

    <!-- card -->
    <div class="card mt-4">
      <div class="card-content">
        <div class="columns is-mobile">
          <div class="column is-two-thirds">
            <div>
              <h1 class="subtitle">Contact Name</h1>
            </div>
            <div class="mt-2">
              <h1>+254712353637</h1>
            </div>
          </div>
          <div class="column is-one-third has-text-right">
            <span>
              <button class="button is-info">
                Update
              </button>
            </span>
            <span class="ml-2">
              <button class="button is-danger">Delete</button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- end of card -->
  </div>
</template>

<style>
@import 'bulma/css/bulma.min.css';
@import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

.container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.center-heading {
  text-align: center;
}
</style>