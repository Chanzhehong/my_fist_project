<template>
  <home-banner></home-banner>
  <content-com></content-com>
</template>

<script>
import HomeBanner from "./HomeBanner";
import ContentCom from "./ContentCom";
export default {
  name: "VueIndex",
  components: {
    HomeBanner,
    ContentCom,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>