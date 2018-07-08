<template>
  <v-container>
    <v-layout align-content-center justify-center row wrap>
      <v-flex>
        <v-card>
          <v-card-text>

            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="6"
                label="Password"
                autocomplete="off"
                :append-icon="toggleView ? 'visibility_off' : 'visibility'"
                :type="toggleView ? 'text' : 'password'"
                @click:append="toggleView = !toggleView"
                required
              ></v-text-field>
              <v-checkbox
                v-model="login"
                label="Is Log-in"
              ></v-checkbox>

              <v-alert
                :value="message"
                type="error"
              >
                {{message}}
              </v-alert>
              
              <v-btn
                :disabled="!valid"
                @click="submit"
              >
                submit
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      email: 'lucasfontesgaspareto@gmail.com',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      phone: '',
      password: 'c7db9db',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && (v.length >= 6)) || 'Phone must be more or equal than 6 characters'
      ],
      toggleView: true,
      message: '',
      login: true
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          this.$axios.post(`/api/v1/users${this.login? '/login': ''}`, {
            email: this.email,
            password: this.password
          }).then(res => {
            this.$store.commit('SET_TOKEN', res.data.token)
          }).catch(error => {
            this.message = error.response.data.error
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>