<script setup>
import { reactive, ref } from "vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiPostageStamp } from "@mdi/js";
import { store } from "~~/plugins/vuex";

definePageMeta({
  middleware: ['auth']
})

const selectOptions = [
  { id: 1, label: "Business development" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
];

const form = reactive({
  year: null,
  link: null,
  description: null,
  image: null
});

const submit = () => {
  let formData = new FormData()
  console.log(form)
  formData.append('year', form.year)
  formData.append('link', form.link)
  formData.append('description', form.description)
  formData.append('image', form.image)
  store.dispatch('createPicture', formData).then(() => {
    navigateTo("/admin/pictures")
  })
};

const uploadImage = (event) => {
  form.image = event.target.files[0]
}

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};
</script>

<template>
  <div>
      <NuxtLayout name="authenticated">
        <SectionMain>
          <SectionTitleLineWithButton
            :icon="mdiPostageStamp"
            title="Create"
            main
          >
          </SectionTitleLineWithButton>
          <CardBox is-form @submit.prevent="submit">
    
            <FormField label="Year" help="Do not enter the leading zero">
              <FormControl
                v-model="form.year"
                type="tel"
                placeholder="Year of picture"
              />
            </FormField>
            <FormField label="Link" help="">
              <FormControl
                v-model="form.link"
                type="tel"
                placeholder="Link to website"
              />
            </FormField>

            <FormFilePicker @change="uploadImage" label="Upload" />
    
            <BaseDivider />
    
            <FormField label="Description" help="Short description. Max 255 characters">
              <FormControl
                v-model="form.description"
                type="textarea"
                placeholder="Short description about uploaded picture"
              />
            </FormField>
    
            <template #footer>
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
              </BaseButtons>
            </template>
          </CardBox>
        </SectionMain>
      </NuxtLayout>
  </div>
</template>
