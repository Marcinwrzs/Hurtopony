import { useEffect, useState } from "react";
import api from "../API";
import { MovieTable } from "./MovieTable";
import { Box, CircularProgress, Container, Pagination } from "@mui/material";

export interface MovieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieList: React.FC = () => {
  const [movieList, setMovieList] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 500;

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await api.getMovies(pageNumber);
      setMovieList(response.results);
      console.log(response.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <MovieTable data={movieList} />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              shape="rounded"
              siblingCount={4}
              boundaryCount={1}
              sx={{
                marginBottom: "40px",
                maxWidth: "1200px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default MovieList;
