import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost/booking/public/api/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.user && response.data.user.access_token) {
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
      });
  }

  logout() {
    return axios
      .post(API_URL + "logout", {},{ headers: AuthHeader() })
      .then(response => {
        sessionStorage.clear();
        return response.data;

      })
      .catch(error => {return error.response});
  }

 
  getCurrentUser() {
    const user = sessionStorage.getItem('user');
    
    if (user) return JSON.parse(user);

    return null;
  }
}

export default new AuthService();