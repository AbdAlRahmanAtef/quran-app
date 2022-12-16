import React from "react";
import axios from "axios";
import { NextPage } from "next";
import { SurahProps } from "../../utils/constents";
import SurahDetails from "../../components/SurahDetails";
import { useAppSelector } from "../../redux/hooks";

interface IProps {
  surah: allProps;
}

interface allProps extends SurahProps {
  numberOfAyahs: number;
}

const Detail: NextPage<IProps> = ({ surah }) => {
  const { showTafsir } = useAppSelector((state) => state.saveSurah);

  return (
    <div>
      <SurahDetails surah={surah} />
      {/* {showTafsir && <Ayah surah={surah} />} */}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: any };
}) => {
  const data = await axios.get(`http://api.alquran.cloud/v1/surah/${id}`);

  return {
    props: {
      surah: data.data.data,
    },
  };
};

export default Detail;
