import React from "react";

interface IProps {
  label: string;
  content: any;
}

const CountryInfoItem = ({ label, content }: IProps) => {
  return (
    <div className="">
      <b className="text-slate-200">{label}: </b>
      <span className="text-slate-200">{content}</span>
    </div>
  );
};

export default CountryInfoItem;
