<template>
  <v-app>
    <v-navigation-drawer 
      app
      temporary
      v-model="drawer">
      <v-list
        dense
        nav
      >
        <v-list-item
          link
          v-for="menuItem of menuItems"
          :key="menuItem.url"
          :to="menuItem.url"
        >
          <v-list-item-icon>
            <v-icon left>{{ menuItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div>
      <v-app-bar 
        dark 
        color="primary">
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link :to="'/alpha'" tag="span" class="pointer">
            Поиск комплементарных команд 
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <v-btn 
            plain
            v-for="menuItem in menuItems"
            :key="menuItem.url"
            :to="menuItem.url"
          >
            <v-icon left>
              {{ menuItem.icon }}
            </v-icon>
            {{ menuItem.title }}
          </v-btn>
        </div>
      </v-app-bar>
    </div>

    <v-main>
      <router-view>
      </router-view>
    </v-main>

    <!-- Сообщение об ошибке. -->
    <template>
      <div class="text-center ma-2">
        <v-snackbar :value="errorMessage" :timeout="errorMessageTimeout">
          {{ errorMessage }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="red"
              text
              v-bind="attrs"
              @click="closeErrorSnackBar()"
            >
              Закрыть
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>

    <!-- Информационное сообщение. -->
    <template>
      <div class="text-center ma-2">
        <v-snackbar :value="infoMessage" :timeout="infoMessageTimeout">
          {{ infoMessage }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="green"
              text
              v-bind="attrs"
              @click="closeInfoSnackBar()"
            >
              Закрыть
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      infoMessageTimeout: 2000,
      errorMessageTimeout: 3000,
      menuItems: [
        { title: 'Alpha', url: '/alpha', icon: 'mdi-star-circle' },
        { title: 'Найти', url: '/search', icon: 'mdi-account-circle' },
        { title: 'Результаты', url: '/tasks', icon: 'mdi-view-list' }
      ]
    }
  },
  methods: {
    closeErrorSnackBar () {
      this.$store.dispatch('clearError')
    },
    closeInfoSnackBar () {
      this.$store.dispatch('clearInfo')
    }
  },
  watch: {
    infoMessage () {
      setTimeout(() => {
        this.$store.dispatch('clearInfo')
      }, this.infoMessageTimeout)
    },
    errorMessage () {
      setTimeout(() => {
        this.$store.dispatch('clearError')
      }, this.errorMessageTimeout)
    }
  },
  computed: {
    errorMessage () {
      return this.$store.getters.error
    },
    infoMessage () {
      return this.$store.getters.info
    }
  }
}
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>
