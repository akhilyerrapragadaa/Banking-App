<template>
  <div>
    <v-btn
      color="red"
      class="white--text text-right no-uppercase"
      @click="displayAccounts"
    >
      More
    </v-btn>

    <v-dialog v-model="dialog" width="1000" height="100%">
      <v-card>
        <v-card-title>
          Accounts
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
        ></v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class PopUp extends Vue {
  @Prop(String) public userId!: string;

  public dialog = false;
  public desserts = [];

  public async displayAccounts() {
    this.desserts = this.$store.state.client_accounts[this.userId];
    this.dialog = true;
  }
  data() {
    return {  
      headers: [
        {
          text: "Account Id",
          align: "start",
          value: "id",
        },
        { text: "Card Type", value: "card_type" },
        { text: "Number", value: "number" },
        { text: "Balance", value: "balance" },
        { text: "Created", value: "created" }
      ]
    };
  }
}
</script>

<style scoped>
</style>

