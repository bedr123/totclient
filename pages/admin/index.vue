<script setup>
import { computed, ref, onMounted } from "vue";
import { store } from "@/plugins/vuex";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiPlusThick,
} from "@mdi/js";
//
definePageMeta({
  middleware: ['auth']
})
// 

const chartData = ref(null);

const fillChartData = () => {
  // chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
});

const clientBarItems = computed(() => store.state.main.clients.slice(0, 4));

const transactionBarItems = computed(() => store.state.main.history);
</script>

<template>
  <div>
    <NuxtLayout name="authenticated">
      <SectionMain>
        <SectionTitleLineWithButton
          :icon="mdiChartTimelineVariant"
          title="Overview"
          main
        >
          <BaseButton
            href="https://github.com/justboil/admin-one-vue-tailwind"
            target="_blank"
            :icon="mdiPlusThick"
            label="Star on GitHub"
            color="contrast"
            rounded-full
            small
          />
        </SectionTitleLineWithButton>
  
        
      </SectionMain>
    </NuxtLayout>
  </div>
</template>
