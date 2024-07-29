const apikey = import.meta.env.VITE_API_KEY

export const getSearchValueData = async (value = "pokemon", pageNumber = "1", year = "null", type = "null") => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=96521a8e&s=${value}&page=${pageNumber}&y=${year}&type=${type}`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Hata durumunda null döndürüyoruz
    }
};

export const getUniqueMovieData = async (id) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=96521a8e&i=${id}&plot=full`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Hata durumunda null döndürüyoruz
    }
}