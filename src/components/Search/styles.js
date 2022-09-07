import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  searchContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      width: "100",
    },
    input: {
      color: theme.palette.mide === "light" && "black",
      filter: theme.palette.mode === "light" && "black",
      [theme.breakpoints.down("sm")]: {
        marginTop: "-10px",
        marginBottom: "10px",
      },
    },
  },
}));
