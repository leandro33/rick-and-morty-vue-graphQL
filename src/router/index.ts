import CharacterList from '../pages/CharacterList.vue'
import CharacterDetail from '../pages/CharacterDetail.vue'

export default [
  { path: '/', component: CharacterList },
  { path: '/character/:id', component: CharacterDetail },
]