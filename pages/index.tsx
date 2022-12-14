import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Landing from "../components/Landing";
import Surah from "../components/Surah";
import { useAppDispatch } from "../redux/hooks";
import { SurahProps } from "../utils/constents";

const Home: NextPage<any> = ({ data }) => {
  const surahsList = data.surahs;
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();
  const searchRef = useRef<any>(null);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue) {
      const searchTerm = surahsList.filter((surah: SurahProps) =>
        surah.name.trim().includes(inputValue.trim())
      );
      // dispatch(handleCurrentSurah(searchTerm[0]));
      router.push(`/detail/${searchTerm[0].number}`);
      searchRef.current.value = "";
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
      {surahsList.length > 0 && (
        <div className="surahs-list">
          <div className="container">
            {surahsList.map((item: SurahProps) => (
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
      data: data.data.data,
    },
  };
};

export default Home;
