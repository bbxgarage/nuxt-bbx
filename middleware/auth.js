export default function (context) {
  let jwt;

  if (process.server) {
    jwt = context.req.session.jwt
  } else {
    jwt = localStorage.getItem('token')
  }

  if (!jwt) {
    context.redirect('/login')
  } else {
    context.store.commit('SET_TOKEN', jwt)
  }
}