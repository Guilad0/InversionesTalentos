<template>
    <div class="center">
  <div class="sppiner"></div>
</div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.center {
  color: #000;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.sppiner {
  width:  80px;
  height: 80px;
  border: 5px solid #17223B;
  border-radius: 50%;
  border-top-color: #D95C00;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>