<template>
    <div class="listfeed">

        <div class="container-fluid">
            <div class="row">

                <div class="col-lg-4 col-sm-12 col-xs-12 option">

                    <form @submit.prevent="searchArticle" style="margin-bottom: 20px;">
                        <input class="media-input" placeholder="Search Article" v-model="query" v-validate="'min:3'"
                               name="query"/>

                        <transition name="alert-in" enter-active-class="animated flipInX"
                                    leave-active-class="animated flipOutX">
                            <p class="alert" v-if="errors.has('query')">{{errors.first('query')}}</p>
                        </transition>
                    </form>

                    <div class="sources">

                        <div style="margin-bottom: 20px">
                            <label class="label">
                                <p>Select a news source</p>
                                <select class="selector" name="source" v-model="source">
                                    <option value="the-new-york-times">The New York Times</option>
                                    <option value="cnn">CNN</option>
                                    <option value="abc-news">ABC</option>
                                    <option value="msnbc">MSNBC</option>
                                    <option value="usa-today">USA Today</option>
                                </select>
                            </label>

                        </div>

                        <div>
                            <label class="label">
                                <p>Select a language</p>
                                <select class="selector" name="language" v-model="language">
                                    <option value="en">English</option>
                                    <option value="es">Espanol</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                </select>
                            </label>

                        </div>

                    </div>

                </div>

                <div class="col-lg-8 col-sm-12 col-xs-12">

                    <ul class="media-list" style="margin-left: 0px; padding-left: 0px;">

                        <transition-group name="list" enter-active-class="animated bounceInUp"
                                          leave-active-class="animated bounceOutDown">

                            <li class="media" v-for="(article, index) in articles[page-1]" :key="index">
                                <div class="media-left">
                                    <a v-bind:href="article.url" target="_blank">
                                        <img class="media-object" v-bind:src="article.urlToImage"/>
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">
                                        <a v-bind:href="article.url" target="_blank">
                                            {{article.title}}
                                        </a>
                                    </h4>

                                    <h5>
                                        <i>by {{article.author}}</i>
                                    </h5>

                                    <p class="media-desc">{{article.description}}</p>
                                </div>

                                <router-link :to="{ name: 'article',params: {id: article.id}}"><i
                                        class="fa fa-edit"></i></router-link>
                            </li>
                        </transition-group>
                    </ul>

                </div>

            </div>
        </div>

        <Pagination v-if="query === undefined || query.length === 0" :total="total" :current="page" :limit="20"
                    :pages="pages" :query="query" :name-value="'list_page'"/>
        <Pagination v-else-if="query.length > 0" :total="total" :current="page" :limit="20" :pages="pages"
                    :query="query" :name-value="'list_query_page'"/>

    </div>

</template>

<script>
/* eslint-disable no-console */

import Pagination from '../pagination/Pagination'

export default {
  name: 'ListFeed',
  components: {Pagination},
  data () {
    return {
      articles: [],
      query: this.$route.params.query,
      page: Math.floor(this.$route.params.page) > 0 ? Math.floor(this.$route.params.page) : 1,
      total: 0,
      pages: 0,
      source: 'the-new-york-times',
      language: 'en'
    }
  },
  methods: {

    searchArticle () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.page = 1
          this.updateSource(this.query)
        } else {
          console.log('Search Query to short')
        }
      })
    },
    updateSource: function (query = '') {
      this.articles.length = 0
      if (query.length > 0) {
        this.$http.get('https://www.yoprice.co/api/news/news?q=' + query + '&language=' + this.language + '&sources=' + this.source + '&page=' + this.page.toString())
          .then(response => {
            console.log(response.data.pagination)
            console.log(response.data)

            this.total = response.data.pagination.total
            this.pages = response.data.pagination.pages
            this.articles[this.page - 1] = (response.data.articles)
          })
      } else {
        this.$http.get('https://www.yoprice.co/api/news/news?sources=' + this.source + '&language=' + this.language + '&page=' + this.page.toString())
          .then(response => {
            this.total = response.data.pagination.total
            this.pages = response.data.pagination.pages
            this.articles[this.page - 1] = (response.data.articles)
          })
      }
    }
  },
  created: function () {
    this.updateSource(this.$route.params.query)
  },
  watch: {

    query: function (query) {
      if (query.length === 0) {
        this.page = 1
        this.updateSource(query)
      }
    },

    language: function (val) {
      console.log(val)
    },

    source: function (val) {
      console.log(val)
      // this.updateSource(val);
      // this.page++;
    },
    page: function (page) {
      if (page > 0) {
        this.page = 1
        this.updateSource(this.query)
      }
    }
  }

}
</script>

<style src="./feed.css" scoped>

</style>
