<template>
  <div class="home">
    <!-- Feed Modal -->
    <div class="modal fade" id="editFeeds" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Edit Feeds</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="hidden = true">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div class="modal-body">
            <!-- Feed Input -->
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Feed Link" v-model="nextItem" aria-describedby="button-addon">
              <div class="input-group-append">
                <button class="btn btn-outline-info" type="button" id="button-addon" v-on:click="addItem">Add</button>
              </div>
            </div>
            
            <div class="alert alert-danger my-2 p-2 text-left" v-show="!hidden" role="alert">
              <FontAwesomeIcon icon="exclamation-circle" class="mr-2" />{{ errorMessage }}
            </div>
            
            <!-- List of Feeds -->
            <Feed v-for="item in feeds" v-bind:index="feeds.indexOf(item)" v-bind:item="item" @remove-signal="removeItem" />
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="hidden = true">Close</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Title -->
    <div class="p-2 mt-5 mb-2 mx-auto text-center" style="width: 70%;">
      <h1 class="display-4">Arroyo</h1>
    </div>
    
    <div class="container text-center">
      <!-- Modal Opener -->
      <button type="button" class="btn btn-outline-primary m-3" id="toggleModal" data-toggle="modal" data-target="#editFeeds">
        Edit Feeds
      </button>
      
      <!-- Cards -->
      <div class="row my-3">
        <Card title="Lorem Ipsum" link="https://www.example.com" linkText="www.example.com" content="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ut justo sollicitudin, efficitur est ac, consequat nunc. Proin et malesuada lacus. Praesent non elit vel est iaculis tincidunt ..." />
        <Card title="Dolor Sit Amet" link="https://www.example.com" linkText="www.example.com" content="Vestibulum ac fringilla lectus. Donec faucibus urna mauris, a elementum arcu volutpat id. Nulla ullamcorper vitae eros eu euismod. Nunc ipsum sem, vulputate at ex quis, vestibulum suscipit turpis. Suspendisse elementum ..." />
        <Card title="Consectetur" link="https://www.example.com" linkText="www.example.com" content="Convallis volutpat magna nunc nec ligula. Nulla nec lobortis felis, et suscipit elit. Maecenas laoreet leo sed augue suscipit, ac viverra ante porta. Cras cursus massa neque, vel consequat arcu tempus vel. Donec mattis ..." />
        <Card title="Adipiscing Elit" link="https://www.example.com" linkText="www.example.com" content="Ut vehicula sit amet orci sed blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Aliquam facilisis porttitor sapien sed cursus ..." />
      </div>
    </div>
  </div>
</template>

<style>
  #toggleModal {
    width: 50%;
    /* border-style: dashed; */
  }
</style>

<script>
  import Feed from '@/components/Feed.vue'
  import Card from '@/components/Card.vue'

  export default {
    name: 'home',
    components: {
      Feed, Card
    },
    methods: {
      addItem() {
        if (this.feeds.includes(this.nextItem)) {
          this.hidden = false
          this.errorMessage = 'Feed has already been added.'
        } else if (this.nextItem == '') {
          this.hidden = false
          this.errorMessage = 'Input box cannot be empty.'
        } else {
          this.feeds.push(this.nextItem)
          this.hidden = true
        }
        this.nextItem = ''
        localStorage.feeds = JSON.stringify(this.feeds)
      },
      removeItem(val) {
        console.log(typeof(this.feeds))
        this.feeds = this.feeds.filter((i) => {
          return this.feeds.indexOf(i) != val
        })
        localStorage.feeds = JSON.stringify(this.feeds)
      }
    },
    data() {
      return {
        nextItem: '',
        feeds: [],
        hidden: true,
        errorMessage: ''
      }
    },
    created() {
      if (localStorage.feeds) {
        this.feeds = JSON.parse(localStorage.feeds);
      }
    },
  }
</script>
