import { Account, ID } from "appwrite";
import client from "./config";

class AuthService {
  account;

  constructor() {
    this.account = new Account(client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      console.log("herp");
      if (user) {
        console.log(user);

        return await this.createEmailPasswordSession(email, password);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createEmailPasswordSession(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw new Error("No user exists");
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const authService = new AuthService();

export default authService;
