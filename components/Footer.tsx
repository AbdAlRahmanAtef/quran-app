import React from "react";
import { BiCopyright } from "react-icons/bi";
import { convertNumbers } from "../utils/convertNumbers";

const Footer = () => {
  return (
    <div>
      <BiCopyright /> {convertNumbers(new Date().getFullYear())} كل الحقوق محفوظة{" "}
    </div>
  );
};

export default Footer;
