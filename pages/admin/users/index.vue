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
  name: 'usersPage',
  data() {
    return {
      users: [],
    mdiMonitorCellphone,
    mdiTableBorder,
    mdiTableOff,
    mdiPlusThick
    }
  },
  created() {
    this.$store.dispatch("getUsers").then(() => {
      this.users = this.$store.getters.users
      console.log(this.users)
    })
  }
}
</script>

<template>
  <div>
      <NuxtLayout name="authenticated">
        <SectionMain>
          <SectionTitleLineWithButton :icon="mdiPostageStamp" title="Users" main>
          </SectionTitleLineWithButton>
          <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
            <b>Responsive table.</b> Collapses on mobile
          </NotificationBar> -->
    
          <CardBox class="mb-6" has-table>
            <UsersList :users="users" />
          </CardBox>
        </SectionMain>
      </NuxtLayout>
  </div>
</template>