import axios from "axios";
const realAPI = "";

export const getAllButterflies = async () => {
    try {
        const response = await axios.get(URL_API);
        return response.data;
    } catch (error) {
        console.log(`Error al sacar las mariposas en ButterflyServices: ${error}.`);
    }

};

export const getOneButterfly = async (id) => {
    try {
        const response = await axios.get(URL_API + id);
        return response.data;
    } catch (error) {
        console.log(`Error al sacar una mariposa en ButterflyServices: ${error}.`);
    }
}