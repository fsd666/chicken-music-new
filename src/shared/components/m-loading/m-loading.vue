<template>
    <div class="m-loading">
        <img src="../../../assets/images/loading.gif" />
        <p>{{text}}</p>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            default: "正在载入..."
        }
    }
};
</script>

<style lang="scss">
.m-loading {
    text-align: center;
    font-size: $font-size-tiny;
    line-height: 40px;
    color: hsla(0, 0%, 100%, 0.5);
    background-color: transparent;
    img {
        width: 48px;
        height: 48px;
    }
}
</style>