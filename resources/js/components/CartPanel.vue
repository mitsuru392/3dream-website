<script setup>
import { watch, onMounted, onUnmounted } from "vue";
import { useCart } from "../stores/cart";

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["close"]);

const { items, count, total, updateQuantity, removeItem, clear } = useCart();

function formatPrice(price) {
    return Number(price || 0).toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
    });
}

// Warstock colors -> "Top: Red · Bottom: Black · Latch: Yellow"
function optionsText(options) {
    return Object.entries(options ?? {})
        .map(([part, color]) => `${part.charAt(0).toUpperCase() + part.slice(1)}: ${color}`)
        .join(" · ");
}

// Lock page scroll while open
watch(
    () => props.open,
    (open) => {
        document.body.style.overflow = open ? "hidden" : "";
    },
);

function onKeydown(event) {
    if (event.key === "Escape" && props.open) {
        emit("close");
    }
}

onMounted(() => window.addEventListener("keydown", onKeydown));

onUnmounted(() => {
    window.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
});
</script>

<template>
    <!-- Backdrop -->
    <Transition enter-from-class="opacity-0" enter-active-class="transition duration-200" leave-to-class="opacity-0" leave-active-class="transition duration-200">
        <div v-if="open" class="fixed inset-0 z-50 bg-black/60" @click="emit('close')"></div>
    </Transition>

    <!-- Panel -->
    <Transition enter-from-class="translate-x-full" enter-active-class="transition duration-300 ease-out" leave-to-class="translate-x-full" leave-active-class="transition duration-200 ease-in">
        <aside v-if="open" role="dialog" aria-modal="true" aria-label="Shopping cart" class="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <h2 class="text-lg font-bold text-gray-900">
                    Your Cart
                    <span class="font-normal text-gray-500">({{ count }} {{ count === 1 ? "item" : "items" }})</span>
                </h2>

                <button type="button" aria-label="Close cart" class="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100" @click="emit('close')">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Empty -->
            <div v-if="!items.length" class="flex flex-1 flex-col items-center justify-center px-5 text-center">
                <p class="text-lg font-semibold text-gray-900">Your cart is empty</p>
                <p class="mt-1 text-sm text-gray-500">Add a product to see it here.</p>
                <button type="button" class="mt-4 font-medium text-blue-600 hover:underline" @click="emit('close')">Continue shopping</button>
            </div>

            <!-- Items -->
            <ul v-else class="flex-1 divide-y divide-gray-200 overflow-y-auto overscroll-contain px-5">
                <li v-for="item in items" :key="item.key" class="flex gap-4 py-4">
                    <div class="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img v-if="item.image" :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
                    </div>

                    <div class="flex min-w-0 flex-1 flex-col">
                        <div class="flex items-start justify-between gap-2">
                            <div class="min-w-0">
                                <p class="font-semibold text-gray-900">{{ item.name }}</p>
                                <p v-if="item.variantName" class="text-sm text-gray-500">{{ item.variantName }}</p>
                                <p v-if="optionsText(item.options)" class="text-sm text-gray-500">{{ optionsText(item.options) }}</p>
                                <p v-if="item.notes" class="mt-1 whitespace-pre-line break-words text-sm italic text-gray-500">Notes: {{ item.notes }}</p>
                            </div>

                            <p class="shrink-0 font-semibold text-gray-900">{{ formatPrice(item.price * item.quantity) }}</p>
                        </div>

                        <div class="mt-auto flex items-center justify-between pt-2">
                            <div class="flex items-center rounded-lg border border-gray-300 text-sm">
                                <button type="button" :aria-label="`Decrease quantity of ${item.name}`" :disabled="item.quantity <= 1" class="px-3 py-1 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300" @click="updateQuantity(item.key, item.quantity - 1)">−</button>
                                <span class="min-w-8 border-x border-gray-300 px-2 py-1 text-center" aria-live="polite">{{ item.quantity }}</span>
                                <button type="button" :aria-label="`Increase quantity of ${item.name}`" :disabled="item.quantity >= 99" class="px-3 py-1 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300" @click="updateQuantity(item.key, item.quantity + 1)">+</button>
                            </div>

                            <button type="button" class="text-sm font-medium text-red-600 hover:underline" @click="removeItem(item.key)">Remove</button>
                        </div>
                    </div>
                </li>
            </ul>

            <!-- Footer -->
            <div v-if="items.length" class="border-t border-gray-200 px-5 py-4">
                <div class="mb-4 flex items-center justify-between">
                    <span class="font-semibold text-gray-900">Subtotal</span>
                    <span class="text-lg font-bold text-gray-900">{{ formatPrice(total) }}</span>
                </div>

                <button type="button" disabled class="w-full cursor-not-allowed rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white opacity-70">Checkout</button>

                <button type="button" class="mt-3 w-full text-sm font-medium text-gray-500 hover:text-gray-700 hover:underline" @click="clear">Clear cart</button>
            </div>
        </aside>
    </Transition>
</template>
