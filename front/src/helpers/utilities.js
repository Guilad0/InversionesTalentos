import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
export const orderByName = (clients) => {
  return clients.sort((a, b) => {
    let nombreA = a.nombre.toLowerCase();
    let nombreB = b.nombre.toLowerCase();
    return nombreA < nombreB ? -1 : nombreA > nombreB ? 1 : 0;
  });
};

export const orderByEdad = (clients) => {
  return clients.sort((a, b) => a.edad - b.edad);
};

export const orderByPrice = (clients) => {
  return clients.sort((a, b) => a.monto_inversion - b.monto_inversion);
};

export const getAge = (date) => {
  const fechaNacimiento = new Date(date);
  let edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
  const mes = new Date().getMonth() - fechaNacimiento.getMonth();
  if (
    mes < 0 ||
    (mes === 0 && new Date().getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }

  return edad;
};

export const porcentajeTrue = (verifyRegister) => {
  const totalTrue = verifyRegister.value.filter(
    (item) => item.status === true
  ).length;
  return (totalTrue / verifyRegister.value.length) * 100 + "%";
};

export const getUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user || !user.usuario_id) {
      return null;
    }
    const { data } = await axios.get(
      baseURL+"/users/getUserById/" + user.usuario_id
    );

    localStorage.setItem("usuario", JSON.stringify(data.results[0]));

    return data.results[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  } finally {
  }
};

export const getDayStartAndEnd = () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDayFormatted = startOfDay.toISOString().split("T")[0];
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );
  const endOfDayFormatted = endOfDay.toISOString().split("T")[0];
  return { startOfDay: startOfDayFormatted, endOfDay: endOfDayFormatted };
};

export const getYesterdayStartAndEnd = () => {
  const now = new Date();
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );
  const startOfYesterdayFormatted = startOfYesterday
    .toISOString()
    .split("T")[0];
  const endOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    23,
    59,
    59
  );
  const endOfYesterdayFormatted = endOfYesterday.toISOString().split("T")[0];
  return {
    startOfYesterday: startOfYesterdayFormatted,
    endOfYesterday: endOfYesterdayFormatted,
  };
};


export const  getWeekStartAndEnd = () =>{
  const now = new Date();
  const currentDay = now.getDay();
  const daysSinceMonday = (currentDay === 0 ? 6 : currentDay - 1);
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceMonday);
  const startOfWeekFormatted = startOfWeek.toISOString().split('T')[0];
  const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6);
  const endOfWeekFormatted = endOfWeek.toISOString().split('T')[0];

  return { startOfWeek: startOfWeekFormatted, endOfWeek: endOfWeekFormatted };
}


export const getMonthStartAndEnd = () =>{
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfMonthFormatted = startOfMonth.toISOString().split('T')[0];
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const endOfMonthFormatted = endOfMonth.toISOString().split('T')[0];

  return { startOfMonth: startOfMonthFormatted, endOfMonth: endOfMonthFormatted };
}


export const getCurrentYearStartAndEnd = ()=> {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1); // 1 de enero
  const startOfYearFormatted = startOfYear.toISOString().split('T')[0];
  const endOfYear = new Date(now.getFullYear(), 11, 31); // 31 de diciembre
  const endOfYearFormatted = endOfYear.toISOString().split('T')[0];
  return { startOfYear: startOfYearFormatted, endOfYear: endOfYearFormatted };
}


export const validarNombre = (nombre) => {
  const regex = /^[A-Za-z]{3,}$/;


  if (!regex.test(nombre)) {
    if (/\d/.test(nombre)) {
      return "El nombre no puede contener números.";
    } else if (nombre.trim().length < 3) {
      return "El nombre debe tener al menos 3 letras.";
    } else if (/\s/.test(nombre)) {
      return "El nombre no debe incluir espacios.";
    } else {
      return "El nombre solo debe contener letras.";
    }
  }

  return ""; 
};
