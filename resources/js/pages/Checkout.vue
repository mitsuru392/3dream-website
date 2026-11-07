<template>
    <div class="min-h-screen bg-gray-50 text-gray-900">
        <!-- HEADER -->
        <header class="sticky top-0 z-30 bg-[#c697e3] shadow-sm">
            <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <a href="/products" class="shrink-0">
                    <img src="/images/logo.png" alt="3Dream Creations" width="1625" height="338" class="h-9 w-auto sm:h-11" />
                </a>

                <a href="/products" class="rounded-lg border border-white/70 bg-white px-4 py-2 font-medium text-gray-900 hover:bg-gray-50">Continue shopping</a>
            </div>
        </header>

        <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <!-- ORDER PLACED -->
            <section v-if="placed" class="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
                <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <svg class="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 class="text-2xl font-bold">Thank you, {{ form.customer_name.split(" ")[0] }}!</h1>
                <p class="mt-2 text-gray-600">We've received your order details.</p>

                <div class="mt-6 rounded-lg bg-gray-50 p-4 text-left text-sm">
                    <p><span class="font-semibold">Shipping:</span> {{ selectedShipping?.label }}</p>
                    <p class="mt-1"><span class="font-semibold">Subtotal:</span> {{ formatPrice(total) }}</p>
                </div>

                <p class="mt-6 text-gray-700">To complete your order, please message us on Facebook for payment.</p>

                <a :href="FACEBOOK_URL" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1877f2] px-6 py-3 font-semibold text-white transition hover:bg-[#166fe0]">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
                    </svg>
                    Message us on Facebook
                </a>

                <div class="mt-6">
                    <a href="/products" class="font-medium text-blue-600 hover:underline">Back to products</a>
                </div>
            </section>

            <!-- EMPTY CART -->
            <section v-else-if="!items.length" class="mx-auto max-w-xl rounded-xl border border-dashed border-gray-300 bg-white px-4 py-16 text-center">
                <h1 class="text-xl font-semibold">Your cart is empty</h1>
                <p class="mt-2 text-gray-500">Add some products before checking out.</p>
                <a href="/products" class="mt-4 inline-block font-medium text-blue-600 hover:underline">Browse products</a>
            </section>

            <!-- CHECKOUT FORM -->
            <template v-else>
                <h1 class="mb-6 text-2xl font-bold">Checkout</h1>

                <form class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]" novalidate @submit.prevent="placeOrder">
                    <div class="space-y-6">
                        <!-- Contact & Delivery -->
                        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 class="mb-4 text-lg font-bold">Contact &amp; Delivery</h2>

                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div class="sm:col-span-2">
                                    <label for="customer_name" class="mb-1 block text-sm font-medium text-gray-700">Full name <span class="text-red-500">*</span></label>
                                    <input id="customer_name" v-model="form.customer_name" type="text" autocomplete="name" :class="inputClass('customer_name')" />
                                    <p v-if="errors.customer_name" class="mt-1 text-sm text-red-600">{{ errors.customer_name }}</p>
                                </div>

                                <div>
                                    <label for="contact_number" class="mb-1 block text-sm font-medium text-gray-700">Contact number <span class="text-red-500">*</span></label>
                                    <input id="contact_number" v-model="form.contact_number" type="tel" autocomplete="tel" placeholder="09XX XXX XXXX" :class="inputClass('contact_number')" />
                                    <p v-if="errors.contact_number" class="mt-1 text-sm text-red-600">{{ errors.contact_number }}</p>
                                </div>

                                <div>
                                    <label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email <span class="font-normal text-gray-400">(optional)</span></label>
                                    <input id="email" v-model="form.email" type="email" autocomplete="email" :class="inputClass('email')" />
                                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                                </div>

                                <div class="sm:col-span-2">
                                    <label for="address" class="mb-1 block text-sm font-medium text-gray-700">Complete address <span class="text-red-500">*</span></label>
                                    <textarea id="address" v-model="form.address" rows="3" autocomplete="street-address" placeholder="House/Unit no., Street, Barangay, City/Municipality, Province, ZIP code (and Country for international orders)" :class="inputClass('address')"></textarea>
                                    <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
                                </div>
                            </div>
                        </section>

                        <!-- Shipping -->
                        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 class="mb-4 text-lg font-bold">Shipping Option <span class="text-red-500">*</span></h2>

                            <fieldset>
                                <legend class="sr-only">Shipping option</legend>

                                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <label
                                        v-for="option in SHIPPING_OPTIONS"
                                        :key="option.value"
                                        :class="['flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors', form.shipping_method === option.value ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:bg-gray-50']"
                                    >
                                        <input v-model="form.shipping_method" type="radio" name="shipping_method" :value="option.value" class="mt-1 h-4 w-4 accent-blue-600" />
                                        <span>
                                            <span class="block font-semibold text-gray-900">{{ option.label }}</span>
                                            <span class="block text-sm text-gray-500">{{ option.description }}</span>
                                        </span>
                                    </label>
                                </div>
                            </fieldset>

                            <p v-if="errors.shipping_method" class="mt-2 text-sm text-red-600">{{ errors.shipping_method }}</p>
                        </section>

                        <!-- Payment -->
                        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 class="mb-2 text-lg font-bold">Payment</h2>
                            <p class="text-gray-600">For payment methods, please message us on Facebook after placing your order.</p>

                            <a :href="FACEBOOK_URL" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-2 font-semibold text-[#1877f2] hover:underline">
                                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
                                </svg>
                                3Dream Creations on Facebook
                            </a>
                        </section>
                    </div>

                    <!-- ORDER SUMMARY -->
                    <aside class="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
                        <h2 class="mb-4 text-lg font-bold">Order Summary</h2>

                        <ul class="divide-y divide-gray-200">
                            <li v-for="item in items" :key="item.key" class="flex gap-3 py-3">
                                <div class="relative h-16 w-16 shrink-0 rounded-lg bg-gray-100">
                                    <img v-if="item.image" :src="item.image" :alt="item.name" class="h-full w-full rounded-lg object-cover" />
                                    <span class="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-700 px-1 text-xs text-white">{{ item.quantity }}</span>
                                </div>

                                <div class="min-w-0 flex-1 text-sm">
                                    <p class="font-semibold text-gray-900">{{ item.name }}</p>
                                    <p v-if="item.variantName" class="text-gray-500">{{ item.variantName }}</p>
                                    <p v-if="optionsText(item.options)" class="text-gray-500">{{ optionsText(item.options) }}</p>
                                    <p v-if="item.notes" class="break-words italic text-gray-500">Notes: {{ item.notes }}</p>
                                </div>

                                <p class="shrink-0 text-sm font-semibold">{{ formatPrice(item.price * item.quantity) }}</p>
                            </li>
                        </ul>

                        <dl class="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Subtotal</dt>
                                <dd class="font-medium">{{ formatPrice(total) }}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Shipping</dt>
                                <dd class="text-gray-500">To be confirmed</dd>
                            </div>
                            <div class="flex justify-between border-t border-gray-200 pt-3 text-base">
                                <dt class="font-bold">Total</dt>
                                <dd class="font-bold">{{ formatPrice(total) }}</dd>
                            </div>
                        </dl>

                        <p class="mt-2 text-xs text-gray-500">Shipping fee will be confirmed when you message us on Facebook.</p>

                        <button type="submit" class="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Place Order</button>
                    </aside>
                </form>
            </template>
        </main>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useCart } from "../stores/cart";

