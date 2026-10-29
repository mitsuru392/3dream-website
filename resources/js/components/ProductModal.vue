<script setup>
import { ref, computed, onMounted } from "vue";
defineProps({
    product: {
        type: Object,
        default: null,
    },
});

defineEmits(["close"]);
</script>

<template>
    <div
        v-if="product"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        @click.self="$emit('close')"
    >
        <div class="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <!-- Close button -->
            <button
                type="button"
                class="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl text-gray-600 shadow hover:bg-gray-100"
                aria-label="Close modal"
                @click="$emit('close')"
            >
                &times;
            </button>

            <div class="grid grid-cols-1 md:grid-cols-2">
                <!-- Product image -->
                <div class="flex min-h-80 items-center justify-center bg-gray-100 p-6">
                    <img
                        :src="product.image"
                        :alt="product.name"
                        class="max-h-[420px] w-full rounded-xl object-contain"
                    />
                </div>

                <!-- Product details -->
                <div class="p-6 sm:p-8">
                    <p class="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                        {{ product.category_name || "Product" }}
                    </p>

                    <h2 class="mb-3 text-3xl font-bold text-gray-900">
                        {{ product.name }}
                    </h2>

                    <p class="mb-5 text-2xl font-bold text-blue-600">
                        {{
                            Number(product.price || 0).toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                            })
                        }}
                    </p>

                    <p class="mb-6 leading-relaxed text-gray-600">
                        {{ product.description || "No product description available." }}
                    </p>

                    <!-- Color options: visual only -->
                    <div class="mb-6">
                        <p class="mb-3 font-semibold text-gray-900">
                            Color: <span class="font-normal text-gray-500">Black</span>
                        </p>

                        <div class="flex gap-3">
                            <button
                                type="button"
                                aria-label="Black"
                                class="h-8 w-8 rounded-full border-2 border-blue-600 bg-black ring-2 ring-blue-200"
                            ></button>
                            <button
                                type="button"
                                aria-label="White"
                                class="h-8 w-8 rounded-full border border-gray-300 bg-white"
                            ></button>
                            <button
                                type="button"
                                aria-label="Blue"
                                class="h-8 w-8 rounded-full border border-gray-300 bg-blue-500"
                            ></button>
                            <button
                                type="button"
                                aria-label="Gray"
                                class="h-8 w-8 rounded-full border border-gray-300 bg-gray-400"
                            ></button>
                        </div>
                    </div>

                    <!-- Quantity: visual only -->
                    <div class="mb-6">
                        <p class="mb-3 font-semibold text-gray-900">Quantity</p>

                        <div class="flex w-fit items-center rounded-lg border border-gray-300">
                            <button type="button" disabled class="px-4 py-2 text-gray-400">−</button>
                            <span class="border-x border-gray-300 px-5 py-2">1</span>
                            <button type="button" disabled class="px-4 py-2 text-gray-400">+</button>
                        </div>
                    </div>

                    <p class="mb-5 text-sm text-gray-500">{{ product.stock ?? 0 }} items in stock</p>

                    <!-- Button: visual only -->
                    <button
                        type="button"
                        disabled
                        class="w-full cursor-not-allowed rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white opacity-70"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
