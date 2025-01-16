<template>
  <div id="app">
    <div class="app-container">
      <div class="logo-wrap">
      <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <FileUpload />
    </div>
  </div>
</template>

<script>
  import FileUpload from './components/FileUpload.vue';

  export default {
    name: 'App',
    components: {
      FileUpload
    }
  };
</script>

<style scoped>
  /* Basic styling for App.vue */
  #app {
    font-family: 'Arial', sans-serif;
    background-color: #f4f7fc; /* Light gray background */
    min-height: 100vh; /* Full height */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-container {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 600px;
  }
  .app-container .logo-wrap {
    text-align: center;
  }
</style>
