<script setup>
import { ref, computed } from "vue";
import VariantSelector from "./VariantSelector.vue";
import QuantitySelector from "./QuantitySelector.vue";
import { useCart } from "../stores/cart";

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["close", "added"]);

// VARIANTS (first one selected by default)
const variants = computed(() => props.product.variants ?? []);
const selectedVariantId = ref(variants.value[0]?.id ?? null);
const selectedVariant = computed(() => variants.value.find((v) => v.id === selectedVariantId.value) ?? null);
const displayPrice = computed(() => Number(selectedVariant.value?.price ?? props.product.price ?? 0));

// QUANTITY
const quantity = ref(1);

// NOTES
const NOTES_MAX = 500;
const notes = ref("");

// ADD TO CART
const { addItem } = useCart();

function addToCart() {
    addItem({
        productId: props.product.id,
        name: props.product.name,
        image: props.product.image,
        variantId: selectedVariant.value?.id ?? null,
        variantName: selectedVariant.value?.name ?? null,
        price: displayPrice.value,
        quantity: quantity.value,
        notes: notes.value.trim(),
        options: {},
    });

    emit("added", props.product);
}
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-stretch justify-center bg-black/60 md:items-center md:p-4" @click.self="emit('close')">
        <!-- Modal Container -->
        <div class="product-modal-scroll relative flex h-[100dvh] w-full flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain touch-pan-y bg-white shadow-2xl md:h-auto md:max-h-[90dvh] md:max-w-4xl md:rounded-2xl">
            <!-- Close Button -->
            <button
                type="button"
                aria-label="Close modal"
                class="fixed right-4 top-4 z-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-0 text-gray-600 shadow-md transition hover:bg-gray-100 md:absolute md:right-4 md:top-4"
                @click="emit('close')"
            >
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            <div class="grid grid-cols-1 md:h-full md:grid-cols-2 md:items-stretch">
                <!-- Product Image -->
                <div class="product-image flex h-48 shrink-0 items-center justify-center bg-gray-100 p-4 md:h-auto md:items-start md:p-6">
                    <img v-if="product.image" :src="product.image" :alt="product.name" class="h-full max-h-40 w-full rounded-xl object-contain sm:max-h-48 md:max-h-[420px] md:sticky md:top-6" />

                    <div v-else class="text-sm text-gray-400">Product image unavailable</div>
                </div>

                <!-- Product Details -->
                <div class="p-4 sm:p-8">
                    <!-- Category -->
                    <p class="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                        {{ product.category_name || "Product" }}
                    </p>

                    <!-- Product Name -->
                    <h2 class="mb-2 text-2xl font-bold text-gray-900 sm:mb-3 sm:text-3xl">
                        {{ product.name }}
                    </h2>

                    <!-- Price -->
                    <p class="mb-4 text-xl font-bold text-blue-600 sm:mb-5 sm:text-2xl">
                        {{
                            displayPrice.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                            })
                        }}
                    </p>

                    <!-- Description -->
                    <p class="mb-5 text-sm leading-relaxed text-gray-600 sm:mb-6 sm:text-base">
                        {{ product.description || "No product description available." }}
                    </p>

                    <!-- Variant -->

                    <VariantSelector v-model="selectedVariantId" :variants="variants" />


                    <!-- Quantity -->


                    <QuantitySelector v-model="quantity" />

                    <!-- Notes -->

                    <div class="mb-5 sm:mb-6">

                        <label :for="`notes-${product.id}`" class="mb-2 block text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">Notes <span class="font-normal text-gray-500">(optional)</span></label>

                        <textarea :id="`notes-${product.id}`" v-model="notes" rows="3" :maxlength="NOTES_MAX" placeholder="Any special requests for this item?" class="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"></textarea>

                        <p class="mt-1 text-right text-xs text-gray-400">{{ notes.length }}/{{ NOTES_MAX }}</p>

                    </div>


                    <!-- Add to Cart -->
                    <button type="button" class="mb-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700" @click="addToCart">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 767px) {
    .product-modal-scroll {
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        overscroll-behavior-y: contain;
        touch-action: pan-y;
    }
}
</style>
