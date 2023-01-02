import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Landing from "../components/Landing";
import Surah from "../components/Surah";
import { useAppDispatch } from "../redux/hooks";
import { ayahsNumber } from "../utils/ayahsNumber";
import { SurahProps } from "../utils/constents";
import { surahsNames } from "../utils/surahsNames";

interface surahName {
  name: string;
  number: number;
}

interface IProps {
  surahs: SurahProps[];
}

const Home: NextPage<IProps> = ({ surahs }) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue) {
      const searchTerm = surahsNames.filter((surah: surahName) =>
        surah.name.trim().includes(inputValue.trim())
      );
      router.push(`/detail/${searchTerm[0].number}`);
      setInputValue("");
    }
  };

  return (
    <div className="app">
      <Landing />
      <form className="search" onSubmit={handleSearch}>
        <div className="container">
          <input
            ref={searchRef}
            type="text"
            placeholder="أبحث عن صورة"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <span onClick={handleSearch}>
            <FaSearch />
          </span>
        </div>
      </form>
      {surahs?.length > 0 && (
        <div className="surahs-list">
          <div className="container">
            {surahs?.map((item: SurahProps) => (
              <Surah key={item.number.toString()} surah={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await axios.get(
    "http://api.alquran.cloud/v1/quran/quran-uthmani"
  );

  return {
    props: {
      surahs: data.data.data.surahs,
    },
  };
};

export default Home;
