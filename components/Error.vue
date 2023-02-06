<template>
    <div class="error-dialog" ref="errorDialog">
        {{ error }}
    </div>
</template>

<script>
export default {
    name: 'ErrorDialog',
    props: ['error'],
    methods: {
        showError() {
            this.$refs.errorDialog.classList.add("show")
        },
        hideError() {
            this.$refs.errorDialog.classList.remove("show")
        }
    }
}
</script>

<style scoped>
.error-dialog {
    width: 18.75rem;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    padding: 1.25rem;
    background-color: black;
    border-radius: 0.938rem;
    pointer-events: none;
    opacity: 0;
    transition: all 200ms ease-out;
}

.show {
    pointer-events: all;
    opacity: 1;
}
</style>