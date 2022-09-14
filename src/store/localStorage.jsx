export const authenticate = (auth) => {
    if (typeof window !== "undefined") {
      const jwtState = JSON.stringify(auth);
      
      localStorage.setItem("auth", jwtState);
    }
  };
  
  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    const jwtState = localStorage.getItem("auth");
    if (jwtState === null) {
      return undefined;
    }
    return JSON.parse(jwtState);
  };