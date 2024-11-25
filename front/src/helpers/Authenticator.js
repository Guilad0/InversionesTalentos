import router from "@/router";
import iziToast from "izitoast";
export const isAuthenticated = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    router.push(router.currentRoute.value.path);
    return false;
  }
};
export const isAuthenticatedAlert = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    iziToast.show({
      theme: "dark",
      position: "topCenter",
      title: "¡Error!",
      message:
        "Debe iniciar sesión, Quiere ingresar? <a href='/sign-login'> Ingresar </a>",
      icon: "error",
      timeout: 4000,
    });
    router.push(router.currentRoute.value.path);
    return false;
  }
};
