import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

class API {
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWVkZTJiYmRiYTM5NmZmNjJhMGUyYjdlYTdiYzFkZCIsIm5iZiI6MTY2NzU0MzIyMC40NzUwMDAxLCJzdWIiOiI2MzY0YjBiNGU2MWU2ZDAwNzkxNmZkODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pwNZS944Zn7NrcgDAP5x6_yMKsaD8c3udEfS0-hMdH8`,
      Accept: "application/json",
    },
  });

  async getMovies(page_number: number) {
    try {
      const response = await this.axiosInstance.get(
        `/movie/popular?language=en-US&page=${page_number}`
      );

      return response.data;
    } catch (error) {
      console.error("Błąd podczas pobierania danych filmów:", error);
      throw error;
    }
  }

  async getMovieDetails(movie_id: number) {
    try {
      const response = await this.axiosInstance.get(`/movie/${movie_id}`);
      return response.data;
    } catch (error) {
      console.error("Błąd podczas pobierania danych filmu:", error);
      throw error;
    }
  }
}

const api = new API();
export default api;
