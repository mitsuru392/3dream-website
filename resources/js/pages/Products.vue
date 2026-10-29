<template>
    <div class="min-h-screen bg-gray-50 text-gray-900">
        <!-- HEADER -->
        <header class="sticky top-0 z-30 border-b border-gray-200 bg-white">
            <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <button type="button" class="text-xl font-bold tracking-tight" @click="backToProducts">
                    Shop<span class="text-blue-600">Store</span>
                </button>

                <button
                    type="button"
                    class="relative rounded-lg border border-gray-200 px-4 py-2 font-medium hover:bg-gray-50"
                    @click="cartOpen = true"
                >
                    Cart

                    <!-- <span
                        v-if="cartCount > 0"
                        class="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-blue-600 px-1.5 py-0.5 text-xs text-white"
                    >
                        {{ cartCount }}
                    </span> -->
                </button>
            </div>
        </header>

        <main class="mx-aut max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 class="text-2xl font-bold">Our Products</h2>
                    <p class="mt-1 text-sm text-gray-500">
                        {{ filteredProducts.length }}
                        {{ filteredProducts.length === 1 ? "product" : "products" }}
                        found
                    </p>
                </div>
                <div class="flex flex-col gap-3 sm:flex-row">
                    <!-- Search -->
                    <div class="relative sm:w-72">
                        <svg
                            class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.8"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path stroke-linecap="round" d="m16 16 4 4" />
                        </svg>

                        <input
                            v-model="search"
                            type="search"
                            placeholder="Search products..."
                            class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <!-- Category dropdown -->
                    <select
                        v-model="category"
                        class="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                    >
                        <option v-for="item in categories" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Products grouped by category -->
            <template v-if="filteredProducts.length">
                <section v-for="(items, categoryName) in groupedProducts" :key="categoryName" class="mb-10">
                    <!-- Category heading -->
                    <div class="mb-5 flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
                            {{ categoryName }}
                        </h2>

                        <span class="text-sm text-gray-500"> </span>
                    </div>
                    <!-- Product cards -->
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <article
                            v-for="product in products"
                            :key="product.id"
                            class="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <button
                                class="block w-full overflow-hidden bg-gray-100"
                                :aria-label="'View ' + product.name"
                                @click="openProductModal(product)"
                            >
                                <img
                                    :src="product.image"
                                    :alt="product.name"
                                    loading="lazy"
                                    class="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            </button>
                            <div class="p-4">
                                <p class="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    {{ categoryName }}
                                </p>
                                <button
                                    class="mb-2 text-left text-lg font-semibold hover:text-blue-600"
                                    @click="selectedProduct = product"
                                >
                                    {{ product.name }}
                                </button>
                                <div class="mb-4 flex items-center justify-between gap-2">
                                    <span class="text-lg font-bold">
                                        {{ formatPrice(product.price) }}
                                    </span>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </template>
            <!-- No results -->
            <div v-else class="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-16 text-center">
                <h3 class="text-lg font-semibold">No products found</h3>

                <p class="mt-2 text-gray-500">Try another search term or category.</p>

                <button
                    class="mt-4 font-medium text-blue-600 hover:underline"
                    @click="
                        search = '';
                        category = 'All Categories';
                    "
                >
                    Clear filters
                </button>
            </div>
            <ProductModal :product="selectedProduct" @close="closeProductModal" />
        </main>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import ProductModal from "../components/ProductModal.vue";

const search = ref("");
const category = ref(0);
const categories = ref([]);
const products = ref([]);
const selectedProduct = ref(null);

//ONLOAD
onMounted(async () => {
    //CATEGORIES
    try {
        const response = await fetch("/categories");
        if (!response.ok) {
            throw new Error("Failed to load categories");
        }
        const data = await response.json();
        categories.value = data;
        categories.value.unshift({ id: 0, name: "All Categories" });
    } catch (err) {
        err.value = err.message;
    }

    //PRODUCT
    try {
        const response = await fetch("/product-list");
        if (!response.ok) {
            throw new Error("Failed to load product list");
        }
        const data = await response.json();
        products.value = data;
    } catch (err) {
        err.value = err.message;
    }
});

const filteredProducts = computed(() => {
    const term = search.value.trim().toLowerCase();
    return products.value.filter((product) => {
        const matchesSearch = (product.name ?? "").toLowerCase().includes(term);
        console.log(products);
        const matchesCategory = category.value === 0 || Number(product.category_id) === Number(category.value);
        return matchesSearch && matchesCategory;
    });
});

const groupedProducts = computed(() => {
    const groups = {};

    categories.value.forEach((category) => {
        const items = filteredProducts.value.filter((product) => Number(product.category_id) === Number(category.id));

        if (items.length > 0) {
            groups[category.name] = items;
        }
    });
    return groups;
});

function openProductModal(product) {
    selectedProduct.value = product;
}

function closeProductModal() {
    selectedProduct.value = null;
}

function formatPrice(price) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(price);
}
</script>
