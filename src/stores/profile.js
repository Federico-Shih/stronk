import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    token: "",
    username: "",
    validated: false,
    correctEmailVerification: false,
  }), //headers solo con put y post
  actions: {
    async login(username, password) {
      if (this.validated) return this.token;
      try {
        const response = await fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `bearer ${this.getToken()}`,
          },
          //tiene que ser un string si o si
          body: JSON.stringify({
            username,
            password,
          }),
        });
        const text = await response.text();
        const result = text ? JSON.parse(text) : "";
        if (result !== "") {
          this.token = result.token;
          this.username = username;
          this.validated = true;
        }
      } catch (error) {
        console.log("Oops!");
      }
    },
    async createNewProfile(username, password, email, firstname, lastname) {
      await fetch("localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `bearer ${this.getToken()}`,
        },
        //tiene que ser un string si o si
        body: JSON.stringify({
          username,
          password,
          email,
          firstname,
          lastname,
        }),
      });
    },
    async verify_email(email, code) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/verify_email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            //tiene que ser un string si o si
            body: JSON.stringify({
              email,
              code,
            }),
          }
        );
        const text = await response.text();
        const result = text ? JSON.parse(text) : "";
        if (result !== "") {
          this.correctEmailVerification = true;
        }
      } catch (error) {
        console.log("Invalid Verification!");
      }
    },
    logout() {
      this.validated = false;
      this.token = "";
    },
  },
  getters: {
    hasProfile() {
      return this.validated;
    },
    getToken() {
      return this.token;
    },
    getCorrectVerification() {
      return this.correctEmailVerification;
    },
  },
});
