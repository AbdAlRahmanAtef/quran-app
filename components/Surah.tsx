import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { handleCurrentSurah } from "../redux/slices/surahSlilce";
import { SurahProps } from "../utils/constents";

interface IProps {
  surah: SurahProps;
}

const Surah: NextPage<IProps> = ({ surah }) => {
  const { number, ayahs, name } = surah;

  const dispatch = useAppDispatch();

  const converNumbers = (num: any) => {
    const numbers = `۰۱۲۳٤٥٦٧۸۹`;

    let finalNumber: string = "";

    for (let c of num.toString()) {
      finalNumber += numbers.charAt(c);
    }

    return finalNumber;
  };

  return (
    <Link
      href={`./detail/${number}`}
      className="surah "
      onClick={() => dispatch(handleCurrentSurah(surah))}
    >
      <div>
        <span className="number">
          <small>{converNumbers(number)}</small>
        </span>
        <span className="name">{name}</span>
      </div>
      <span className="ayahs">
        {converNumbers(ayahs.length)}
        {` `}
        آيات
      </span>
    </Link>
  );
};

export default Surah;
