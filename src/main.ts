import { createApp, h } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import './index.css'

const apolloClient = new ApolloClient({
	uri: 'https://rickandmortyapi.com/graphql',
	cache: new InMemoryCache(),
})

const app = createApp({
	setup() {
		return () => h(App)
	},
})

app.provide(DefaultApolloClient, apolloClient)
app.use(createRouter({ history: createWebHistory(), routes }))
app.mount('#app')