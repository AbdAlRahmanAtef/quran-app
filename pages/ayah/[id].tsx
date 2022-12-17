import axios from "axios";
import React from "react";
import AyahC from "../../components/AyahC";
import { useAppSelector } from "../../redux/hooks";
import { allSurahProps } from "../../utils/constents";

const Ayah = ({
  ayahData,
  tafsirList,
  tafsirText,
}: {
  ayahData: any;
  tafsirList: any;
  tafsirText: any;
}) => {
  const { currentSurahId } = useAppSelector((state) => state.saveSurah);
  // console.log(surahData.surah.number);

  return (
    <AyahC
      ayahData={ayahData}
      tafsirList={tafsirList}
      tafsirText={tafsirText}
    />
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: any };
}) => {
  const ayah = await axios.get(
    `http://api.alquran.cloud/v1/ayah/${id}/ar.alafasy`
  );
  const surahNumber = ayah?.data?.data.surah.number;
  const ayahNumber = ayah?.data?.data.numberInSurah;
  const tafsir = await axios.get("http://api.quran-tafseer.com/tafseer");
  const ayahTafsir = await axios.get(
    `http://api.quran-tafseer.com/tafseer/1/${surahNumber}/${ayahNumber}`
  );

  return {
    props: {
      ayahData: ayah.data.data,
      tafsirList: tafsir.data,
      tafsirText: ayahTafsir.data,
    },
  };
};

export default Ayah;
