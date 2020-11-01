<template>
    <div class="error">
        <home-header></home-header>
        <div class="error-text">
            <p style="font-size: 24px;color: #888888;padding-bottom: 40px">JJService</p>
            <p style="font-size: 45px">404 Not Found</p>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import homeHeader from "@/components/homeHeader";
    export default {
        name: "Error",
        components: {
            homeHeader
        },
    }
</script>

<style scoped>
    .error{
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .error-text{

    }
</style>