<template>
  <NuxtLayout>
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
        <div class="text-grey-8">Registration Form</div>
      </q-card-section>
      <q-form ref="form" class="q-gutter-md" @submit="submit">
        <q-input
          v-model="user.first_name"
          label="First Name"
          name="First Name"
        />
        <q-input v-model="user.last_name" label="Last Name" name="Last Name" />
        <q-input v-model="user.email" label="Email" name="Email" />
        <q-input
          v-model="user.password"
          label="Password"
          name="password"
          type="password"
        />

        <div>
          <q-btn
            class="full-width fredoka"
            color="dark"
            label="Register"
            rounded
            type="submit"
          ></q-btn>
        </div>
      </q-form>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">
          Already have an account?
          <NuxtLink class="text-primary" to="/login"> Login </NuxtLink>
        </div>
      </q-card-section>
    </q-card>
  </NuxtLayout>
</template>

<script setup>
import { ref, reactive } from "vue";

definePageMeta({
  layout: "auth",
  middleware: "user-auth",
});

const user = reactive({
  last_name: null,
  first_name: null,
  email: null,
  password: null,
});

const form = ref(null);
const submit = async () => {
  if (form.value.validate() && !!(await firebaseRegister(user))) {
    console.log("register");
    navigateTo({ path: "/" });
  }
};
</script>

<style scoped>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(246, 246, 246, 1);
  font-family: "Rubix";
}
</style>
