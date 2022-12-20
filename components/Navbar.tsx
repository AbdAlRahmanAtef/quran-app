import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { BiSave } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jpeg";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { saveSurah } from "../redux/slices/savedSurah";
import { SurahProps } from "../utils/constents";

const Navbar = () => {
  const [width, setWidth] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentNumber, setCurrentNumber] = useState<any>("");
  const [isTransfering, setIsTransfering] = useState<boolean>(false);
  const [showSaveSign, setShowSaveSign] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currentSurah, surahs } = useAppSelector((state) => state.saveSurah);

  const searchInputRef = useRef<any>();
  const searchFormRef = useRef<any>();
  const searchIconRef = useRef<any>();

  useEffect(() => {
    if (router.pathname.slice(1, 7) === "detail") {
      setCurrentNumber(router.query.id);
      setShowSaveSign(true);
    }
  }, [router]);

  useEffect(() => {
    if (isTransfering) {
      router.push(`/detail/${currentSurah}`);
    }
  }, [isTransfering]);

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
      const searchTerm = surahs.filter((surah: SurahProps) =>
        surah.name.includes(inputValue)
      );
      router.push(`/detail/${searchTerm[0].number}`);
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
        <div>
          <div>
            <p onClick={() => setIsTransfering(true)}>
              انتقل الي علامة <BsBookmark />
            </p>
            {showSaveSign && (
              <p onClick={() => dispatch(saveSurah(currentNumber))}>
                حفظ علامة <BsBookmark />
              </p>
            )}
          </div>
          <p
            className="search"
            ref={searchIconRef}
            onClick={() => searchInputRef.current.focus()}
          >
            <FaSearch />
          </p>
        </div>
      </div>
      <form
        className={`search-bar ${show && "active"}`}
        onSubmit={handleSearch}
        ref={searchFormRef}
      >
        <div className="container">
          <input
            type="text"
            placeholder="أبحث عن صورة"
            ref={searchInputRef}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div onClick={handleSearch}>
            <FaSearch size={22} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
