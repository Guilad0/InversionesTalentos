<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { onMounted, ref, defineProps } from "vue";
import { successAlert, errorAlert } from "@/helpers/iziToast";

const enlace = ref('http://localhost:5173/marketplace');
const mostrarBoton = ref(false);

const props = defineProps({
  client: {
    type: Object,
    required: true
  }
});

const baseUrl = "http://localhost:3000/preview/";
const exp = ref("");
const logros = ref("");
const prom = ref("");

const router = useRouter();


onMounted(() => {
  console.log(props.client.usuario_id);
  obtenerDatos();
});

const showClient = (user) => {
  router.push({
    name: "client",
    params: { name: `${user.nombre}-${user.apellido}` },
    query: { user: user.usuario_id },
  });
};

const obtenerDatos = async () => {
  try {
    const { data } = await axios.get(baseUrl + props.client.usuario_id);

    exp.value = data.data[0].experiencia;
    logros.value = data.data[0].logro;
    prom.value = data.data[0].promedio;

  } catch (error) {
    console.log(error);
  }
};
const copiarEnlace = () => {
  navigator.clipboard.writeText(enlace.value).then(() => {
    successAlert('Copiado al portapapeles', 'Enlace copiado');
  }).catch(err => {
    errorAlert('Error', 'No se pudo copiar');
  });
};
</script>
<template>
  <div class="col-xxl-3-custom  col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 ">
    <div class="card m-2 rounded-3 position-relative p-2 shadow">
      <img :src="client.imagen || 'https://cdn-icons-png.flaticon.com/512/6429/6429059.png'"
        class="rounded-circle border m-auto border-2" width="150" height="150">
      <div class="custom-absolute">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTExMVFRUWFRUSFhUVFRcVFhUVFRUWFhUVGBYYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGyslICUtLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tN//AABEIALkBEAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgEABwj/xAA+EAABAwIEBAQEBQMCBAcAAAABAAIRAwQFEiExE0FRYQYicYEUMpGhQrHB0fAHI1KC4WJyssIVJTM1c5Lx/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMAAQQFBv/EACsRAAICAQQCAgEDBAMAAAAAAAABAhEDBBIhMRMiBUFRFGGRFTKx0SNxgf/aAAwDAQACEQMRAD8A+Yhi6GK4MXQ1d3acbcVhikGKwNUgxXQO4qyL2RXhi7kU2g7wfIvZERkXuGptJvB+GvcNE8NTFJXtKeQE4a6KaMFJTFJTaC8oEKSkKKNFJSFFTaA8wCKSkKKPFBSFBTaC8wBwV0UUwFFd4Cm0DzAHBXuCmPAXOCptK8wvFJd4KYcFe4ClE8wv4S7wUw4C5wVKK8wv4S9wUw4C5wVKL8wAKS5wkwNFR4KqiLMAcJcNJH8JcNJVQXlAOEucJHGko8NXtCWUC4aiaaONNQdTVJF+QEDFLhogU1IU0/aXvBgxTDEQKSmKSm0B5AUMUxTRIpKYpKbQHlBW01LhIsUlMUlKAeUDFJTbRRgpKYpKUA8wGKKmKKNFJWNoqqFPMAiipiijhRUxRUoW8wvFFWCijhRUxQUoB5gEUV4Ux1aPUgfnzU8XvG27JIkmco6kLHVb6q5+bMZO/OB0j0XO1ureL1h3/g6eg0jz+0+jVsv6DXZXtJ0mZjXmByKvdd0crIpOdnI+WfKeQ06/oslSv2yQ/MWgjLmMgHnPsnFkXBoAc3K5z6Z0c1wY4S1wcDMaHvp6riTz5rtzZ3oaTClW1Glba274LSWCcpBiQ70PNQucILQHNOdsSSBEanl0SM2DMrQ154hfDXhxJcRuCCY1BTgXxohwpCQCHBpjM1roziOYkHRTH8hqMUl7bl+GJzfH4ZxdKmCmgucFaC7tWuaKrIAdBLR+EnqgTQXo9PqIZ8anE8zqITwZHjmLTRXOCmJoqPCT6M6ysXGko8JMDSUTSV0GsovNJRNNHGmoGmpQayAJpqJpo001E01KDWQCNNQdTRxpqDqavaGshLD8FrVp4bZjvE9gjj4Tuwwv4UgQSA5pcJMRlBmVp7Z8NDG6NgCAn2HTIE6fzVZMmqlFnUxaWM+2fJnUCDBEEbg6Eeo5LoprZePbMCu14bGdgl3Jzhof0WZFJbcc/JFSObqLxTcH9AopKbaSLbSVgoomZnlBBSVjaSLbRVraCpsU8oE2irW0Ec23VzLZC5JAOche2grG0ExbbK5lsheRIqpMWC3VrbZNGWqvZapbyhrE2KW2itbaJo+m1jS5xAaNSTsEI2oPixTBmKQcANTrJn7BJyahLg0Y9HKRhPH7S19Mf8LnDrM6T1WXo1uWg785POYW5/qLUD2syua4Nc4Q3U7wXT0kFvqsRwj0B215dtVxdXLdmbPTaGOzDGJfTJJII15uAkbbEcz3UzWqDKAYDSSDtv67jp0kpp4bwovfFQVGDTXLoCdWuJO0GCib7CKZfSpkxUz3YqtbDiHMyFoaByObT1QRw7lbNMsiTALLFiKnmDcv4iWiA6PmHQ95TijUNJrnjK403Q15BzZXuktceuo39lzDvANy4AuaGNicrvmETEge2iptaL2F9GoSCY5SZGrZ9gFlz4XBbgoZ4SdJm0wa44lITGZwlw6wQCfuFA26WeFbSo6pm1DQDOnfb+dlrDbrofE7oKV9Wcb5aMcko12JDb9lA26dm2VT7dddZTjPTsSOt1U63Tt1uqXW6NZBbw0JXW6rNBOXW6rdQR+QniYndRVZpJu6gp3OE1WNzOpuDTzI0V+RfYUcM2rSYiNJVPYtLhGGMqOJqEhjYJjdxOwH7p+3DrcyG27IiCXTp7oJ6iMXVGvT6OeSO66E9FsJ/hMEiUpkGNNuabYUySsOV2jt4I0wXx0/y06YA1JeT6aQFjhSX1W+sKVYBlRs5dQZiPdZ/EfCUEmk4RuWu0jsCm6XUwjFRZg+R0Gac3kjyjHMoK5tBOq2DPZuNt41THBMFa/zPkDkB+a1y1EUrs5kNFllPZXJmm0EXbWRcQAJJTq4wciplZqCdO3Upvh9tToNJe4CdC+YHoEnJqUo2PwfHTlPbLozVbDHUzDh+xXmWih4n8SAumhHlEamc3+nlzWQpeKKrnOIkES7bQa7EHUhc2XyXNUdD+kK3ybbggbkBWim0bkD1KxeKYyajg9xGUgeVmpaRuZOyf4detNPPUbmpsaH541c07RrvOnJLfyLcqS4GL4xKPLH7Lb91mfE3iPgsHBLTmluedWkcg07+qdYb4usqmVvEyFxyta8HXkNRoJWB8Ti3ZUqta7MxjjG+UH5SzO4amRsJ3V59S3H1YeDSKMrkRxzHzcWnDeQKjXsfEwHsO5cOo0I9UotMadaP4gh9TLlhxOgIgajXnKSV7g1HFx0EBvs3b9Poqa9af3WNyk2uToxxRSqjS4P4oYymaNekKtLPxNyHh7okh23Lp1SjxD4jdXquNIcKnAY1jQ1pDRG8bnTdKajuXuVBhTFNkWOKdolRBJEk6909wIup1A9roeCSHSc31QWFse5wyBpI6xJ7Ac/RF07XM0mNZkBrhmBG4g8uwSJzf5oKr7Pq3h7xaXwKw32eNCfUfqmeJ4da8Vtd7hqAdNjliHGPQr5NhlNzWODs7ddDJkdI0W2wXG2y2lWYcrjkLt9joQN8p9EuGqyR9JVJCJ6ePaNvStm5RlAynURtrrK6aCGx7G7ewogu12aymD5ySJEzsNN1nMP/qC2qDNHIQR+KRH4vcLqPURiuTItNJ8pGoNFVOoIWw8U2lZ7mteRl/E8ZWuHODy5oy1xKjVJFN2bQGQNNTGhVrUw/ID0r/AO6grrLDmvkuJAEDTuj3WhUQIkcyn+TjgCGnSl7Lgod4fadqmnpr+aoufDp/A4OGvZNbaid3EiDsimtEaGEt5px+zYtFhmv7aM9Rs/hxmcGl5OgicojXtKLta7qocS4gcwQC0g/qoYy0+qDaSxkGRJmPyKK3JW+yQisfqugqjb0GDy09dZMmSCu1K1Okw5TvrldzQRxAbAQPvKV3FQkolHc+SOcYqooLFhUDS4tgA66ovDa+UpvVpMIIOyV1GNa6Gzp1Q79yaYfj2NUPWuJAIU2VDsQhrKuIR7SHLO+OzTHkW3x5Ky0BERpzUriiGn1U6LSPMdoTE/WhDh7WymTnJKR/1Ao1HW0sc1tNvnqZjl22gp46BqSABqSdAAsX468T0xTNKn5xE1CR5cuoAB6yl5ckUqbCj2fPX1CCGNcYJ3dpPp1CCxQvY/5p21HUd+a5aVGOa7K52cCRJBkc/oiqNvSe3Rxl0A5hzO0ETEn9FilOMVbQ0jQuIa0iSZAjfUHVfQravTfbuoMpZSTqdQSZD5HbWI9VhRgVYHLTykSDLngfZarAMPr0g7ikGTIAdmAHTssOq1G2P/ABy/2W0ZW4wqs2qc7GFodOQv1InnGyjitrV+YtIb0aPKOy3rKVMnz27XmdwdfcaSU7pWLHsH9ot7EALdo8P6hKTkZ8ufZwfCK7gg6j19mxfwfRqDRoB7L5/jnhE05LVu/p8lyuRcddB8MyTipU2yQNp5rlei5hghVtOusxzSJQkuGjXFqXRqLF1JhENB29e+qbfDtOUtIBcD6ujaRoOqxzbz8LG/WRtyRVK8LjlkDK6WmTII0IHQLLkwtsOjQUCRfMAdGSnnLdYD+Xvqthj2INqUTUIAq0YdnAgkTqDHsvn3h6i51y41CQHgy8H/AB1J9Vu8WuTXY+lSAAqAtLo0JG2/aD7qTljhCpNF8UZatWfdPlzi/kS4yRrI1OqGoNJe4HysAB2IzN20HVaXC/DlwwQ91NzQQYc08teXcfZRbf0WPfSLWGQ0FkhocW6w1z5j/ZY454t7Y8ldCa2uwPKCGkCWkjQ6GSRyJT7BLioCxzWxlOYxpGuhA9Urr4bxqjTTY1jCQ4OhztxBY5/MyPm03W7wfBWhzDUcQWZD5AQxzhMiHa9FU1jfbpl2bCzu3mkHOEHSQefqOSl8WDu0fRVudmGiHdTK7WKnFU7EybvoOqXkiAYVNAh27vZcbZN/E76f7qFS2ZycR7I6RPYsqcLciUtxAB5kchEIj4Ek/MI6qt9AN/m6ONL7AlbXQlqUVW+kmdSkqjRTlMzOAymVQ+gZmEYKatpMSro0VfZTQMJlaOCGLNIRFClAQS5Q2HBfVohxVhptDdYAGpJ2A5lcYQEu8UXAbZ3DozRReY66JdsOkfLsQ8X1Lyq9nlbTpuLWtaSM8OMPdOs6eiEr08w8zc3aV84o1nMgtMen8/kJ9Y+J6jfmAcFg1WmnKW5AItur406nloBgiB5Zce4P00UnYy1lIeQCo4+bywImZ7dUxo+KabhDhE7xv9ULVoW9R+ZtU6fhLQQl7ml7qgki/D2Nui3LUDHgGRq47/MATqt9hj6OZralRoqAeVrnhjn/AOkbjnEr5u7CXF+YXLQDGmUtGnoVqqDwGNa5zXlo3O+3VKeTFjyxm+V+AckJSi0jfOqAbNHtp91A3H8/gWNtb1zRDcsf4nT7hW1MULfmYR33H1Gi9LptZpsy4kk/w+Dg58WeD5TaNDc3g5rOYwZB6IKrjDTs72B/RLrq+kbrqRUV0zB7yfTEWIWzSdkvfhoOwTG4qa7q7D2vJBYCSDIMae5OixahwUW3X/p1cMp8JChmEHfKfp/sm1v4cfWdoWM0B1mSZM6R0K13xlNgBqFjTEmO2pgblBUvFtKWQ3RzsrTyIGhd2Xk563UZL2xSR2IQS7Y1sPD7W6mC6ACTsYEbJ1bWDRuB7KVCo2JB0RHxAXFnvlK5Mcorsmyi1ze2og6dljvE3hmwpjjVDVZ5hqw5tSdDlIgrX/Fqm7pUazYqMa8dHAEJ2HI4PhhNWjJeEsPo1Nbe4qSwglrw2SJJAMaRJX0Kk0wJ35/qkuHWdrbSaTGUydDHREvxlg/EPqmznulasuK2jdjsqtbeszNaSAXSGydyFj73xO1o8pmZg7NHustXxd1arncTLIyidGmYMR1n7LZpZZIOwZtM+wVKLlQaR6KXh2849ux50Pyn1GiZcLuu3GVqxW0VtolefRKZPp6bql1EotxTiK30lEW8kJoaI6KIpdle8BwO/DqbKMIhdAVtlpFPBlWBimpBCWiBal3iLDzXta1EGC+m5oPQxI/JNSvSqLPyRc0y0wdxP27KNNwhbX+qeAMtb0tpzlqsNcAjQFxdma08xI9lhEdWiougt9Lmq3kjVpgqNOsuGpqgcfyNpF9O7qDc/VSGKPHUQP1QbqqvfBGqVLFF/RNthlLGnj8RTKy8QPaR/cPp0WdYyD9/ZepsLp11E+v0SJYMb+he031LxA1wHEax/wDzMBP3VjsVtedGmP8AQAsPbjkTp6azyRNd2Q7TIBB15LP+nSdKT/kmxP6NX/4rbj5WUx/pCExDxZlbAaD7whMFt7e4e2m5mVznEDzkcpJT2/8A6e0BSfWLn5Wgl0P1HKYI1VrTLuSbX8kpJ0ZK4vHVKTajjLw4b6y1x+X0U7pjWOpZZiNGgyGmfNEiR2RN7hNrTaIq1nQdgWCOhkj7LQeF8Fp3jSWtHlcG+c6nylw2/EIM+q0J2vRWXJbey/D8aAAl3M8iNOQM80a7HGDn2RN/hFOhR4uamWhwa7SSCdJHVZG/xJp/9NupGpOkxpo0LnZNJc/ZUNwx3K7Hdx4hMw2eWuw179UvuvEr9WhwDhoADJKyN215JBLiN9SRG+wlew+0kj25H6psdLiirYPI2vPEZLiAah11GjG8vU+65b3jqocT5OmuZpBgEfzquswzOZ3JaBtpvoURilp8KxrCPM7K89gXDT8kxODVRQccfDbO3LiWsHmkv16TGgjp+yJdRyOnKYNJtQxoNXtpj7kKq/kCn3qCR6Nk/dbTwh4cNyajyZZkp09eorMqlvoWkqsacnQqSN54Ms+HaUhrJGYz1OqdGmu2luGMa0bNAaPQaK4tXQjwqCoH4YUHsRJAXCFZQGaS8GIpwUQFdlAoeu8RYfxDjVw52W3kMiCRBLu/UJngGPuqiKrCwgDzHTMRvE/VEs+KT4kv5M1yX0afMuhywFDxtUddCmGDhl/DDQPNqYzStpxv59gmVfRXk+gsPXcyC4y9xlNhfkQJ4hwGhdtJqU2ufwqlJjyJLBUGse4Gq/Mt9bOpl9N4Odjy13QFuh/Jfqfir4H4goh9/d0mtgOcDESSWvaSe2jnK9pFMxQbodYj7qLDqtF45wcWl7WpsEUw4PYNwGv1aPzCQVBzjdRofGVoredVYH6QovbouNCCg0wq2qNDgTqOaLs6rASDAmd/3KWhxiAoijO/87BJni3F1Y1q3AfUIpgHyebXcjoOqubTDqWfN8oMCORKWG2NMgkweg0hN8FcCHNcJ3Hch2n2WfJHYuCU4uwTDKwbcsLdw4n7EaL6FaXTnYXVk/hc0nrAcvmVgYrt9f3EL6Bhz/8AyusOgJ/6l0Ma9DNmfumYd9Q/LJOm/wBE78L3LmUXkEg8SRr1pws67Uz/ADZPsJbFE/8Ayf8AYlQjttjcktxsMaqzhjZ0zVCSfR8rPYZhnEcHOGhiOsJ7iTC6xtWf5VHfYkplheHaEnSG/bos+dNzHaZLaZm+oUXHQxByxHTmmeA4FSqkxBA58+0BSxewp0WtJa4yZBDZ5gxrpOim2vWo0wabWgu8gzEucJ5gbLG8Tcv2H17WafDsKpNdzjNoNJPOT+fuk3iHATWD6rG5uHJJ3JAcNAOkSmGAYU9lKpWJdUqlhguM6xy5BanwxZGlQaHTJbqTvJ1MrRjwXxRc8kYwZ8cxSkWi3byLQ/vqXN1/+u6+yeAKBZbBx/GZjpEN/QrPeJsDNS7sqdNo4LGkuEABjWbEO3Mk/KekrZYbSbRptpt2aI9+adj0+2Rz/KN+IouqoM1lHjJ+wnkCy9cL0LxUr8R4oaFB1QGCIA9yi2MB5UMrnFKTHBjntDnEAN5mURnXw2/xZ76zqmZ2YuzAncGdPott4f8AE9ZrIrtc6DLXEw4g7iEOVwxK5SoCOSUnSRnRiTRuY5Si2Xff9l82ffc80n1R2CY1ULwxzSQdtOfX0XmZ6GSVxNqyG+p1252vLRmaQQ7mCO6Or+N7em7JUcWuDc3bfb1Wap1z/wDqU+JrHiszNaM45846d0zQarJintvgHLjU10fT8OxunXpipTdLTI7yOqJ+LXzD+nlw5jasuGUEEifMCAZ05CAmbPGAL4yeWT5p5dwvVqa2JyORJS3NR+jffFrJPwGMSF2zKKZY7ODqS4iFQzxPTL8gzbxmjT19Ecb5OjGM+hcskoLkA/qHgzK9F9ZpDarGtJJOjmsk5fq4rI1fCbCy0IcTxyc5aJygtaQfYkrbXl2XMc3q0jUZhtzCja3Ia1ggDK0ACIA9By2V+G2VHVOMaPkF1alrnCPlcW/QwhuEvp+I4VTquqO2LspBHWIPtoFk7i0yEtc3UJM8LidDBqY5FwZ5lNMMHojMXEfKNAdp6ompREaBdtKRaD33SJxNsHyLrgucZdzE6e37onB6hbUGu5A6o+pZzBy6agekKi3tsr/fpz5LNlhcGFl6FdBv9/8A1H8ytzhn/t1cf8J/NyytK3/vTEeYmOmvJbTCrc/B1RG4I/NdHFCoHOyytmADNlo8MozTA61R/wBIV1pgAdBPRafDcHYxg5+bMPWEqX4GJOrDX4f/AGKA/wAA8o/CHCCT8pmO/T8kPijnhlNoG8g6ImjZuFMQIjUJE4c2asORVRfd2wq08pEgkVI7Ngx6nb3KhXwzNVYMpDWiT0BP6o01hSbLjqRACAF/znv7o8Wnc+WL1OtWLiPbNHb1WsaGt2H8lWC77rNfHd1749a1iOU9S32aT4oL3xSznx3de+O7qeIrzmjFyo/GtkNzCSMwE6kDcrNXWLtpsc9xgNBd9Nh7rNWGPCs5z5lx300aOTQeiw67P+mhuqzTp08r4PotfE2N5yegSbHLltwzhklrTqYiSB6rNVsTGypdf8yV53L8nqcj9fU6EMEI98guLYpRs3CnTpAvIzF7odE/lsEqwzxC8kmq4mTIPSeXohrzDw8vqOcXZnGAPbc8ygW4VUzTlkA6N/daF45w93bLXHSJN8L19/7ZPaoP1COtsMuaZnKD0yuBVjb/ALrjsR7hLnlzT7ouohVN9dvzUn+sSinNL2w5pE9iClTcUO0/RX0sTf1SJY5fSLvgNoWuXzNJBjI7QEOH/F1S68wF51DgR7zHRH08Y6gHvEIqletcdyPuEUdTqMf/AEBsi3Znjh9caBpIH0/NPqV04NAduAAUUaQOoePdLsQtnjzDbmQR+67fxnycZT25KRz9bppONxCDdrhu0nuH5RrM+0IF98eq9Biz4st7H0c2enyRqzSG8Qt5kqDzb9eaQG+PVQN6eqY9rJHHNO0Nadmwbun7K2lZtJgdZ9uiRm8PVRN87qkTxQapGvFkzRlbdo1TgGtyiJG59efqllxZncSZ1lD4djDWn+4NNpH6hHVcdozAn1A5BZFDa6o6EpqfKZZhmEEvaXeq2tnasbRLVmbK9Y8jhuDoEmN/dPW3TG0iXvDBtJMb7IpTAjjAqDf7nl2mJWvsrQBoWKpeIrSlIzl5GnlbmB9CiK/j+k1oFJjnu138oG31S9kn0g98Y9s2942mxud5DWt5nukWI+JWAAUdSebh8vssNiHiivcHzu8u4Y35R+6HZekrRjwRX9xizamT4gaSpfOcZcST1XhdpALxSF4tK2/Rz2pXyPvi174tZ8X4zBuuvPkPU8lOjVqOeR5csCMpk6cysstZhjPY3yOWlyOG/wChxXxVrBLjH3KstrzifIZ+yzdzhNao4lxawd3a/QJlh9Jtu2DULidSAIn66rk5/mHC9lP8G6Hx6aV2FY1auqsycQNafm0knoBrohrPCCwEMIa2Z5k+vJcq4u2dB9dUHWxdx5mPouJlz6nO7mb8WPHjVRG9PDKTfM8lx6kx9giDXpbBo066rJ1cQPMqn47v90r9NOXbHbkbD4ukOTfoq3YoNmx9v2WPffRzUTiB7oloibwH4wqo3HRC51zOuv40ZrD23KuFx3SuVHiKPEmSx3Tr90Sy66FZ9twVay47pcsBRqKV+dpCvdcFwid+SzdG76lENvx3WWWn5tBKQ0Fqw6Gfqr2YZbu0JcD1Bn7FLKV2Ov3VovB1Vwnmxv0bRHGMu0F1PDrTOSq09AdCgbrCCzQNzbGQRGvQDdE0r3uVcLpu+s9iAtcPkNQmt3IPgxpcCOpYKl1j3WnGIMG7C7/mIP8A2pXdXLCfK3L/AKp/NdfT61ZXTi0Y545R+xT8Cf8AJe+BP+SPNVc4/ottC98gWlZ1AZa8g9RoVdc21apHEqOdG2bWPbZGUblXG6CHag/JKhS3Dj/kVeyyjmUSblQdcBX0LbbJMpAIqlSc75Wk+y7Z3lMb05PUu/RFVr9p/wAo6ZhC5uf5BwdKLHQ06l2ztLC3nVzmt9Tr9ArjY0W/M8uPaAEA6+A6qh16Oq5eTXaqfTpfsaI6fEv3C69vTP7fzdV0gGGW79SZKDfdjqhn3wHdZdk5dtjeEOH3xA0P3QNa9ncyldS8lC1Lnum49NRHJjN9yqX3HdLXVyqnVitEcAIyqXHohzV6oPOuh6YsaRAg1pO64a5VBcuFyLaSyvOvZ1SvJtF0XZ1wuVS6VKIWZl0PVS61SiF3FXhUPVVLqqkUGMrKQqnqhApIHFErgY0qx6ounXKU0d0QxLeNWS6D3XHdCvrKhygV09NBR6M+R2y/ir3FVC6FrsVVBTLhSdcIRRKhKCjXK5xkOF4qEoNo3Ec0Qa/dKwplc/U44uVjsbCKtwUI+qeq85CVN1jjBD0Xmt3VVSqVWqzzRxiiyziKJeq14o6KJly5mVa6okWTzrweoLyuiEy9cLlAroUIf//Z"
          width="25" class="rounded-circle" alt="" />
      </div>

      <div class="card-body">
        <h5 class="card-title fs-6 text-center">{{ props.client.nombre }}</h5>
        <div class="d-flex justify-content-center">
          <div class="col">
            <img src="../assets/svg/cardlogro.svg" width="25" alt="" :title="exp" />
          </div>
          <div class="col"><img src="../assets/svg/trofeo.svg" width="22" alt="" :title="logros" /></div>
          <!-- <div class="col"><img src="../assets/svg/details.svg" width="22" alt="" /></div> -->
          <div class="col" @mouseover="mostrarBoton = true" @mouseleave="mostrarBoton = false">
            <img src="../assets/svg/links.svg" width="22" alt="" />

            <button v-if="mostrarBoton" @click="copiarEnlace" class="btn-copiar">
              Copiar Enlace
            </button>
          </div>
          <div class="col"><img src="../assets/svg/like.svg" width="22" alt="" :title="prom" /></div>
        </div>
        <div class="text-center">
          <label class="card-text token py-3 m-auto">Precio de token: ${{
            props.client.monto_inversion == null
              ? "00.00"
              : props.client.monto_inversion
          }}</label>
        </div>
        <div class="row mt-2">
          <button class="btn btn-gray" @click="showClient(props.client)">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.token {
  color: var(--gray-color) !important;
}

.custom-absolute {
  position: absolute;
  bottom: 30%;
  right: 5px;
}

.card {
  border: 1px solid var(--gray-color);
}

@media (min-width: 1400px) {
  .col-xxl-3-custom {
    width: 20%;
  }
}

.btn-copiar {
  display: flex;
  background-color: white;
  border: 1px solid black;
  color: black;
  font-size: 0.65rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  margin-top: 0.5rem;
  border-radius: 4px;
  text-align: center;
  width: 95px;
  position: relative;
}

.btn-copiar:hover {
  background-color: #f0f0f0;

}
</style>
