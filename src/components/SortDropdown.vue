<template>
<div class="relative inline-block w-48" v-if="options.length > 0">
  <button
    @click="toggleDropdown"
    type="button"
    class="text-md text-[#c5a2a6] flex items-center gap-1"
    aria-haspopup="true"
    :aria-expanded="isOpen.toString()"
  >
    Ordenar por
    <ChevronDownIcon class="w-5 h-5 text-[#c5a2a6]" :class="{ 'transform rotate-180': isOpen }"/>
  </button>

  <transition
    enter-active-class="transition ease-out duration-150"
    enter-from-class="opacity-0 translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-1"
  >
    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-sm max-h-60 overflow-auto text-sm"
      role="menu"
      aria-orientation="vertical"
      tabindex="-1"
    >
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.value)"
        class="flex items-center px-3 py-2 cursor-pointer hover:bg-[#f4eaea] transition-colors"
        :class="{ 'bg-[#e8dada] font-medium': modelValue === option.value }"
        role="menuitem"
        tabindex="0"
      >
        <component :is="option.icon" class="w-4 h-4 mr-2 text-gray-500" />
        {{ option.label }}
      </li>
    </ul>
  </transition>
</div>

</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import {
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/vue/24/solid";
import { FunnelIcon, DocumentArrowUpIcon, DocumentArrowDownIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);

const options = [
  { value: "", label: "Nenhum", icon: FunnelIcon },
  { value: "price_asc", label: "Preço Crescente", icon: ArrowUpIcon },
  { value: "price_desc", label: "Preço Decrescente", icon: ArrowDownIcon },
  { value: "name_asc", label: "Nome A-Z", icon: DocumentArrowUpIcon },
  { value: "name_desc", label: "Nome Z-A", icon: DocumentArrowDownIcon },
];

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(value) {
  emit("update:modelValue", value);
  isOpen.value = false;
}

function onClickOutside(event) {
  if (!event.target.closest(".relative")) {
    isOpen.value = false;
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener("click", onClickOutside);
  } else {
    document.removeEventListener("click", onClickOutside);
  }
});
</script>
