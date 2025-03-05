import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import api from "../API";
import { Grid, Box, Typography, CircularProgress, Paper } from "@mui/material";
import paths from "../paths";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface MovieDetails {
  title?: string;
  overview?: string;
  popularity?: number;
  vote_average: number;
  vote_count?: number;
  runtime: number;
  release_date: string;
  poster_path?: string;
  backdrop_path?: string;
  origin_country: string[];
  genre_ids: number[];
  original_language?: string;
  original_title?: string;
  adult?: boolean;
  video?: boolean;
  budget: number;
  revenue: number;
  status?: string;
  tagline?: string;
  production_companies: any[];
  production_countries: any[];
  spoken_languages: any[];
}

const Movie: React.FC = () => {
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];

  const [loading, setLoading] = useState<boolean>(true);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    title: undefined,
    overview: undefined,
    popularity: undefined,
    vote_average: 0,
    vote_count: undefined,
    runtime: 0,
    release_date: "",
    poster_path: undefined,
    backdrop_path: undefined,
    origin_country: [],
    genre_ids: [],
    original_language: undefined,
    original_title: undefined,
    adult: undefined,
    video: undefined,
    budget: 0,
    revenue: 0,
    status: undefined,
    tagline: undefined,
    production_companies: [],
    production_countries: [],
    spoken_languages: [],
  });

  const navigate = useNavigate();

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.getMovieDetails(id);

      setMovieDetails(response);
    } catch (err) {
      navigate(paths.notFound);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(Number(movieId));
  }, [movieId]);

  const getRatingStyle = (rating: number) => ({
    backgroundColor:
      rating < 4
        ? "#b22a00"
        : rating >= 4 && rating < 8
        ? "#ffc400"
        : "#618833",
    color: "white",
  });

  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!movieDetails) {
    return null;
  }

  return (
    <Grid
      container
      sx={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        paddingTop: 3,
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Box
                  component="img"
                  sx={{
                    height: 450,
                    width: "auto",
                    borderRadius: 2,
                    border: "1px solid black",
                  }}
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <Typography variant="h4" fontWeight="bold">
                  {movieDetails.title}
                </Typography>

                <Box display="flex" gap={2} mt={1}>
                  {movieDetails.origin_country.map((country) => (
                    <Typography
                      key={country}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {country}
                    </Typography>
                  ))}
                  <Typography variant="subtitle1">
                    {formatDate(movieDetails.release_date)}
                  </Typography>
                  <Typography variant="subtitle1">
                    {formatDuration(movieDetails.runtime)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    ...getRatingStyle(movieDetails.vote_average),
                    width: 50,
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1,
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {movieDetails.vote_average.toFixed(1)}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" mt={1}>
                  {movieDetails.vote_count} votes
                </Typography>

                <Box mt={2}>
                  <Typography variant="h6">Overview</Typography>
                  <Typography variant="body1">
                    {movieDetails.overview}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <NavLink
            to={paths.home}
            style={{
              height: "40px",
              backgroundColor: "black",
              color: "white",
              width: "50px",
              textDecoration: "none",
              marginTop: "20px",
              borderRadius: "10px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBackIcon />
          </NavLink>
        </>
      )}
    </Grid>
  );
};

export default Movie;
