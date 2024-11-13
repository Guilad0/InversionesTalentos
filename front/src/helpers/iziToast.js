import iziToast from "izitoast";

export const succesAlert = (message, title, position ) => {
    iziToast.success({
        title, 
         message,
        position,
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
        position,
        theme:'dark',
        progressBarColor:'#FFFFFF',
        messageColor:'#FFFFFF',
        iconColor:'#FFFFFF',
        color:'#ff0000',
        closeOnEscape:true,
        closeOnClick:true,  
      })
}