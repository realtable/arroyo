<template>
  <div id="app">
    <!-- Navbar -->
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Arroyo</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link to="/"><a class="p-2 text-dark">Home</a></router-link>
        <router-link to="/about"><a class="p-2 text-dark">About</a></router-link>
      </nav>
    </div>
    
    <router-view/>
    
    <!-- Go To Top -->
    <div class="go-to-top text-right pr-3 pb-2" alt="Go to top">
      <a href="#app"><FontAwesomeIcon icon="chevron-up" /></a>
    </div>
    
    <!-- Footer -->
    <footer class="text-muted">
      <div class="container">
        <hr />
        <p class="text-center">
          Made with <a class="heart">❤</a> in Australia
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.heart {
  color: #c0392b !important;
}

.go-to-top {
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 1.5em;
}

.go-to-top > a {
  color: #666;
}

.go-to-top > a:hover {
  color: #444;
}
</style>
