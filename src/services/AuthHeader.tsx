export default function AuthHeader() {
    const userStr = sessionStorage.getItem("user");

    let user = null;
    if (userStr){
      user = JSON.parse(userStr);
    }
    
  
    if (user && user.access_token) {
      return { 
        'Content-Type' : 'application/json',
      'Accept' : 'application/json',
        Authorization: 'Bearer ' + user.access_token };
    } else {
      return { Authorization: '' };
    }
  }