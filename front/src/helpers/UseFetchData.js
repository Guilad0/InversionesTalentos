import {ref, onMounted, watch} from 'vue';
import axios  from 'axios';

export default function useFetchData(ruta){
    
    const results = ref([]);
    const next = ref('');
    const prev = ref('');
    const isLoading = ref(false);
    // const baseURL = 'https://apitalentos.pruebasdeploy.online';
    const baseURL = import.meta.env.VITE_BASE_URL;
    const total = ref('')
    const getData = async ()=>{
        try {
            isLoading.value = true;
            const { data } = await axios.get(`${baseURL}${ruta.value}`);
            results.value = data.results;
            next.value = data.next;
            prev.value = data.prev;
            total.value = data.total;
        } catch (error) {
            console.log(error);
        }finally{
            setTimeout(() => {
                isLoading.value = false;
            }, 1000);
        }
    }
    const ChangeState = async ()=>{
        try {
            isLoading.value = true;
            await axios.put(`${baseURL}${ruta.value}`);
            getData();
        } catch (error) {
            console.log(error);
        }finally{
        }
        
    }

    watch( ruta, getData);

    onMounted(getData);

    return {
        results,
        getData,
        next, 
        prev,
        isLoading,
        ChangeState,
        total
    };
}