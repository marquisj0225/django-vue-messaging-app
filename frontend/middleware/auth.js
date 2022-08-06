export default async function ({ store, redirect }) {
  let user = store.state.auth.user;

  if (!user) {
    try {
      await store.dispatch('auth/LOAD_TOKEN');
      await store
        .dispatch('auth/FETCH_USER')

    } catch (e) {
      console.log(e)
      try {
        await store.dispatch('auth/REFRESH_TOKEN');
        await store
          .dispatch('auth/FETCH_USER')
      } catch (e) {
        // redirect('/login');

      }
    }
  }
}
