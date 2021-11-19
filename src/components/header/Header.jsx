import React from "react";
import Link from "next/link";

import styles from "./Header.module.css";
import { useRouter } from "next/router";
import useUser from "../../lib/front/hooks/useUser";

const Header = () => {
  const { user, userError } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    fetch("http://localhost:3000/api/user/logout", { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        router.pathname === "/" ? router.reload() : router.push("/");
      });
  };
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.link + " slide-from-top"}>Home</a>
        </Link>
        {!user && (
          <Link href="/login">
            <a className={styles.link + " slide-from-top"}>Login</a>
          </Link>
        )}
        {user && (
          <a onClick={handleLogout} className={styles.link + " slide-from-top"}>
            Logout
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
