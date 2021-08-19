<template>
  <div>
    <v-container v-if="isLoading" class="fill-height">
      <v-row align="center" justify="center">
        <v-col>
          <div class="text-xs-center">
            <div class="headline my-5">Loading...</div>
            <v-progress-circular
              size="100"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row>
        <v-col> <h1>Banking Application</h1> </v-col>
      </v-row>

      <v-row>
        <v-col class="pl-10" cols="4">
          <v-text-field
            label="Search"
            v-model="searchedValue"
            placeholder="Search by name"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-container class="pa-8" v-for="user in filteredClients" :key="user.id">
        <v-card tile>
          <div class="d-inline-flex pt-4">
            <h3 class="pt-1">{{ user.firstname }} {{ user.name }}</h3>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon color="primary"> mdi-information-outline </v-icon>
                </v-btn>
              </template>
              <p class="mb-0">Client Id - {{ user.id }}</p>
              <p class="mb-0">Name - {{ user.name }}</p>
              <p class="mb-0">First Name - {{ user.firstname }}</p>
              <p class="mb-0">Address - {{ user.address }}</p>
              <p class="mb-0">Date Created - {{ user.created }}</p>
              <p class="mb-0">Date of Birth - {{ user.birthday }}</p>
            </v-tooltip>
          </div>

          <v-row>
            <v-col class="ma-4 text-right">
              <PopUp :user-id="user.id"></PopUp>
            </v-col>
          </v-row>

          <div class="d-inline-flex ma-8">
            <PieChart
              :user-id="user.id"
              :account-data="allAccounts[user.id]"
            ></PieChart>
          </div>
          <div class="d-inline-flex ma-4">
            <BarChart
              :user-id="user.id"
              :account-data="allAccounts[user.id]"
            ></BarChart>
          </div>
        </v-card>
      </v-container>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";
import PopUp from "@/views/PopUp.vue";

@Component({
  components: {
    BarChart,
    PieChart,
    PopUp,
  },
})
export default class Main extends Vue {
  public searchedValue = "";
  public allClients = [];
  public allAccounts = this.$store.state.client_accounts;
  public isLoading = true;

  get filteredClients() {
    this.allClients = this.$store.state.clients;
    return this.allClients.filter((each: any) => {
      return each.firstname
        .toLowerCase()
        .includes(this.searchedValue.toLowerCase());
    });
  }

  async created() {
    await this.$store.dispatch("getClients"),
      this.$store.state.clients.forEach(async (user: any) => {
        await this.$store.dispatch("getClientAccounts", {
          id: user.id,
        });
      });
    this.isLoading = false;
  }
}
</script>

<style scoped>
</style>