import { defineStore, mapActions } from "pinia";
import { authAxios, baseAxios } from "../services/authenticatedAxios";
import { useExerciseStore } from "./exercise";
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
    loadedProfiles: {},
  }), //headers solo con put y post
  actions: {
    ...mapActions(useExerciseStore, ["cleanExercises"]),
    async loadCurrentNames() {
      const response = await authAxios.get("/users/current");
      const res = response.data;
      if (response.status === 200) {
        this.username = res.username;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.profile = res;
      }
      return res;
    },
    async login(username, password, recordar) {
      if (this.validated) return this.getToken;
      try {
        const response = await baseAxios.post("/users/login", {
          username,
          password
        });
        const res = response.data;
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
        return error.response?.data;
      }
    },
    async createNewProfile(username, password, email, firstName, lastName) {
      try {
        const { data } = await baseAxios.post("/users", {
          username,
          password,
          email,
          firstName,
          lastName
        });
        return data;
      } catch (error) {
        return error.response?.data;
      }
    },
    async verify_email(email, code) {
      await baseAxios.post("/users/verify_email", {
        email,
        code
      });
      this.correctEmailVerification = true;
    },
    async resend_verification(email) {
      await baseAxios.post("/users/resend_verification", {
        email
      });
    },
    async logout() {
      this.validated = false;
      this.profile = {};
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      try {
        await authAxios.post("/users/logout");
      } catch (error) {
        this.token = "";
      }
      this.token = "";
      this.cleanExercises();
    },
    async generateAllUsers() {
      try {
        const res = await authAxios.get(
          "/users?" + new URLSearchParams({ size: 100 })
        );
        return res.data;
      } catch (error) {
        return [];
      }
    },
    setPage(newPage) {
      this.page = newPage;
    },
    async generateNUsers(amount) {
      const res = await authAxios.get(
        "/users?" + new URLSearchParams({ page: this.page, size: amount })
      );
      const retValue = res.data;
      this.page = this.page + 1;
      return retValue;
    },
    async generateUser(id) {
      // Cacheo los perfiles para que cuando tenga que editar no los busque devuelta
      if (id in this.loadedProfiles) {
        return this.loadedProfiles[id];
      }
      try {
        const { data, status } = await authAxios.get(`/users/${id}`);
        // No devolver nada si sucede error
        if (status === 200) {
          this.loadedProfiles[data.id] = data;
        }
        return data;
      } catch (error) {
        return null;
      }
    },
    async getRoutinesFrom(id) {
      let routines = [];
      let currPage = 0;
      let isLastPage = false;
      try {
        while (!isLastPage) {
          const { data } = await authAxios.get(
            `/users/${id}/routines?` +
            new URLSearchParams({ page: currPage, size: 10 })
          );
          isLastPage = data.isLastPage;
          currPage++;
          routines = routines.concat(data.content);
        }
        return routines;
      } catch (error) {
        console.log(error);
      }
      return routines;
    },
    async saveProfile(profile) {
      try {
        const { status, data } = await authAxios.put("/users/current", profile);
        if (status === 200) {
          this.profile = data;
          return data;
        } else {
          return null;
        }
      } catch (err) {
        return err.response.data;
      }
    },
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
