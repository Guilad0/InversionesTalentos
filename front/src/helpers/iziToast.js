import iziToast from "izitoast";

export const successAlert = (message, title, position ) => {
    iziToast.success({
      //position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        title, 
         message,
        position: position || 'topRight',
        theme:'dark',
        progressBarColor:'#FFFFFF',
        messageColor:'#FFFFFF',
        iconColor:'#FFFFFF',
        color:'#5ce65c',
        closeOnEscape:true,
        closeOnClick:true,
      })
};

export const errorAlert = (message, title, position) => {
    iziToast.error({
        title, 
        message,
        position: position || 'topRight',
        theme:'dark',
        progressBarColor:'#FFFFFF',
        messageColor:'#FFFFFF',
        iconColor:'#FFFFFF',
        color:'#ff0000',
        closeOnEscape:true,
        closeOnClick:true,  
      })
}