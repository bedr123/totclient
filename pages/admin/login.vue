<script setup>
import { reactive } from "vue";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import { store } from "~~/plugins/vuex";

const form = reactive({
  email: "",
  password: ""
});

const submit = () => {
  store.dispatch('login', form).then(() => {
    navigateTo("/admin");
  }).catch((e) => {
    console.log(e)
  })
};
</script>

<template>
  <div>
    <NuxtLayout>
      <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
        <CardBox :class="cardClass" is-form @submit.prevent="submit">
          <FormField label="Login" help="Please enter your email">
            <FormControl
              v-model="form.email"
              :icon="mdiAccount"
              name="login"
              autocomplete="email"
            />
          </FormField>
  
          <FormField label="Password" help="Please enter your password">
            <FormControl
              v-model="form.password"
              :icon="mdiAsterisk"
              type="password"
              name="password"
              autocomplete="current-password"
            />
          </FormField>
  
          <FormCheckRadio
            v-model="form.remember"
            name="remember"
            label="Remember"
            :input-value="true"
          />
  
          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Login" />
              <BaseButton to="/admin" color="info" outline label="Back" />
            </BaseButtons>
          </template>
        </CardBox>
      </SectionFullScreen>
    </NuxtLayout>
  </div>
</template>
