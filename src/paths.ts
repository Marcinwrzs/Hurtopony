const paths = {
  home: "/",
  movie: (id: string | number) => `/movie/${id}`,
  notFound: "*",
};

export default paths;
