import React, { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./Header.module.css";
import { useRouter } from "next/router";
import useUser from "../../lib/front/hooks/useUser";

import Logo from "../../assets/Logo";
import ToggleTheme from "../buttons/ToggleTheme";

const Header = () => {
  const { user, userError } = useUser();
  const [theme, setTheme] = useState("dark");

  const router = useRouter();

  const handleLogout = () => {
    fetch("http://localhost:3000/api/user/logout", { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        router.pathname === "/" ? router.reload() : router.push("/");
      });
  };

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    if (typeof document == "undefined") return;

    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <header className={styles.container}>
      <div className={styles.logo + " slide-from-top"}>
        <Link href="/">
          <a>
            <Logo theme={theme} />
          </a>
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.link + " slide-from-top"}>Accueil</a>
        </Link>

        <Link href="/favorites">
          <a className={styles.link + " slide-from-top"}>Favoris</a>
        </Link>
        <div className={styles.themeButton}>
          <ToggleTheme className={styles.themeButton} onClick={toggleTheme} />
        </div>
        {user && (
          <a onClick={handleLogout} className={styles.link + " slide-from-top"}>
            Logout
          </a>
        )}
        {/* {!user && (
          <Link href="/login">
            <a className={styles.link + " slide-from-top"}>Login</a>
          </Link>
        )} */}
      </nav>
    </header>
  );
};

export default Header;
