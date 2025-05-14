<template>
	<div class="min-h-screen bg-white  text-white font-sans p-4 pb-16">
		<div class="fixed inset-0 bg-rick-theme bg-cover bg-repeat opacity-40 z-1 h-full w-full"></div>
		<div class="relative z-2">
			<h1
				class="text-8xl font-schwifty text-center text-outline mt-4 mb-14 [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000]">
				RICK AND MORTY
			</h1>
			<div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50">
				<div
					class="text-4xl font-schwifty text-center text-outline mt-4 mb-14 [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000] animate-pulse">
					Loading...</div>
			</div>
			<div v-else-if="character"
				class="max-w-3xl mx-auto bg-green-200 text-black p-6 rounded-lg shadow cursor-default">
				<div class="flex flex-col md:flex-row items-center gap-4">
					<img :src="character.image" alt="Character Image"
						class="w-40 h-40 rounded-full border-4 border-green-600 shadow-lg" />
					<div
						class="space-y-2 bg-white bg-opacity-90 text-black rounded-lg p-4 w-full shadow-md border border-green-300 backdrop-blur-md">
						<h2 class="text-3xl font-bold text-green-700">{{ character.name }}</h2>
						<p><strong>Status:</strong> {{ character.status }}</p>
						<p><strong>Species:</strong> {{ character.species }}</p>
						<p><strong>Origin:</strong> {{ character.origin.name }}</p>
						<p><strong>Location:</strong> {{ character.location.name }}</p>
					</div>
				</div>
				<div class="mt-6">
					<h3 class="text-xl font-bold mb-2">Episodes</h3>
					<div class="overflow-x-auto">
						<table class="min-w-full mt-2 border-collapse text-sm rounded-lg overflow-hidden shadow-md">
							<thead>
								<tr class="bg-green-600 text-white">
									<th class="p-2 border border-green-800 text-left">Episode Code</th>
									<th class="p-2 border border-green-800 text-left">Name</th>
									<th class="p-2 border border-green-800 text-left">Air Date</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="ep in character.episode" :key="ep.id"
									class="odd:bg-white even:bg-green-50 hover:bg-green-100 transition">
									<td class="p-3 border border-green-800 text-sm text-green-900">{{ ep.episode }}</td>
									<td class="p-3 border border-green-800 text-sm font-medium">{{ ep.name }}</td>
									<td class="p-3 border border-green-800 text-sm text-gray-600">{{ ep.air_date }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div v-show="!loading" class="flex justify-center mt-16 w-full max-w-md mx-auto">
				<router-link :to="`/`"
					class="bg-white font-schwifty text-2xl text-black px-8 py-4 hover:text-white hover:bg-black transition scale-90 hover:scale-100 rounded disabled:opacity-50">Back</router-link>
			</div>
		</div>
	</div>
	<AppFooter />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { computed } from 'vue'
import AppFooter from '../components/Footer.vue'

const route = useRoute()
const id = route.params.id

const GET_CHARACTER = gql`
  query ($id: ID!) {
    character(id: $id) {
      id name image status species origin { name } location { name }
      episode { id name episode air_date }
    }
  }
`
const { result, loading } = useQuery(GET_CHARACTER, { id })
const character = computed(() => result.value?.character)
</script>