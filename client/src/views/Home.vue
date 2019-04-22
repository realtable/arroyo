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
              <input type="text" class="form-control" placeholder="Feed Link" v-model="nextItem" aria-describedby="button-addon" v-on:keyup.enter="addItem">
              <div class="input-group-append">
                <button class="btn btn-outline-info" type="button" id="button-addon" v-on:click="addItem">Add</button>
              </div>
            </div>
            
            <div class="alert alert-danger my-2 p-2 text-left" v-show="!hidden" role="alert">
              <FontAwesomeIcon icon="exclamation-circle" class="mr-2" />{{ errorMessage }}
            </div>
            
            <!-- List of Feeds -->
            <Feed v-for="item in feeds" v-bind:index="feeds.indexOf(item)" v-bind:key="feeds.indexOf(item)" v-bind:item="item"  @remove-signal="removeItem" />
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
        <Card v-for="c in feedData" v-bind:title="c.title" v-bind:link="c.link" v-bind:linkText="c.linkText" v-bind:content="c.content" v-bind:website="c.website" v-bind:websiteLink="c.websiteLink" v-bind:key="feedData.indexOf(c)"/>
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
  /*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
  import Feed from '@/components/Feed.vue'
  import Card from '@/components/Card.vue'
  import Api from '@/services/Api'

  export default {
    name: 'home',
    components: {
      Feed, Card
    },
    methods: {
      addItem() {
        this.hidden = false
        if (this.feeds.includes(this.nextItem)) {
          this.errorMessage = 'Feed has already been added.'
        } else if (this.nextItem == '') {
          this.errorMessage = 'Input box cannot be empty.'
        } else {
          this.feeds.push(this.nextItem)
          this.hidden = true
          this.getFeeds()
        }
        this.nextItem = ''
        localStorage.feeds = JSON.stringify(this.feeds)
      },
      removeItem(val) {
        this.feeds = this.feeds.filter((i) => {
          return this.feeds.indexOf(i) != val
        })
        this.getFeeds()
        localStorage.feeds = JSON.stringify(this.feeds)
      },
      async getFeeds() {
        let res = []
        for (let feed of this.feeds) {
          let json = await Api.fetch(feed)
          console.log(json)
          res.push(...json.data)
        }
        
        // for (let i = res.length - 1; i > 0; i--) {
        //   var j = Math.floor(Math.random() * (i + 1));
        //   [res[i], res[j]] = [res[j], res[i]];
        // }
        this.feedData = res
      }
    },
    data() {
      return {
        nextItem: '',
        feeds: [],
        hidden: true,
        errorMessage: '',
        feedData: []
      }
    },
    mounted() {
      if (localStorage.feeds) {
        this.feeds = JSON.parse(localStorage.feeds);
      }
      this.getFeeds()
    }
  }
</script>
