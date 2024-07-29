import { toast } from "react-toastify";

const apikey = process.env.REACT_APP_APIKEY

export const getSearchValueData = async (search = "pokemon", pageNumber = "1", year = null, type = null) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${search}&page=${pageNumber}&y=${year}&type=${type}`);
        console.log(`http://www.omdbapi.com/?apikey=96521a8e&s=${search}&page=${pageNumber}&y=${year}&type=${type}`)
        const data = await response.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        toast.error(error)
        return error;
    }
};

export const getUniqueMovieData = async (id) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}&plot=full`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Hata durumunda null döndürüyoruz
    }
}

export const getSeasonDetail = async (id, seasonNumber = 1) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}&season=${seasonNumber}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Hata durumunda null döndürüyoruz
    }
}
export const getEpisodeDetail = async (id, seasonNumber,episodeNumber) => {
    try {
        console.log(id,seasonNumber,episodeNumber)
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}&season=${seasonNumber}&episode=${episodeNumber}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Hata durumunda null döndürüyoruz
    }
}
