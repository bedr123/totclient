<script setup>
import { computed, ref } from "vue";
import { store } from "@/plugins/vuex";
import { mdiPencilBoxOutline, mdiTrashCan } from "@mdi/js";
import { useRoute } from 'vue-router'

defineProps({
  checkable: Boolean
});

const items = computed(() => store.state.main.clients);

const pictures = computed(() => store.state.picture.pictures);

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

const numPages = computed(() => pictures.value ? Math.ceil(pictures.value.total / pictures.value.per_page) : 0);

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
        <th>Id</th>
        <th>Picture</th>
        <th>Year</th>
        <th>Active</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-if="pictures" v-for="picture in pictures.data" :key="picture.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td class="border-b-0 lg:w-6 before:hidden">
          <!-- <UserAvatar
            :username="client.name"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          /> -->
        </td>
        <td data-label="Id">
          {{ picture.id }}
        </td>
        <td data-label="Picture">
          <img class="w-28" :src="picture.image" alt="">
        </td>
        <td data-label="Year">
          {{ picture.year }}
        </td>
        <td data-label="Active">
          <FormField>
            <FormCheckRadioGroup
              @change="activate(picture.id)"
              v-model="picture.is_current"
              name="sample-switch"
              type="switch"
              :options="{ one: 'One'}"
            />
          </FormField>
        </td>
        <!-- <td data-label="Progress" class="lg:w-32">
          <progress
            class="flex w-2/5 self-center lg:w-full"
            max="100"
            :value="client.progress"
          >
            {{ client.progress }}
          </progress>
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="client.created"
            >{{ client.created }}</small
          >
        </td> -->
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiPencilBoxOutline"
              small
              :to="`/admin/pictures/edit/${picture.id}`"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="deletePicture(picture.id)"
            />
          </BaseButtons>
        </td>
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
