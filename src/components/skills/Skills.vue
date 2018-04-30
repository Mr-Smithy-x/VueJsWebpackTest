<template>
  <div class="hello">
    <div class="container" style="padding: 0px;">

      <h2 class="header">{{ name }}</h2>
      <form @submit.prevent="addSkill">
        <input type="text" placeholder="Enter a skill you have..." v-model="skill" v-validate="'min:3'"
               name="skill">
        <transition name="alert-in" enter-active-class="animated flipInX"
                    leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('skill')">{{errors.first('skill')}}</p>
        </transition>
      </form>

      <div class="holder">
        <ul>
          <transition-group name="list" enter-active-class="animated bounceInUp"
                            leave-active-class="animated bounceOutDown">
            <li v-for="(data, index) in skills" :key="index">
              {{data.skill}}

              <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>

              <i class="fa fa-edit" v-on:click="edit(index)"></i>
            </li>
          </transition-group>
        </ul>
      </div>

    </div>

    <Pagination v-if="pagination !== null" :total="pagination.total"
                :current="pagination.current_page"
                :limit="5"
                :simple="true"
                :pages="pagination.last_page"
                :name-value="'skills'"></Pagination>

  </div>
</template>

<script>

import Pagination from '../pagination/Pagination'

export default {
  name: 'Skills',
  components: {Pagination},
  data () {
    return {
      name: 'Add 5 Skills',
      btnState: true,
      page: Math.floor(this.$route.query.page) > 0 ? this.$route.query.page : 1,
      skills: [],
      skill: '',
      pagination: null,
      alertObject: {
        alert: true
      }
    }
  },
  async created () {
    console.log('Loading Skill')
    let body = (await this.$http.get('https://www.yoprice.co/api/skills?page=' + this.page)).body
    this.skills = body.data
    this.pagination = body.pagination
  },
  methods: {
    addSkill () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.$http.post('https://www.yoprice.co/api/skills', {
            skill: this.skill
          })
            .then((result) => {
              if (result.status) {
                this.skills.push(result.data.data)
                this.skill = ''
                console.log(result.data.data)
              }
            })
        } else {
          // eslint-disable-next-line no-console
          console.log('Not Valid')
        }
      })
    },
    remove (id) {
      const skill = this.skills[id]
      this.$http.delete('https://www.yoprice.co/api/skills/' + skill.id)
        .then((result) => {
          if (result.status) {
            console.log('Deleted')
            this.skills.splice(id, 1)
          } else {
            console.error(result)
          }
        })
    },
    edit (id) {
      this.$router.push('/skill/' + this.skills[id].id)
    }
  },
  watch: {
    pagination (val) {
      console.log('Pagination Data Changed')
      console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./skill.css" scoped>

</style>
