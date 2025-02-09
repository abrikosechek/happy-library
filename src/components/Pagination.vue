<template>
  <div class="pagination">
    <button class="pagination__button" :class="{ disabled: model == 1 }" @click="prevPage()">
      &lt;
    </button>
    <button v-for="page in displayedPages" :key="page || 1" class="pagination__button"
      :class="{ active: model == page }" @click="pageButton(page)">
      {{ page === null ? "..." : page }}
    </button>
    <button class="pagination__button" :class="{ disabled: model == pages }" @click="nextPage()">
      &gt;
    </button>
  </div>
</template>

<script setup lang='ts'>
import { computed, watch } from 'vue';
const props = defineProps<{
  pages: number
}>()
const model = defineModel<number>()

const displayedPages = computed(() => {
  if (!model.value) return []

  const currentPage = model.value
  const totalPages = props.pages

  // show all pages
  if (totalPages <= 7) {
    return [...Array(totalPages)].map((_, index) => index + 1);
  }
  // show first pages
  if (currentPage < 4) {
    return [1, 2, 3, 4, null, totalPages]
  }
  // show last pages
  if (currentPage >= totalPages - 2) {
    return [1, null, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }
  // show middle page
  return [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages]
})

const pageButton = (pageButtonValue: number | null) => {
  if (pageButtonValue === null) return
  model.value = pageButtonValue
}

const prevPage = () => {
  if (!model.value) return
  if (model.value <= 1) return
  model.value--
}
const nextPage = () => {
  if (!model.value) return
  if (model.value >= props.pages) return
  model.value++
}

watch(() => props.pages, (newValue) => {
  if (!model.value) return
  if(newValue < model.value) {
    model.value = newValue
  }
})
</script>

<style scoped lang='scss'>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: transparent;
    border: 1px solid var(--primary);
    border-radius: 6px;
    color: var(--primary);
    font-size: 20px;
    line-height: 1em;
    cursor: pointer;

    &:not(.active):not(.disabled):hover {
      background: rgba(48, 133, 231, 0.15);
    }

    &.active {
      background: var(--primary);
      color: white;
      cursor: default;
    }

    &.disabled {
      opacity: 40%;
      cursor: default;
    }
  }
}
</style>