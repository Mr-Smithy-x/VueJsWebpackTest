<template>
  <div class="about">
    <h1>Vue.Js Test</h1>
    <ul>
      <li>Switching Components</li>
      <li>Pagination Component</li>
      <li>Edit Component</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      their_name: this.$route.params.name
    }
  }
}
</script>

<style scoped>

  div.about {
    justify-content: left;
    justify-items: left;
  }

  li {

    list-style-type: none;
  }
</style>
