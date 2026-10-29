<template>
  <div class=" bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-xl font-bold text-gray-800 mb-6 text-center">3Dream Creations Order Form</h1>

        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Facebook Name <span style="color: red">*</span>
            </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder=""
              required
            />
          </div>

          <button
            type="submit"
            class="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Submit
          </button>
        </form>

        <div v-if="message" class="mt-4 p-3 rounded-lg text-center" :class="messageClass">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: ''
})

const message = ref('')
const messageClass = ref('')

const submitForm = () => {
  if (form.name.trim()) {
    console.log('Form submitted:', form.name)
    message.value = 'Order submitted successfully!'
    messageClass.value = 'bg-green-100 text-green-800'

    setTimeout(() => {
      form.name = ''
      message.value = ''
      messageClass.value = ''
    }, 3000)
  }
}
</script>