<template>

  <div class="pagination">
    <transition name="alert-in" enter-active-class="animated flipInX"
                leave-active-class="animated flipOutX">

      <ul class="pagination" v-if="simple === undefined || simple === false">
        <li v-if="current-1>0">
          <router-link :to="{name: nameValue ,params: {page: current-1, query: query}}">Previous</router-link>
        </li>
        <li v-else>
          Previous
        </li>

        <li v-if="current-1>0">
          <router-link :to="{ name: nameValue,params: {page: current-1, query: query}}">{{current-1}}
          </router-link>
        </li>
        <li v-if="current>0">
          {{current}}
        </li>
        <li v-if="current+1<pages">
          <router-link :to="{ name: nameValue,params: {page: current+1, query: query}}">{{current+1}}
          </router-link>
        </li>
        <li v-if="current+2<pages">
          <router-link :to="{ name: nameValue,params: {page: current+2, query: query}}">{{current+2}}
          </router-link>
        </li>
        <li>
          ...
        </li>
        <li>
          <router-link :to="{ name: nameValue, params: {page: pages, query: query}}">{{pages}}</router-link>
        </li>
        <li v-if="current+1<pages">
          <router-link :to="{name: nameValue,params: {page: current+1, query: query}}">Next</router-link>
        </li>
        <li v-else>
          Next
        </li>
      </ul>
      <ul class="pagination" v-if="simple">
        <li v-if="current-1>0">
          <router-link :to="{name: nameValue ,query: {page: current-1, query: query}}">Previous</router-link>
        </li>
        <li v-else>
          Previous
        </li>
        <li v-if="current-2>0">
          <router-link :to="{ name: nameValue,query: {page: current-1, query: query}}">{{current-2}}
          </router-link>
        </li>
        <li v-if="current-1>0">
          <router-link :to="{ name: nameValue,query: {page: current-1, query: query}}">{{current-1}}
          </router-link>
        </li>
        <li v-if="current>0">
          {{current}}
        </li>
        <li v-if="current+1<pages">
          <router-link :to="{ name: nameValue,query: {page: current+1, query: query}}">{{current+1}}
          </router-link>
        </li>
        <li v-if="current+2<pages">
          <router-link :to="{ name: nameValue,query: {page: current+2, query: query}}">{{current+2}}
          </router-link>
        </li>
        <li v-if="current+3<pages">
          ...
        </li>
        <li  v-if="current+1<pages">
          <router-link :to="{ name: nameValue, query: {page: pages, query: query}}">{{pages}}</router-link>
        </li>
        <li v-if="current+1<=pages">
          <router-link :to="{name: nameValue,query: {page: current+1, query: query}}">Next</router-link>
        </li>
        <li v-else>
          Next
        </li>
      </ul>

    </transition>

  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total', 'current', 'limit', 'pages', 'query', 'nameValue', 'simple'],
  created () {
    console.log(this.nameValue)
  }
}
</script>

<style scoped>

  div.pagination {
    bottom: 0;
    width: 100%;
    justify-content: center;
    z-index: 50000;
    position: fixed;
  }

  ul.pagination {
    margin-top: 20px;
    display: inline;
    background-color: #fff;
    padding: 10px;

  }

  ul.pagination li {
    display: inline;
    padding: 20px;
  }
</style>
