<template>
  <header class="header">
    <p class="header__title">
      Весёлый инвентарь
    </p>
  </header>
  <div class="header-space" />
</template>

<style scoped lang='scss'>
.header-space {
  height: 45px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 45px;
  padding: 0 12px;
  background: var(--primary);
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
  color: white;

  &__title {
    font-size: 20px;
    line-height: 1em;
    font-weight: 400;
  }
}
</style>