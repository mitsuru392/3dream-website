<script setup>
const FACEBOOK_URL = "https://www.facebook.com/3DreamCreationsOfficial";
const year = new Date().getFullYear();
</script>

<template>
    <div class="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <!-- HEADER -->
        <header class="bg-[#c697e3] shadow-sm">
            <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <a href="/" class="shrink-0">
                    <img src="/images/logo.png" alt="3Dream Creations" width="1625" height="338" class="h-9 w-auto sm:h-11" />
                </a>

                <a href="/products" class="rounded-lg bg-white px-4 py-2 font-medium text-gray-900 hover:bg-gray-50">Shop</a>
            </div>
        </header>

        <!-- HERO -->
        <main class="flex flex-1 items-center">
            <div class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
                <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Welcome to 3Dream Creations</h1>
                <p class="mt-4 text-lg text-gray-600">3D-printed deckboxes and TCG accessories, made to order.</p>

                <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a href="/products" class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">Shop now</a>
                    <a :href="FACEBOOK_URL" target="_blank" rel="noopener" class="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-50 sm:w-auto">Message us on Facebook</a>
                </div>
            </div>
        </main>

        <!-- FOOTER -->
        <footer class="border-t border-gray-200 py-6 text-center text-sm text-gray-500">© {{ year }} 3Dream Creations</footer>
    </div>
</template>
