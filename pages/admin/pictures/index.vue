<script>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiPlusThick,
  mdiPostageStamp
} from "@mdi/js";

definePageMeta({
  middleware: ['auth']
})

export default {
  name: 'picturesPage',
  data() {
    return {
      pictures: {
        data: null
      },
    mdiMonitorCellphone,
    mdiTableBorder,
    mdiTableOff,
    mdiPlusThick
    }
  },
  created() {
    this.$store.dispatch("getAllPictures").then(() => {
      this.pictures = this.$store.getters.pictures
    })
  },
  methods: {
    changePage(page) {
      location.href = '/archive?page=' + page
    }
  }
}
</script>

<template>
  <div>
      <NuxtLayout name="authenticated">
        <SectionMain>
          <SectionTitleLineWithButton :icon="mdiPostageStamp" title="Pictures" main>
            <BaseButton
              to="/admin/pictures/create"
              
              :icon="mdiPlusThick"
              label="Add New"
              color="info"
              rounded-full
              small
            />
          </SectionTitleLineWithButton>
          <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
            <b>Responsive table.</b> Collapses on mobile
          </NotificationBar> -->
    
          <CardBox class="mb-6" has-table>
            <TableSampleClients @changePage="(page) => changePage(page)" :pictures="pictures" />
          </CardBox>
        </SectionMain>
      </NuxtLayout>
  </div>
</template>
