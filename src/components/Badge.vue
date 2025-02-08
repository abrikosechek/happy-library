<template>
  <div class="badge">
    <slot />
  </div>
</template>

<style scoped lang='scss'>
.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px 8px;
  background: var(--primary);
  border-radius: 9999px;
  color: white;
  font-size: 12px;
  line-height: 1em;
  font-weight: 600;
}
</style>