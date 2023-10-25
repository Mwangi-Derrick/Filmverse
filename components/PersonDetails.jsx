"use client";
import { FilmIcon, TvIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaFacebook, FaYoutube,FaTiktok } from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6'
export default function PersonDetails({ personCredits, personInfo,externalIds }) {
  const [info, setInfo] = useState(personInfo);
  const [ids,setIds]= useState(externalIds)
  const [totalCredits, setTotalCredits] = useState(personCredits);
  useEffect(() => {
    setInfo(personInfo);
    setTotalCredits(personCredits);
    setIds(externalIds)
  }, [personCredits, personInfo,externalIds]);

  const name = (media) => {
    if (media.media_type === "movie") {
      return media.title;
    }
    if (media.media_type === "tv") {
      return media.name;
    }
  };
  const ulrPath = (media) => {
    if (media.media_type === "movie") {
      return `/movie/${media.id}-${media.title.replace(/\s+/g, "-")}`;
    }
    if (media.media_type === "tv") {
      return `/show/${media.id}-${media.name.replace(/\s+/g, "-")}`;
    }
  };

  const renderMediaIcon = (mediaType) => {
    if (mediaType === "movie") {
      return <FilmIcon className="w-5 h-5" />;
    } else if (mediaType === "tv") {
      return <TvIcon className="w-5 h-5" />;
    } else { 
      return "";
    }
  };
  const [showMore, toggleShowMore] = useState(false);
    function separateParagraphs(input) {
        console.log(input.length)
        const biography = showMore === false ? input.slice(0, 450) : input;
        const concatenatedString = (value) => {return value.length === 450 ? value.concat("...") : value}
    const separatedParagraphs = concatenatedString(biography).split("\n");
    return separatedParagraphs.map((string,index) => (
      <p className="text-[16px] pb-3 transition-all ease-in-out duration-1000" key={index}>
        {string}
      </p>
    ));
  }
  const externalIdentities = Object.entries(ids).slice(5);
  const availableIdentiies = externalIdentities.filter(([key, value]) => (value !== "" && value !== null))
  const renderSocialIcons = (array) => {
   return array.map(([key, value]) => {
     if (key === 'facebook_id') { return <Link key={key} href={`https://www.facebook.com/${value}`}><FaFacebook size='30px'/></Link> }
      else if (key === 'instagram_id') { return <Link key={key} href={`https://www.instagram.com/${value}`}><FaInstagram size='30px'/></Link> }
      else if (key === 'tiktok_id'){return <Link key={key} href={`https:///www.tiktok.com/${value}`}><FaTiktok size='30px'/></Link> }
      else if (key === 'twitter_id') { return <Link key={key} href={`https://www.twitter.com/${value}`}><FaXTwitter size='30px'/></Link> }
      else if (key === 'youtube_id') { return <Link key={key} href={`https://www.youtube.com/${value}`}><FaYoutube size='30px'/></Link> }
      else {return null}
    }
)
  }
  console.log(externalIdentities)
  console.log(availableIdentiies)
  console.log(renderSocialIcons(availableIdentiies))

  return (
    <div className="w-full h-full text-white flex flex-col px-12 pt-12">
      <section className="flex lg:flex-row sm:flex-col w-full min-h-[400px] gap-5 sm:max-lg:items-center">
        <div className="flex flex-col items-center gap-7">
        <div className="h-fit w-fit mr-3">
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w185/${info.profile_path}`}
            width="250px"
            height="400px"
            className="rounded-full w-[300px] aspect-square"
            alt={`${info.name}`}
          />
          </div>
          <div className="w-fit h-fit gap-3 flex">{renderSocialIcons(availableIdentiies)}</div>
          </div>
        <article className="flex flex-col flex-1 ">
          <h1 className="text-4xl font-semibold w-fit h-fit pb-5 sm:max-lg:py-2">
            {info.name}
          </h1>
                  {separateParagraphs(info.biography || `Biography of ${info.name} is currently unavailable from our data sources.`)}
                  { 
                      info.biography.length >= 450 ?(
          <span
            onClick={() => {
              toggleShowMore((prev) => !prev);
            }}
                              className="inline-flex gap-1 items-center 
            lg:hover:text-white font-medium w-fit h-fit text-red-400 cursor-pointer"
          >
            {showMore === false ? "More" : "Less"}
            {showMore  === false ? (
              <ChevronDownIcon className="w-4 h-4 stroke stroke-current" />
            ) : (
              <ChevronUpIcon className="w-4 h-4 stroke stroke-current" />
            )}
          </span>):null}
        </article>
      </section>
      <div className="flex flex-col w-full h-fit pt-3 mb-10 ">
        <h5 className="text-2xl capitalize py-3 w-full h-fit">{`also starring ${info.name}`}</h5>
        <div className="w-full h-fit grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {totalCredits &&
            totalCredits?.map((credit) => (
              <Link
                style={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
                href={ulrPath(credit)}
                className="h-auto w-auto flex flex-col items-end justify-end 
                             group"
              >
                <div
                  className="w-full h-auto relative flex-1 
                              lg:group-hover:scale-[1.02] transition-transform duration-1000 ease-in-out
                              "
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${credit.poster_path}`}
                    loading="lazy"
                    width="200px"
                    height="300px"
                    alt="actor"
                    className="h-full rounded-md
                               w-full object-cover z-100 "
                  />
                  <i
                    className="absolute top-0 left-0 w-[45px] 
                                h-[25px] flex items-center justify-center bg-red-500 rounded-md"
                  >
                    {renderMediaIcon(credit?.media_type)}
                  </i>
                </div>
                <div
                  className="flex flex-col pt-1 w-full h-fit min-h-[60px]
                             items-center justify-start lg:group-hover:text-brown-600 truncate"
                >
                  <div className="w-full h-fit flex flex-row justify-center truncate">
                    <p className="truncate font-semibold">{name(credit)}</p>
                  </div>
                  {credit.character && (
                    <p className="font-light italic">As {credit?.character}</p>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
