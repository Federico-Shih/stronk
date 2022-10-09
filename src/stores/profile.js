import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    token: "",
    username: "",
    firstName: "",
    lastName: "",
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
              Authorization: `bearer ${this.token}`,
            },
          }
        );
        console.log(response);
        const res = await response.json();
        if (response.status === 200) {
          this.username = res.username;
          this.firstName = res.firstName;
          this.lastName = res.lastName;
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
        const res = await response.json();
        if (response.status === 200) {
          this.token = res.token;
          this.validated = true;
        } else {
          return res;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createNewProfile(username, password, email, firstName, lastName) {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `bearer ${this.getToken()}`,
          },
          body: JSON.stringify({
            username,
            password,
            email,
            firstName,
            lastName,
          }),
        });
        return response.json();
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
    async logout() {
      this.validated = false;
      this.token = "";
      try {
        await fetch("http://localhost:8080/api/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getHasProfile() {
      console.log(this.validated);
      return this.validated;
    },
    getToken() {
      return this.token;
    },
    getCorrectVerification() {
      return this.correctEmailVerification;
    },
    getFirstname() {
      return this.firstName;
    },
    getLastname() {
      return this.lastName;
    },
  },
});
