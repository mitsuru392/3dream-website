<script setup>
defineProps({
    variants: {
        type: Array,
        default: () => [],
    },
});

const selectedId = defineModel({ type: Number, default: null });
</script>

<template>
    <div v-if="variants.length" class="mb-5 sm:mb-6">
        <p class="mb-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">Variant</p>

        <div class="flex flex-wrap gap-2">
            <button
                v-for="variant in variants"
                :key="variant.id"
                type="button"
                :aria-pressed="selectedId === variant.id"
                :class="['rounded-md border px-3 py-2 text-sm transition-colors', selectedId === variant.id ? 'border-blue-600 bg-blue-50 font-semibold text-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50']"
                @click="selectedId = variant.id"
            >
                {{ variant.name }}
            </button>
        </div>
    </div>
</template>
