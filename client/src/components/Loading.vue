<template>
    <div id="loading">
        <div id="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Loading"
};
</script>

<style scoped lang="scss">
#loading {
    @include flex-center;
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: $white;
    z-index: 1000;

    #lds-ripple {
        position: relative;
        transform: translate(-36px, -136px);

        div {
            position: absolute;
            border: 4px solid $black;
            opacity: 1;
            border-radius: 50%;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        div:nth-child(2) {
            animation-delay: -0.5s;
        }

        @keyframes lds-ripple {
            0% {
                top: 36px;
                left: 36px;
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                top: 0px;
                left: 0px;
                width: 72px;
                height: 72px;
                opacity: 0;
            }
        }
    }
}
</style>
