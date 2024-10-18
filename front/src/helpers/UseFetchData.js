import {ref, onMounted, watch} from 'vue';
import axios  from 'axios';

export default function useFetchData(ruta){

    const results = ref([]);
    const isLoading = ref(false);
    const baseURL = 'http://localhost:3000'
    const getData = async ()=>{
        try {
            isLoading.value = true;
            
            const { data } = await axios.get(`${baseURL}${ruta.value}`);
            results.value = data.results;
        } catch (error) {
            console.log(error);
        }finally{
            isLoading.value = false;
        }
    }

    watch( ruta, getData);

    onMounted(getData);

    return {
        results,
        getData,
    };
}