import { reactive, computed, watch } from "vue";

const STORAGE_KEY = "3dream-cart";

function load() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

// Shared cart state (one instance for the whole app)
const items = reactive(load());

watch(
    items,
    (value) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        } catch {
            // Storage unavailable (private mode, etc.) - cart still works for this visit
        }
    },
    { deep: true },
);

// Same product + variant + options + notes = same cart line
function lineKey(item) {
    return JSON.stringify([item.productId, item.variantId ?? null, item.options ?? {}, item.notes ?? ""]);
}

/**
 * Add an item to the cart. If an identical line exists, its quantity is increased.
 * item: { productId, name, image, variantId, variantName, price, quantity, options, notes }
 */
function addItem(item) {
    const key = lineKey(item);
    const existing = items.find((line) => line.key === key);

    if (existing) {
        existing.quantity += item.quantity;
    } else {
        items.push({ ...item, key });
    }
}

function updateQuantity(key, quantity) {
    const line = items.find((item) => item.key === key);
    if (!line) return;

    const value = Math.floor(Number(quantity));
    if (Number.isNaN(value) || value < 1) return;

    line.quantity = Math.min(99, value);
}

function removeItem(key) {
    const index = items.findIndex((line) => line.key === key);
    if (index !== -1) items.splice(index, 1);
}

function clear() {
    items.splice(0, items.length);
}

const count = computed(() => items.reduce((sum, line) => sum + line.quantity, 0));
const total = computed(() => items.reduce((sum, line) => sum + line.price * line.quantity, 0));

export function useCart() {
    return { items, count, total, addItem, updateQuantity, removeItem, clear };
}
