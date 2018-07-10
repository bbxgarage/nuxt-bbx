<template>
  <div>{{user}}</div>
</template>

<script>
export default {
  middleware: [ 'auth' ],
  
  async asyncData(context) {
    let data = {}

    try {
      data = await context.$axios.get('api/v1/users', {
        headers: {
          'Authorization': context.store.state.token
        }
      })
    } catch (error) {
      console.log(error.message, error.code)
    }

    return {
      user: data.data.user
    }
  }
}
</script>

