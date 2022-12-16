import axios from "axios";
import React from "react";
import AyahC from "../../components/AyahC";
import { allSurahProps } from "../../utils/constents";

const Ayah = ({ surahData }: { surahData: allSurahProps }) => {
  return <AyahC surahData={surahData} />;
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
