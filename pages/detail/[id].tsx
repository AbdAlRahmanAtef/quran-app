import React from "react";
import axios from "axios";
import { NextPage } from "next";
import { SurahProps } from "../../utils/constents";
import SurahDetails from "../../components/SurahDetails";
import { surahsNumber } from "../../utils/surahsNumber";

interface IProps {
  surah: allProps;
}

interface allProps extends SurahProps {
  numberOfAyahs: number;
}

const Detail: NextPage<IProps> = ({ surah }) => {
  return (
    <div>
      <SurahDetails surah={surah} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const paths = surahsNumber().map((num) => {
    return {
      params: { id: num.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await axios.get(`http://api.alquran.cloud/v1/surah/${id}`);

  return {
    props: {
      surah: data.data.data,
    },
  };
};

// export const getServerSideProps = async ({
//   params: { id },
// }: {
//   params: { id: any };
// }) => {
//   const data = await axios.get(`http://api.alquran.cloud/v1/surah/${id}`);

//   return {
//     props: {
//       surah: data.data.data,
//     },
//   };
// };

export default Detail;
