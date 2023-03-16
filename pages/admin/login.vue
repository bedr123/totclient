<script setup>
import { reactive } from "vue";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import { store } from "~~/plugins/vuex";
import { decodeCredential } from 'vue3-google-login'

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

// onMounted(() => {
//    window.onload = () => {
//     google.accounts.id.initialize({
//       client_id: '547722748340-bdqosldme9fudabda8879gdsgeja8h82.apps.googleusercontent.com',
//       callback: handleCredentialResponse, //method to run after user clicks the Google sign in button
//     });
//     google.accounts.id.renderButton(
//       document.getElementById("googleButton"),
//       { theme: "outline", size: "large" } // customization attributes
//     );
//     google.accounts.id.prompt(); // also display the One Tap dialog
//   }
// })

// function handleCredentialResponse(response) {
//   // call your backend API here
//   // the token can be accessed as: response.credential
//   console.log(response)
// }

const callback = (e) => {
  console.log(e)
  // const userData = decodeCredential(e.credential)
  // console.log("Handle the userData", userData)
  // store.dispatch('googleLogin', userData)
}

// const login = () => {
//   googleTokenLogin().then((response) => {
//     console.log("Handle the response", response)
//     store.dispatch('googleLogin', response.access_token)
//   })
// }


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

          <!-- <div id="googleButton"></div> -->



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