const FACEBOOK_URL = "https://www.facebook.com/3DreamCreationsOfficial";

const SHIPPING_OPTIONS = [
    { value: "lbc", label: "LBC", description: "Nationwide delivery via LBC." },
    { value: "own_rider", label: "Book your own rider", description: "Book a rider (Lalamove, Grab, etc.) to pick up your order." },
    { value: "phlpost", label: "PHLPost", description: "Nationwide and international delivery via PHLPost. For orders outside the Philippines, we'll message you the shipping fee." },
];

const { items, total } = useCart();

const form = reactive({
    customer_name: "",
    contact_number: "",
    email: "",
    address: "",
    shipping_method: "",
});

const errors = reactive({});
const placed = ref(false);

const selectedShipping = computed(() => SHIPPING_OPTIONS.find((option) => option.value === form.shipping_method));

function validate() {
    Object.keys(errors).forEach((key) => delete errors[key]);

    if (!form.customer_name.trim()) errors.customer_name = "Please enter your full name.";

    if (!form.contact_number.trim()) {
        errors.contact_number = "Please enter your contact number.";
    } else if (!/^\+?[0-9\s\-()]{7,25}$/.test(form.contact_number.trim())) {
        errors.contact_number = "Please enter a valid contact number.";
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = "Please enter a valid email or leave it blank.";
    }

    if (!form.address.trim()) errors.address = "Please enter your complete address.";
    if (!form.shipping_method) errors.shipping_method = "Please choose a shipping option.";

    return Object.keys(errors).length === 0;
}

function placeOrder() {
    if (!validate()) {
        // Move to the first field with an error
        const first = document.getElementById(Object.keys(errors)[0]) ?? document.querySelector('input[name="shipping_method"]');
        first?.focus();
        return;
    }

    // TODO: send the order to the server and save it. For now this only shows the confirmation screen;
    // the cart is kept so you can preview checkout again.
    placed.value = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function inputClass(field) {
    return [
        "w-full rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2",
        errors[field] ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-blue-500 focus:ring-blue-100",
    ];
}

function formatPrice(price) {
    return Number(price || 0).toLocaleString("en-PH", { style: "currency", currency: "PHP" });
}

// Warstock colors -> "Top: Red · Bottom: Black · Latch: Yellow"
function optionsText(options) {
    return Object.entries(options ?? {})
        .map(([part, value]) => `${part.charAt(0).toUpperCase() + part.slice(1)}: ${value}`)
        .join(" · ");
}
</script>
