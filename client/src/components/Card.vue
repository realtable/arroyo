<template>
  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 border border-white">
    <div class="card my-2">
      <div class="card-body pb-2">
        <h5 class="card-title">{{ title }}</h5>
        <h6><a :href="link" target="_blank" class="text-muted">{{ linkText }} <FontAwesomeIcon icon="external-link-alt" class="external my-auto" /></a></h6>
        <p class="card-text text-left">{{ content }}</p>
      </div>
      <div class="card-footer text-muted">
        <div class="row">
          <div id="webtitle" class="col-6 text-left" :title="website">
            {{ website }}
          </div>
          <div class="col-6 text-right">
            {{ fuzzyTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .external {
    font-size: 0.75em;
  }
  
  #webtitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 100%;
  }
</style>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    link: String,
    linkText: String,
    content: String,
    website: String,
    fuzzyTime: String
  }
}
</script>
