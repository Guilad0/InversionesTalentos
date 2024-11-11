import Swal from "sweetalert2";

export const loadingAlert = (title, text) => {
  Swal.fire({
    title,
    text,
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const confirmAlert = async (text, icon, iconHtml) => {
  const result = await Swal.fire({
    text: text,
    icon: icon,
    iconHtml: iconHtml,
    showCancelButton: true,
    confirmButtonColor: "#17223B",
    cancelButtonColor: "#D95C00",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  });
  return result;
};

export const messageAlert = (title, text, icon, iconHtml) => {
  Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: "Aceptar",
    iconHtml,
  });
};

export const timerAlert = (title,position,timer,icon) => {
  const Toast = Swal.mixin({
    toast: true,
    position,
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
  });

  (async () => {
    await Toast.fire({
      icon,
      title,
    });
  })();
};
