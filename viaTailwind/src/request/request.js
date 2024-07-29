const apikey = import.meta.env.VITE_API_KEY

export const getSearchValueData = async (search = "pokemon", pageNumber = "1", year = null, type = null) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=96521a8e&s=${search}&page=${pageNumber}&y=${year}&type=${type}`);
        console.log(`http://www.omdbapi.com/?apikey=96521a8e&s=${search}&page=${pageNumber}&y=${year}&type=${type}`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
};

export const getUniqueMovieData = async (id) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=96521a8e&i=${id}&plot=full`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Hata durumunda null döndürüyoruz
    }
}

export const getSeasonDetail = async (id, seasonNumber = 1) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=96521a8e&i=${id}&season=${seasonNumber}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Hata durumunda null döndürüyoruz
    }
}