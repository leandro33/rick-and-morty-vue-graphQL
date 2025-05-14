<template>
	<div class="min-h-screen bg-white  text-white font-sans p-4 pb-16">
		<div class="fixed inset-0 bg-rick-theme bg-cover bg-repeat opacity-40 z-1 h-full w-full"></div>
		<div class="relative z-2">
			<h1
				class="text-8xl font-schwifty text-center text-outline mt-4 mb-14 [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000]">
				RICK AND MORTY
			</h1>
			<div class="flex justify-center mb-8">
				<input v-model="name" type="text" placeholder="Search by name..." class="p-3 w-full max-w-md text-black font-semibold text-lg
               bg-white rounded-full shadow-md border-black
               focus:outline-none focus:ring-4 focus:ring-green-300 transition" />
			</div>
			<div class="container mx-auto px-4">
				<div v-if="loading || loadingPagination" class="fixed inset-0 flex items-center justify-center z-50">
					<div
						class="text-4xl font-schwifty text-center text-outline mt-4 mb-14 [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000] animate-pulse">
						Loading...</div>
				</div>
				<div v-else>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div v-for="char in characters" :key="char.id"
							class="bg-green-200 text-black p-4 rounded-lg shadow hover:bg-green-300 transition">
							<router-link :to="`/character/${char.id}`" class="block">
								<img :src="char.image" :alt="char.name" class="w-full h-48 object-cover rounded mb-2" />
								<div class="text-lg font-semibold">{{ char.name }}</div>
								<div class="text-sm">{{ char.species }} - {{ char.status }}</div>
							</router-link>
						</div>
					</div>
					<div v-show="!loadingPagination" class="flex justify-between mt-16 max-w-md mx-auto">
						<button :disabled="!pageInfo.prev" @click="page--"
							class="bg-white font-schwifty text-2xl text-black hover:text-white hover:bg-black transition scale-90 hover:scale-100 px-8 py-4 rounded disabled:opacity-50">Prev</button>
						<button :disabled="!pageInfo.next" @click="page++"
							class="bg-white font-schwifty text-2xl text-black hover:text-white hover:bg-black transition scale-90 hover:scale-100 px-8 py-4 rounded disabled:opacity-50">Next</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<AppFooter />
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import AppFooter from '../components/Footer.vue'

const name = ref('')
const page = ref(1)

const GET_CHARACTERS = gql`
  query ($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info { pages next prev }
      results { id name image status species }
    }
  }
`
const loadingPagination = ref(false)
const { result, loading, refetch } = useQuery(GET_CHARACTERS, () => ({ page: page.value, name: name.value }))

watch([name, page], async () => {
	loadingPagination.value = true
	await refetch()
	loadingPagination.value = false
})

const characters = computed(() => result.value?.characters.results || [])
const pageInfo = computed(() => result.value?.characters.info || {})
</script>