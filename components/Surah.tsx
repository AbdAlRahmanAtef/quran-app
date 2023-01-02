import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { SurahProps } from "../utils/constents";
import { convertNumbers } from "../utils/convertNumbers";

interface IProps {
  surah: SurahProps;
}

const Surah: NextPage<IProps> = ({ surah }) => {
  const { number, ayahs, name } = surah;
  return (
    <Link href={`./detail/${number}`} className="surah">
      <div>
        <span className="number">
          <small>{convertNumbers(number)}</small>
        </span>
        <span className="name">{name}</span>
      </div>
      <span className="ayahs">
        {convertNumbers(ayahs.length)}
        {` `}
        آيات
      </span>
    </Link>
  );
};

export default Surah;
