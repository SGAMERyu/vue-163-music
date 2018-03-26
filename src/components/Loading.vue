<template>
  <div :class="{mask: mask}">
    <div class="loading">
      <div class="loading-inside"></div>
    </div>
    <div class="fas fa-music loading-text"></div>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: {
    mask: {
      type: Boolean,
      default: true,
    }
  }
};
</script>

<style lang="scss">
.mask {
  height: 100vh;
  background: linear-gradient(
    45deg,
    #6fc7b5 0%,
    #13bdce 20%,
    #0094d9 40%,
    #5a3694 60%,
    #ee4d74 80%,
    #f58c58 100%
  );
  background-size: 600%;
  background-position: 0% 100%;
  animation: gradient 7s ease-in-out infinite;
  position: relative;
}
.loading {
  width: 120px;
  height: 120px;
  border-left: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 60px);
  left: calc(50% - 60px);
  animation: rotate 5s ease-in infinite;
}
.loading-inside {
  width: 80px;
  height: 80px;
  border-top: 5px solid #ffffff;
  border-bottom: 5px solid #ffffff;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
  animation: rotate 5s ease-in infinite alternate-reverse;
}
.loading-text {
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  color: #ffffff;
  animation: scale 2s ease-in-out infinite alternate;
}
@keyframes gradient {
  50% {
    background-position: 100% 0%;
  }
}
@keyframes rotate {
  50% {
    transform: rotate(360deg);
  }
}
@keyframes scale {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
