import iziToast from "izitoast";

export const successAlert = (message, title, position ) => {
    iziToast.success({
      //position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        title, 
         message,
        position: position || 'topRight',
        theme:'dark',
        progressBarColor:'#198754',
        messageColor:'#FFFFFF',
        iconColor:'#FFFFFF',
        backgroundColor: '#198754',
        color:'#5ce65c',
        closeOnEscape:true,
        closeOnClick:true,
      })
};
export const successAlertAcept = (message, title, position ) => {
  iziToast.success({
    title, 
    message,
    position: position || 'topRight',
    theme: 'dark',
    progressBarColor: '#198754',
    messageColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    color: '#5ce65c',
    backgroundColor: '#198754',
    closeOnEscape: true,
    closeOnClick: true,
    buttons: [
      ['<button>Aceptar</button>', function (instance, toast) {
        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
      }]
    ]
  })
};
export const infoAlert = (message, title, position) => {
    iziToast.info({
        title,
        message,
        position: "bottomRight",
        closeOnEscape:true,
        closeOnClick:true,  
        timeout: 30000,
      })
}

let isProcessingError = false;

export const errorAlert = (message, title, position) => {
  if (isProcessingError) return;

  isProcessingError = true; 
  iziToast.error({
    title,
    message,
    position: position || 'topRight',
    theme: 'dark',
    progressBarColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    color: '#ff0000',
    closeOnEscape: true,
    closeOnClick: true,
    onClosed: function () {
      isProcessingError = false; 
    }
  });
};

// export const errorAlert = (message, title, position) => {
//     iziToast.error({
//         title, 
//         message,
//         position: position || 'topRight',
//         theme:'dark',
//         progressBarColor:'#FFFFFF',
//         messageColor:'#FFFFFF',
//         iconColor:'#FFFFFF',
//         color:'#ff0000',
//         closeOnEscape:true,
//         closeOnClick:true,  
//       })
// }