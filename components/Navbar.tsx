import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jpeg";
import { useAppDispatch } from "../redux/hooks";
import { SurahProps } from "../utils/constents";

const Navbar = () => {
  const [width, setWidth] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [surahsList, setSurahsList] = useState<SurahProps[]>([]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchInputRef = useRef<any>();
  const searchFormRef = useRef<any>();
  const searchIconRef = useRef<any>();

  useEffect(() => {
    axios
      .get("http://api.alquran.cloud/v1/quran/quran-uthmani")
      .then((response) => setSurahsList(response.data.data.surahs));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      if (show && searchFormRef && !searchFormRef.current.contains(e.target)) {
        setShow(false);
      } else if (searchIconRef && searchIconRef.current.contains(e.target)) {
        setShow((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [show]);

  if (typeof window !== "undefined") {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    window.onscroll = () => {
      const top = document.documentElement.scrollTop;

      setWidth(`${(top / height) * 100}%`);
    };
  }

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue) {
      const searchTerm = surahsList.filter((surah: SurahProps) =>
        surah.name.trim().includes(inputValue.trim())
      );
      router.push(`/detail/${searchTerm[0].number}`);
      searchInputRef.current.value = "";
      setInputValue("");
      setShow(false);
    }
  };

  return (
    <div className="navbar">
      <div style={{ width: width }} className="progerss-bar"></div>
      <div className="container">
        <Link href="/">
          <Image src={logo} alt="logo" width={60} height={60} />
        </Link>
        <p
          className="search"
          ref={searchIconRef}
        >
          <FaSearch />
        </p>
      </div>
      <form
        className={`search-bar ${show && "active"}`}
        onSubmit={(e) => handleSearch(e)}
        ref={searchFormRef}
      >
        <div className="container">
          <input
            type="text"
            placeholder="أبحث عن صورة"
            ref={searchInputRef}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div onClick={(e) => handleSearch(e)}>
            <FaSearch size={22} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
