/* eslint quotes: ["error", "double"] */
/* eslint-env es6 */
/* eslint no-return-assign: "error" */
/* eslint operator-linebreak: ["error", "after"] */
/* eslint no-unused-vars: "error" */
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import genreIcons from "../../assets/genres";
import useStyles from "./styles";
import { useGetGenresQuery } from "../../services/TMDB";
import { selectGenreOrCategory } from "../../app/Features/currentGenreOrCategory";

const redLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const blueLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];
const demoCategories = [
  { label: "Comedy", value: "comedy" },
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Animation", value: "animation" },
];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();

  // eslint-disable-next-line no-console
  console.log(data);
  const dispach = useDispatch();

  return (
    <>

      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={(theme.palette.mode = "light" ? redLogo : blueLogo)}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.Links} to="/">
            <ListItem onClick={() => dispach(selectGenreOrCategory(value))} button>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        { isFetching ? (
          <Box display="flex " justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ name, id }) => (
          <Link key={id} className={classes.Links} to="/">
            <ListItem onClick={() => dispach(selectGenreOrCategory(id))} button>
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
