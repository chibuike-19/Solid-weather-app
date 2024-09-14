import axios from "axios"

const getWeatherDetails = async (query) => {
    const {data} = await axios(import.meta.env.VITE_BASE_URL, {
        params: {
            q: query,
            units: "metric",
            APPID: import.meta.env.VITE_API_KEY
        }
    })
    return data;
}

export default getWeatherDetails;