<script setup>
import { computed, ref } from "vue";
import { store } from "@/plugins/vuex";
import { mdiPencilBoxOutline, mdiTrashCan } from "@mdi/js";
import { useRoute } from 'vue-router'

defineProps({
  checkable: Boolean
});

const items = computed(() => store.state.main.clients);

const archive = computed(() => store.state.picture.archive);

const isActive = computed((isCurrent) => isCurrent == 1 ? true : false)

const route = useRoute()

// const editPicture = async (id) => {
//   await navigateTo("/admin/pictures/" + id + "/edit")
// }

const deletePicture = (id) => {
  store.dispatch("deletePicture", id).then(() => {
    // pictures.value.pictures.filter((picture) => {
    //   return picture.id !== id
    // })
  })
}

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(route.query.page ? parseInt(route.query.page) : 1);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => archive.value ? Math.ceil(archive.value.total / archive.value.per_page) : 0);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 1; i <= numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const activate = (id) => {
  store.dispatch("activatePicture", id)
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};


</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Num Of Pic</th>
        <th>Picture</th>
        <th>Year</th>
        <th />
      </tr>
    </thead>
    <tbody>
        <tr v-if="archive" v-for="picture in archive.data" :key="picture.id" >
            <td class="border-b-0 lg:w-6 before:hidden">
            </td>
            <td data-label="Num Of Pic">
              {{ picture.num_of_pic }}
            </td>
            <td data-label="Picture">
              <img class="w-28" :src="picture.image" alt="">
            </td>
            <td data-label="Year">
              {{ picture.year }}
            </td>
            <td><NuxtLink class="pic-link" :href="`pictures/${ picture.id }`">Show</NuxtLink></td>
        
            </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="$emit('changePage', page)"
        />
      </BaseButtons>
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>

<style>
.pic-link {
    color: rgb(38, 38, 255);
}
</style>