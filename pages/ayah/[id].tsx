import axios from "axios";
import { NextPage } from "next";
import React from "react";
import AyahC from "../../components/AyahC";
import {
  allAyahProps,
  tafsirProps,
  tafsirTypeProps,
} from "../../utils/constents";

interface IProps {
  ayahData: allAyahProps;
  tafsirNamesList: tafsirTypeProps[];
  tafsirTextList: tafsirProps[];
}

const Ayah: NextPage<IProps> = ({
  ayahData,
  tafsirNamesList,
  tafsirTextList,
}) => {
  return (
    <AyahC
      ayahData={ayahData}
      tafsirNamesList={tafsirNamesList}
      tafsirTextList={tafsirTextList}
    />
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string | number };
}) => {
  const ayah = await axios.get(
    `http://api.alquran.cloud/v1/ayah/${id}/ar.alafasy`
  );
  const surahNumber = ayah?.data?.data.surah.number;
  const ayahNumber = ayah?.data?.data.numberInSurah;
  const tafsir = await axios.get("http://api.quran-tafseer.com/tafseer");
  const ayahTafsir1 = await axios.get(
    `http://api.quran-tafseer.com/tafseer/1/${surahNumber}/${ayahNumber}`
  );
  const ayahTafsir2 = await axios.get(
    `http://api.quran-tafseer.com/tafseer/2/${surahNumber}/${ayahNumber}`
  );
  const ayahTafsir3 = await axios.get(
    `http://api.quran-tafseer.com/tafseer/3/${surahNumber}/${ayahNumber}`
  );
  const ayahTafsir4 = await axios.get(
    `http://api.quran-tafseer.com/tafseer/4/${surahNumber}/${ayahNumber}`
  );
  const ayahTafsir5 = await axios.get(
    `http://api.quran-tafseer.com/tafseer/5/${surahNumber}/${ayahNumber}`
  );
  const ayahTafsir6 = await axios.get(
    `http://api.quran-tafseer.com/tafseer/6/${surahNumber}/${ayahNumber}`
  );
  const ayahTafsir7 = await axios.get(
    `http://api.quran-tafseer.com/tafseer/7/${surahNumber}/${ayahNumber}`
  );
  const ayahTafsir8 = await axios.get(
    `http://api.quran-tafseer.com/tafseer/8/${surahNumber}/${ayahNumber}`
  );

  return {
    props: {
      ayahData: ayah.data.data,
      tafsirNamesList: tafsir.data,
      tafsirTextList: [
        ayahTafsir1.data,
        ayahTafsir2.data,
        ayahTafsir3.data,
        ayahTafsir4.data,
        ayahTafsir5.data,
        ayahTafsir6.data,
        ayahTafsir7.data,
        ayahTafsir8.data,
      ],
    },
  };
};

export default Ayah;
