<script setup>
import { computed, watch, onMounted, onUnmounted } from "vue";
import WarstockProductModal from "./WarstockProductModal.vue";
import DefaultProductModal from "./DefaultProductModal.vue";

const props = defineProps({
    product: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["close", "added"]);

// Products that get the part color customizer
const isWarstock = computed(() => (props.product?.name ?? "").trim().toLowerCase() === "warstock");

// Lock page scroll while a modal is open
watch(
    () => props.product,
    (product) => {
        document.body.style.overflow = product ? "hidden" : "";
    },
    { immediate: true },
);

// Close on Escape
function onKeydown(event) {
    if (event.key === "Escape" && props.product) {
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
    <template v-if="product">
        <WarstockProductModal v-if="isWarstock" :product="product" @close="emit('close')" @added="emit('added', $event)" />
        <DefaultProductModal v-else :product="product" @close="emit('close')" @added="emit('added', $event)" />
    </template>
</template>
