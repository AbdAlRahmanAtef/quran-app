import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jpeg";
import { useAppDispatch } from "../redux/hooks";
import { handleCurrentSurah } from "../redux/slices/surahSlilce";
import { SurahProps } from "../utils/constents";

const Navbar = () => {
  const [width, setWidth] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [surahsList, setSurahsList] = useState<SurahProps[]>([]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchRef = useRef<any>();

  useEffect(() => {
    axios
      .get("http://api.alquran.cloud/v1/quran/quran-uthmani")
      .then((response) => setSurahsList(response.data.data.surahs));
  }, []);

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
      dispatch(handleCurrentSurah(searchTerm[0]));
      router.push(`/detail/${searchTerm[0].number}`);
      searchRef.current.value = "";
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
        <p className="search" onClick={() => setShow((prev) => !prev)}>
          <FaSearch />
        </p>
      </div>
      <form
        className={`search-bar ${show && "active"}`}
        onSubmit={(e) => handleSearch(e)}
      >
        <div className="container">
          <input
            type="text"
            placeholder="أبحث عن صورة"
            ref={searchRef}
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
