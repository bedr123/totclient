<template>
    <div class="container">
        <button>Log in</button>
    </div>
</template>

<script>
export default {
  name: 'MainOptions'
}
</script>

<style scoped>
.container {
    width: fit-content;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: #FEFCF3; */
    color: #1A120B;
    /* border-bottom: #F0DBDB 4px solid; */
}
button {
    cursor: pointer;
    padding: 10px 0;
    width: 300px;
    font-size: 1rem;
    background-color: #0c0228;
    border: 2px solid #0c0228;
    color: white;
    transition: all 300ms ease-out;
}

button:hover {
    background-color: white;
    color: #0c0228;
}
</style>
