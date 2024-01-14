<template>
    <q-layout view="lHh Lpr lFf">
      <q-page-container class="pt-0-important bg-auth">
        <q-page>
          <div class="row" style="height: 100vh">
            <div class="col-12 flex content-center justify-center">
              <slot />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <style scoped>
  .wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: 0;
  }
  
  .login-image {
    z-index: 1;
  }
  
  .bg-auth {
    background: linear-gradient(45deg, #333333, #000000);
  }
  </style>
  