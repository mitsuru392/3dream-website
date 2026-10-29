<template>
    <div class="space-y-5">
        <!-- Product preview -->
        <div class="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden bg-gray-100">
            <!-- Each mask image must have a transparent background -->
            <div
                class="color-layer"
                :style="{
                    backgroundColor: topColor,
                    maskImage: 'url(/images/products/top.png)',
                    WebkitMaskImage: 'url(/images/products/top.png)',
                }"
            />

            <div
                class="color-layer"
                :style="{
                    backgroundColor: bottomColor,
                    maskImage: 'url(/images/products/bottom.png)',
                    WebkitMaskImage: 'url(/images/products/bottom.png)',
                }"
            />

            <div
                class="color-layer"
                :style="{
                    backgroundColor: latchColor,
                    maskImage: 'url(/images/products/latch.png)',
                    WebkitMaskImage: 'url(/images/products/latch.png)',
                }"
            />
        </div>

        <!-- Top color -->
        <label class="flex items-center justify-between gap-4">
            <span class="font-medium">Top section</span>
            <input v-model="topColor" type="color" class="h-10 w-14 cursor-pointer" />
        </label>

        <!-- Bottom color -->
        <label class="flex items-center justify-between gap-4">
            <span class="font-medium">Bottom section</span>
            <input v-model="bottomColor" type="color" class="h-10 w-14 cursor-pointer" />
        </label>

        <!-- Latch color -->
        <label class="flex items-center justify-between gap-4">
            <span class="font-medium">Latch</span>
            <input v-model="latchColor" type="color" class="h-10 w-14 cursor-pointer" />
        </label>
    </div>
</template>

<script setup>
import { ref } from "vue";

const topColor = ref("#F4E68B");
const bottomColor = ref("#F5F5F5");
const latchColor = ref("#E6D900");
</script>

<style scoped>
.color-layer {
    position: absolute;
    inset: 0;
    background-size: 100% 100%;
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}
</style>
