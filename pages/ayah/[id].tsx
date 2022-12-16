import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BsFillPlayFill, BsInfoCircleFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoIosPause } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import AudioPlayer from "../../components/AudioPlayer";
import {
  allSurahProps,
  tafsirProps,
  tafsirTypeProps,
} from "../../utils/constents";
import { converNumbers } from "../../utils/convertNumbers";

const Ayah = ({ surahData }: { surahData: allSurahProps }) => {
  const { audio, audioSecondary, number, numberInSurah, surah, text } =
    surahData;
  const [tafsirName, setTafsirName] = useState<number>(1);
  const [ayahNumber, setAyahNumber] = useState<number>(+numberInSurah);
  const [tafsir, setTafsir] = useState<tafsirProps>();
  const [tafsirTypes, setTafsirTypes] = useState<tafsirTypeProps[]>([]);
  const [ayahsArray, setAyahsArray] = useState<number[]>([]);
  const [tafsirActive, setTafsirActive] = useState<number>(1);
  const [isChangingAyah, setIsChangingAyah] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [prevented, setPrevented] = useState<string>("");

  const difference = number - numberInSurah;

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://api.quran-tafseer.com/tafseer`)
      .then((response) => setTafsirTypes(response.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.quran-tafseer.com/tafseer/${tafsirName}/${surah.number}/${ayahNumber}`
      )
      .then((response) => setTafsir(response.data));
  }, [tafsirName, surah.number, ayahNumber]);

  console.log(tafsir);
  console.log(tafsirTypes);

  useEffect(() => {
    let arr: number[] = [];
    if (surah) {
      for (let i = 1; i <= surah.numberOfAyahs; i++) {
        arr.push(i);
      }
      setAyahsArray(arr);
    }

    setIsPlaying(false);
  }, [surah]);

  useEffect(() => {
    if (isChangingAyah) {
      router.push(`/ayah/${ayahNumber + difference}`);
    }

    setIsChangingAyah(false);
  }, [ayahNumber, difference, isChangingAyah]);

  const handleGoBack = () => {
    setPrevented("");

    if (ayahNumber > 1) {
      setAyahNumber(ayahNumber - 1);
      setIsChangingAyah(true);

      if (ayahNumber === 2) {
        setPrevented("back");
      }
    } else {
      setAyahNumber(1);
      setPrevented("back");
    }
  };

  const handleGoForward = () => {
    setPrevented("");
    const max = ayahsArray[ayahsArray.length - 1];

    if (ayahNumber < max) {
      setAyahNumber(ayahNumber + 1);
      setIsChangingAyah(true);

      if (ayahNumber === max - 1) {
        setPrevented("forward");
      }
    } else {
      setAyahNumber(max);
      setPrevented("forward");
    }
  };

  return (
    <div className="ayah-detail">
      <div className="content-container">
        <span
          className="cancel"
          onClick={() => router.push(`/detail/${surah.number}`)}
        >
          <MdOutlineCancel size={30} />
        </span>
        <div className="title">
          <p className="surah-name">{surah.name}</p>
          <p className="ayah">
            آية:
            <select
              value={ayahNumber}
              onChange={(e) => {
                setAyahNumber(+e.target.value);
                setIsChangingAyah(true);
              }}
            >
              {ayahsArray?.map((ayah: number) => (
                <option value={ayah} key={ayah}>
                  {converNumbers(ayah)}
                </option>
              ))}
            </select>
          </p>
        </div>

        <div className="info">
          {isPlaying ? (
            <span onClick={() => setIsPlaying(false)}>
              <IoIosPause size={25} />
              إيقاف الصوت
            </span>
          ) : (
            <span
              onClick={() => {
                setShow(true);
                setIsPlaying(true);
              }}
            >
              <BsFillPlayFill size={25} />
              تشغيل الصوت
            </span>
          )}
          <span onClick={() => setShowDetails((prev) => !prev)}>
            <BsInfoCircleFill size={22} title={""} /> {` `} معلومات السورة
          </span>
          <div className={`details ${showDetails && "active"}`}>
            <p>
              أسم السورة: <span>{surah.name}</span>
            </p>
            <p>
              عدد الأيات: <span>{converNumbers(surah.numberOfAyahs)} آيات</span>
            </p>
            <p>
              رقم السورة: <span>{converNumbers(surah.number)}</span>
            </p>
            <p>
              المنزل: {surah.revelationType === "Medinan" ? "مدنية" : "مكية"}
            </p>
          </div>
        </div>

        <div className="tafser-name">
          {tafsirTypes?.slice(0, 8).map((tafsir: any) => (
            <p
              className={`${tafsirActive === tafsir.id && "active"}`}
              key={tafsir.id}
              onClick={() => {
                setTafsirActive(tafsir.id);
                setTafsirName(tafsir.id);
              }}
            >
              {tafsir.name}
            </p>
          ))}
        </div>
        <div className="tafsir">
          <div className="ayah-text">
            {text} <span>{converNumbers(numberInSurah)}</span>
          </div>
          <div className="tafsir-text">{tafsir?.text}</div>
        </div>
        <div className="navigation">
          <p
            className={`${prevented === "back" && "prevented"}`}
            onClick={handleGoBack}
          >
            <IoIosArrowForward />
            الآية السابقة
          </p>
          <p
            className={`${prevented === "forward" && "prevented"}`}
            onClick={handleGoForward}
          >
            الآية التالية <IoIosArrowBack />
          </p>
        </div>
      </div>
      <AudioPlayer
        downloadURL={""}
        isDownloadable={false}
        show={show}
        setShow={setShow}
        src={`${audio ? audio : audioSecondary}`}
        isManyReciters={false}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        fileName={number}
      />
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: any };
}) => {
  const data = await axios.get(
    `http://api.alquran.cloud/v1/ayah/${id}/ar.alafasy`
  );

  return {
    props: {
      surahData: data.data.data,
    },
  };
};

export default Ayah;
