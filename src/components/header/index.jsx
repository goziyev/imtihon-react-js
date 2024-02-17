import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import styles from "./index.module.css";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("lang")) {
      let lang = localStorage.getItem("lang");
      i18n.changeLanguage(lang);
    }
    if (localStorage.getItem("mode")) {
      setDarkMode(localStorage.getItem("modex"));
    }
  }, []);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleLanguageMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setAnchorEl(null);
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.container}>
          <div>
            <span className={styles.signin}>Sign in /Guest </span>
            <span className={styles.signup}>Create Account </span>
          </div>
        </div>
      </div>
      <div className={styles.headerBackground}>
        <div className={styles.container}>
          <nav className={`${styles.navbar} ${openMenu ? styles.open : ""}`}>
            <div className={styles.logo}>
              <button className="btn btn-primary pb-3 text-center font-bold text-3xl pt-1">
                C
              </button>
            </div>
            <button className={styles.hamburger} onClick={toggleMenu}>
              <MenuIcon />
            </button>
            <ul>
              <li>
                <Link to="/">{t("home")}</Link>
              </li>
              <li>
                <Link to="/about">{t("about")}</Link>
              </li>
              <li>
                <Link to="/products">{t("products")}</Link>
              </li>
              <li>
                <Link to="/card">{t("card")}</Link>
              </li>
            </ul>
            <li className={styles.multiButtons}>
              <IconButton
                onClick={() => {
                  setDarkMode(!darkMode);
                  localStorage.setItem("mode", darkMode);
                }}
              >
                {!darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton onClick={handleLanguageMenuClick}>
                <LanguageIcon />
              </IconButton>
              <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={() => changeLanguage("en")}>
                  English
                </MenuItem>
                <MenuItem onClick={() => changeLanguage("uz")}>
                  O'zbekcha
                </MenuItem>
                <MenuItem onClick={() => changeLanguage("ru")}>
                  Русский
                </MenuItem>
              </Menu>
            </li>
            <Drawer anchor="left" open={openMenu} onClose={toggleMenu}>
              <List>
                <ListItem button component={Link} to="/">
                  <ListItemText primary={t("home")} />
                </ListItem>
                <ListItem button component={Link} to="/products">
                  <ListItemText primary={t("products")} />
                </ListItem>
                <ListItem button component={Link} to="/about">
                  <ListItemText primary={t("about")} />
                </ListItem>
                <ListItem button component={Link} to="/contact">
                  <ListItemText primary={t("card")} />
                </ListItem>
              </List>
            </Drawer>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
