<script setup>
import { reactive, ref } from "vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiPostageStamp } from "@mdi/js";
import { store } from "~~/plugins/vuex";

const selectOptions = [
  { id: 1, label: "Business development" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
];

const route = useRoute()

const picture = reactive({
  year: null,
  link: null,
  description: null,
  image: null
});

onBeforeMount(() => {
  store.dispatch("getPicture", route.params.id).then((res) => {
    picture.year = res.data.year
    picture.link = res.data.link
    picture.description = res.data.description
  }).catch((e) => {
    console.log(e)
  })
})

// const form = reactive({
//   year: null,
//   link: null,
//   description: null,
//   image: null
// });

const submit = () => {
  let formData = new FormData()
  formData.append("_method", "PUT")

  if (picture.year) {
    formData.append('year', picture.year)
  }

  if (picture.link) {
    formData.append('link', picture.link)
  }

  if (picture.description) {
    formData.append('description', picture.description)
  }

  if (picture.image) {
    formData.append('image', picture.image)
  }

  store.dispatch('editPicture', { id: route.params.id, picture: formData }).then(() => {
    navigateTo("/admin/pictures")
  }).catch((e) => {
    console.log(e)
  })
};

const uploadImage = (event) => {
  picture.image = event.target.files[0]
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
            title="Edit"
            main
          >
          </SectionTitleLineWithButton>
          <CardBox is-form @submit.prevent="submit">
    
            <FormField label="Year" help="Do not enter the leading zero">
              <FormControl
                v-model="picture.year"
                type="tel"
                placeholder="Year of picture"
              />
            </FormField>
            <FormField label="Link" help="">
              <FormControl
                v-model="picture.link"
                type="tel"
                placeholder="Link to website"
              />
            </FormField>

            <FormFilePicker @change="uploadImage" label="Upload" />
    
            <BaseDivider />
    
            <FormField label="Description" help="Short description. Max 255 characters">
              <FormControl
                v-model="picture.description"
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
