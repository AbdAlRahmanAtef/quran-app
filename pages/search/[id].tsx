import axios from "axios";
import { NextPage } from "next";
import React from "react";
import SurahDetails from "../../components/SurahDetails";
import { SurahProps } from "../../utils/constents";

interface IProps {
  surah: SurahProps;
}

const Search: NextPage<IProps> = ({ surah }) => {
  return <SurahDetails surah={surah} />;
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: any };
}) => {
  const res = await axios.get(`http://api.alquran.cloud/v1/surah/${id}`);

  return {
    props: {
      surah: res.data.data,
    },
  };
};

export default Search;
