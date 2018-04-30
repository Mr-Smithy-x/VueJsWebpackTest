<template>
  <div class="skills">

    <form @submit.prevent="updateSkill" class="scrollable" style="padding-bottom: 200px;">
      <div v-if="skill !== undefined" class="article-content container">

        <h3 class="article-help"> Edit Skill </h3>
        <div class="row">

            <div class="article-row col-md-12">

              <label class="padding" content="Title">
                Change Skill
              </label>
              <input class="article-title" type="text" v-validate="'min:3'" name="title" v-model="title"
                     :placeholder="skill.skill">
              <transition name="alert-in" enter-active-class="animated flipInX"
                          leave-active-class="animated flipOutX">

                <p class="alert" v-if="errors.has('title')">{{errors.first('title')}}</p>
              </transition>
            </div>

            <div class="article-row col-md-12">

              <button class="article-btn" type="submit" value="Save">Save</button>

              <button class="article-btn" type="reset" v-on:click="back" value="Back" style="margin-right: 10px">Back
              </button>

            </div>

          </div>

      </div>
    </form>

  </div>

</template>

<script>
export default {
  name: 'Skill',
  data () {
    return {
      'id': this.$route.params.id,
      'skill': undefined,
      'title': ''
    }
  },
  async created () {
    console.log('Loading Content')
    this.skill = (await this.$http.get('https://www.yoprice.co/api/skills/' + this.$route.params.id)).body.data
  },
  methods: {
    back: function () {
      this.$router.go(-1)
    },
    updateSkill () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$http.patch('https://www.yoprice.co/api/skills/' + this.$route.params.id, {
            skill: this.title
          })
            .then((result) => {
              if (result.status) {
                this.$router.go(-1)
              }
            })
        } else {
          console.log('Not valid input')
        }
      })
    }
  }
}
</script>

<style scoped>

  img.article-img {
    width: 100%;
    border-radius: 10px;
  }

  input.article-title {
    width: 100%;
    font-size: 1.1em;

    text-align: left;
    background-color: #ddd;
    color: #323333;
    border-radius: 10px;
    padding: 15px;
    border: 0;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  div.article-row {

    margin-top: 0px;
    margin-bottom: 30px;
  }

  textarea.article-title {
    width: 100%;
    font-size: 1.1em;
    background-color: #ddd;
    color: #323333;
    max-lines: 5;
    text-align: left;
    border-radius: 10px;
    padding: 15px;

    margin-top: 0px;
    margin-bottom: 0px;
    border: 0;
  }

  label.padding {
    width: 100%;
    text-align: left;
  }

  .article-title {
    width: 100%;
  }

  h3.article-help {
    margin: 30px;
  }

  button.article-btn {
    float: right;
    background-color: #2c3e50;
    border-radius: 3px;
    color: #E0EDF4;
    padding: 10px;
    font-size: 1.1em;
    width: 120px;
    cursor: pointer;

  }

  .article {
    width: 100%;
    height: 100%;
    position: fixed;
    justify-content: center;
    justify-items: center;
  }

</style>
