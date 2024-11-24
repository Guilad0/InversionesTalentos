import router from "@/router";
import iziToast from "izitoast";

// Función para verificar si la ruta actual es la de reestablecer contraseña
const isPublicRoute = () => {
    const currentPath = router.currentRoute.value.path;
    const publicRoutes = [/^\/reset-password\/[^/]+$/];  // Expresión regular para la ruta con token

    return publicRoutes.some(route => route.test(currentPath));
};

export const isAuthenticated = () => {
    if (isPublicRoute()) {
        return true;
    }

    if (localStorage.getItem("token")) {
        return true;
    } else {
        router.push(router.currentRoute.value.path);
        return false;
    }
};

export const isAuthenticatedAlert = () => {
    if (isPublicRoute()) {
        return true;
    }

    if (localStorage.getItem("token")) {
        return true;
    } else {
        iziToast.show({
            theme: "dark",
            position: "topCenter",
            title: "¡Error!",
            message:
                "Debe iniciar sesión, ¿Quiere ingresar? <a href='/sign-login'>Ingresar</a>",
            icon: "error",
            timeout: 4000,
        });
        router.push(router.currentRoute.value.path);
        return false;
    }
};
