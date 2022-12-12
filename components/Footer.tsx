import React from "react";
import { BiCopyright } from "react-icons/bi";
import { converNumbers } from "../utils/convertNumbers";

const Footer = () => {
  return (
    <div>
      <BiCopyright /> {converNumbers(new Date().getFullYear())} كل الحقوق محفوظة{" "}
    </div>
  );
};

export default Footer;
