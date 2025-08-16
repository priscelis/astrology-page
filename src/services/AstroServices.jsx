import axios from "axios";
const realAPI = "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot"

export const getAllButterflies = async () => {
    try {
        const response = await axios.get(realAPI);
        return response.data;
    } catch (error) {
        console.log(`Error al sacar las mariposas en ButterflyServices: ${error}.`);
    }

};

export const getOneButterfly = async (id) => {
    try {
        const response = await axios.get(realAPI + id);
        return response.data;
    } catch (error) {
        console.log(`Error, no se reconoce esta carta 
            ${error}.`);
    }
}