import React, { useEffect } from "react";
import axios from "axios";
import { NextPage } from "next";
import { SurahProps } from "../../utils/constents";
import SurahDetails from "../../components/SurahDetails";

interface IProps {
  surah: SurahDetail;
}

interface SurahDetail extends SurahProps {
  edition?: {};
  numberOfAyahs?: number;
}

const Detail: NextPage<IProps> = ({ surah }) => {
  return (
    <div>
      <SurahDetails surah={surah} />
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
