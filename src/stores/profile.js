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
    profile: {},
    page: 0,
    shownAll: false,
    loadedProfiles: {}
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
          this.profile = res;
          return res;
        }
      } catch (error) {
        console.log(error);
        console.log("Error cargando nombres");
      }
    },
    async login(username, password, recordar) {
      if (this.validated) return this.getToken;
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
          if (recordar) {
            localStorage.setItem("token", res.token);
          } else {
            sessionStorage.setItem("token", res.token);
          }
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
      this.profile = {};
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      try {
        await fetch("http://localhost:8080/api/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${this.token}`,
          },
        });
        this.token = "";
      } catch (error) {
        console.log(error);
      }
    },
    async generateAllUsers() {
      try {
        const res = await fetch(
          "http://localhost:8080/api/users?" +
            new URLSearchParams({ size: 100 }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.token}`,
            },
          }
        );
        return await res.json();
      } catch (error) {
        console.log(error);
      }
    },
    setPage(newPage) {
      this.page = newPage;
    },
    async generateNUsers(amount) {
      try {
        const res = await fetch(
          "http://localhost:8080/api/users?" +
            new URLSearchParams({ page: this.page, size: amount }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.token}`,
            },
          }
        );
        console.log(this.page);
        const retValue = await res.json();
        this.page = this.page + 1;
        this.shownAll = retValue.isLastPage;
        return retValue;
      } catch (error) {
        console.log(error);
      }
    },
    async generateUser(id) {
      // Cacheo los perfiles para que cuando tenga que editar no los busque devuelta
      if (id in this.loadedProfiles) {
        return this.loadedProfiles[id];
      }
      try {
        const res = await fetch(`http://localhost:8080/api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${this.token}`
          }
        });
        // No devolver nada si sucede error
        if (res.status === 200) {
          const ret = await res.json();
          this.loadedProfiles[ret.id] = ret;
          return ret;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getRoutinesFrom(id) {
      try {
        const res = await fetch(
          `http://localhost:8080/api/users/${id}/routines`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.token}`,
            },
          }
        );
        const ret = await res.json();
        console.log(`Loading routines from user ${id}`);
        console.log(ret);
        return ret;
      } catch (error) {
        console.log(error);
      }
    },
    async saveProfile(profile) {
      try {
        const res = await fetch(`http://localhost:8080/api/users/current`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${this.token}`
          },
          body: JSON.stringify(profile)
        });
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  getters: {
    getHasProfile() {
      return Object.keys(this.profile).length !== 0;
    },
    getToken() {
      if (this.token.length === 0) {
        this.token =
          sessionStorage.getItem("token") ||
          localStorage.getItem("token") ||
          "";
      }
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
    getId() {
      return this.profile.id;
    },
    getPic() {
      return this.profile.avatarUrl;
    },
  },
});
