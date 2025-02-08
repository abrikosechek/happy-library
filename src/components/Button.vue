<template>
  <button class="button" :class="[color]">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "primary",
    validator(value: string) {
      return ["primary", "primary-outline", "error"].includes(value)
    },
  },
})
</script>

<style scoped lang='scss'>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 32px;
  padding: 0 12px;
  border: 0px;
  border-radius: 4px;
  font-size: 18px;
  line-height: 1em;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;

  // colors
  &.primary {
    background: var(--primary);
    color: white;

    &:hover {
      background: var(--primary-hover);
    }
  }

  &.primary-outline {
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);

    &:hover {
      border: 1px solid var(--primary-hover);
      color: var(--primary-hover);
    }
  }

  &.error {
    background: var(--error);
    color: white;

    &:hover {
      background: var(--error-hover);
    }
  }
}
</style>