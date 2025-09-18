<script setup lang="ts" name="TeekLayoutProvider">
    import Teek from "vitepress-theme-teek";
    import NotFound from "./404.vue";
</script>

<template>
    <Teek.Layout>
        <template #not-found>
            <NotFound />
        </template>
    </Teek.Layout>
</template>

<style lang="css">
    .tk-my.is-circle-bg {
        margin-bottom: 20px;
    }
    .tk-my.is-circle-bg .tk-my__avatar.circle-rotate {
        margin-top: 200px;
    }
</style>
