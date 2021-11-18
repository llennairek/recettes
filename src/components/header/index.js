import React from "react";
import Link from "next/link";

import Cookies from "js-cookie";

import styles from "./index.module.css";
import router, { useRouter } from "next/router";
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
      <nav>
        <Link href="/">
          <a className={styles.link}>Home</a>
        </Link>
        {!user && (
          <Link href="/login">
            <a className={styles.link}>Login</a>
          </Link>
        )}
        {user && (
          <a onClick={handleLogout} className={styles.link}>
            Logout
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
