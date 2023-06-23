"use client";

import CountryInfoItem from "@/app/components/CountryInfoItem";
import ICountry from "@/app/interfaces/ICountry";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface IProps {
  params: {
    ccn3: string;
  };
}

export default function Country({ params: { ccn3 } }: IProps) {
  const [country, setCountry] = useState<ICountry | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${ccn3}`
      );
      const c = await response.json();

      setCountry(c[0]);
    };

    fetchCountry();
  }, [ccn3]);

  return (
    country && (
      <section className="mt-20 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-3">
          <span className="text-slate-200 font-bold text-4xl">
            {country.name.common}
          </span>
          <Link
            href={country.maps.googleMaps}
            target="_blank"
            className="flex w-fit"
          >
            <FaMapMarkerAlt className="text-slate-200 text-2xl" />
          </Link>
        </div>
        <div className="text-slate-500 italic text-center mb-10">
          {country.altSpellings.join(", ")}
        </div>
        <div className="flex justify-between">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            height={120}
            width={120}
          />

          <div className="">
            <CountryInfoItem
              label="Official Name"
              content={country.name.official}
            />

            <CountryInfoItem label="Capital" content={country.capital} />
            <CountryInfoItem
              label="Region/Subregion"
              content={`${country.region}/${country.subregion}`}
            />
            <CountryInfoItem
              label="Population"
              content={country.population.toLocaleString()}
            />
          </div>
        </div>
      </section>
    )
  );
}
