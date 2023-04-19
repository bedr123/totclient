<template>
    <div class="container">
        <div class="game-info">
            <p>{{ date }} | TOT #{{ num }}</p>
            <a href="/archive">See Pictures Archive</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GameInfo',
  data() {
    return {
        date: null
    }
  },
  props: ['picture'],
  computed: {
    num() {
        return this.picture ? this.picture.num_of_pic : ''
    }
  },
  mounted() {
    var currentDate = new Date();

    var month = currentDate.getMonth() + 1

    switch(month) {
        case 1:
            month = 'January'
            break
        case 2:
            month = 'February'
            break
        case 3:
            month = "March"
            break
        case 4:
            month = "April"
            break
        case 5:
            month = "May"
            break
        case 6:
            month = "June"
            break
        case 7:
            month = "July"
            break
        case 8:
            month = "August"
            break
        case 9:
            month = "September"
            break
        case 10:
            month = "October"
            break
        case 11:
            month = "November"
            break
        case 12:
            month = "December"
            break
    }

    var day = currentDate.getDate();
    var sufiks = null
    if (parseInt(day) % 10 == 1) {
        sufiks = 'st'
    } else if (parseInt(day) % 10 == 2) {
        sufiks = 'nd'
    } else if (parseInt(day) % 10 == 3) {
        sufiks = 'rd'
    } else {
        sufiks = 'th'
    }

    var year = currentDate.getFullYear()

    this.date = month+' '+day+sufiks+' '+year
  }
}
</script>

<style scoped>
.container {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 0;
    /* background-color: #FEFCF3; */
    color: #1A120B;
    /* border-bottom: #F0DBDB 4px solid; */
}

.game-info {
    text-align: center;
    color: #013068;
    /* margin-bottom: 20px; */
}

.game-info p {
    
    font-family: 'Tilt Warp', cursive;
    margin-bottom: 10px;
}
</style>
