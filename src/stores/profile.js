import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    token: "",
    username: "",
    firstname: "",
    lastname: "",
    validated: false,
    correctEmailVerification: false,
  }), //headers solo con put y post
  actions: {
    async loadCurrentNames() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/current",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken()}`,
            },
          }
        );
        const text = await response.text();
        const result = text ? JSON.parse(text) : "";
        if (result !== "") {
          this.firstname = result.firstname;
          this.lastname = result.lastname;
        }
      } catch (error) {
        console.log(error);
        console.log("Error cargando nombres");
      }
    },
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
      try {
        await fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `bearer ${this.getToken()}`,
          },
          body: JSON.stringify({
            username,
            password,
            email,
            firstname,
            lastname,
          }),
        });
      } catch (error) {
        console.log(error);
      }
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
        console.log(response);
        if (response.ok) {
          this.correctEmailVerification = true;
        }
      } catch (error) {
        console.log("Invalid Verification!");
      }
    },
    async resend_verification(email) {
      try {
        await fetch("http://localhost:8080/api/users/resend_verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.validated = false;
      this.token = "";
    },
  },
  getters: {
    getHasProfile() {
      return this.validated;
    },
    getToken() {
      return this.token;
    },
    getCorrectVerification() {
      return this.correctEmailVerification;
    },
    getFistname() {
      return this.firstname;
    },
    getLastname() {
      return this.lastname;
    },
  },
});
