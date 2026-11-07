<script setup>
const props = defineProps({
    min: {
        type: Number,
        default: 1,
    },
    max: {
        type: Number,
        default: 99,
    },
});

const quantity = defineModel({ type: Number, default: 1 });

function clamp(value) {
    const number = Math.floor(Number(value));
    if (Number.isNaN(number)) return props.min;
    return Math.min(props.max, Math.max(props.min, number));
}

function decrease() {
    quantity.value = clamp(quantity.value - 1);
}

function increase() {
    quantity.value = clamp(quantity.value + 1);
}

function onInput(event) {
    // Allow the field to be empty while typing; fix it up on blur
    if (event.target.value === "") return;
    quantity.value = clamp(event.target.value);
    event.target.value = quantity.value;
}

function onBlur(event) {
    quantity.value = clamp(event.target.value);
    event.target.value = quantity.value;
}
</script>

<template>
    <div class="mb-5 sm:mb-6">
        <p class="mb-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">Quantity</p>

        <div class="flex w-fit items-center rounded-lg border border-gray-300">
            <button type="button" aria-label="Decrease quantity" :disabled="quantity <= min" class="px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent" @click="decrease">−</button>

            <input
                :value="quantity"
                type="number"
                inputmode="numeric"
                :min="min"
                :max="max"
                aria-label="Quantity"
                class="w-14 border-x border-gray-300 py-2 text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                @input="onInput"
                @blur="onBlur"
            />

            <button type="button" aria-label="Increase quantity" :disabled="quantity >= max" class="px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent" @click="increase">+</button>
        </div>
    </div>
</template>
