import { NextPage } from "next";
import React, { useRef, useEffect, useState, ReactEventHandler } from "react";
import { IoIosArrowBack, IoIosPause, IoMdClose } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { reciters } from "../utils/reciter";
import {
  changeReciter,
  changeRewayat,
  changeServer,
  handleIsLoading,
} from "../redux/slices/audioSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Link from "next/link";
import Loader from "./Loader";
import { BsFillPlayFill } from "react-icons/bs";

interface IProps {
  src: string;
  show: boolean;
  setShow: (value: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  isManyReciters: boolean;
  fileName: number;
  downloadURL: string;
  isDownloadable: boolean;
}

interface RProps {
  name?: string;
  id: string;
  server: string;
  rewayat: string;
}

const AudioPlayer: NextPage<IProps> = ({
  src,
  show,
  isPlaying,
  setShow,
  setIsPlaying,
  isManyReciters,
  downloadURL,
  isDownloadable,
}) => {
  const [duration, setDuration] = useState<number>(0);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showReciterMenu, setShowReciterMenu] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<any>();

  const audioRef = useRef<any>();
  const clickRef = useRef<any>();
  const reciterRef = useRef<any>();
  const moreMenuRef = useRef<any>();
  const progerssRef = useRef<any>();
  const showMoreMenuIconRef = useRef<any>();

  const dispatch = useAppDispatch();
  const { reciter: currentReciter, isLoading } = useAppSelector(
    (state) => state.audio
  );

  const handleChangeReciter = (reciter: RProps) => {
    dispatch(changeReciter(reciter.id));
    dispatch(changeRewayat(reciter.rewayat));
    dispatch(changeServer(reciter.server));

    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    if (isNaN(audioRef.current.duration)) {
      dispatch(handleIsLoading(true));
    } else {
      dispatch(handleIsLoading(false));
    }
  }, [audioRef?.current?.duration, dispatch]);

  useEffect(() => {
    const handler = (e: Event) => {
      if (
        show &&
        moreMenuRef &&
        !moreMenuRef.current.contains(e.target) &&
        showMoreMenuIconRef &&
        !showMoreMenuIconRef.current.contains(e.target) &&
        reciterRef &&
        !reciterRef.current.contains(e.target)
      ) {
        setShowMoreMenu(false);
        setShowReciterMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [show]);

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const time = audioRef.current.currentTime;

    setDuration(duration);
    setCurrentTime(time);
  };

  const checkClick = (e: any) => {
    if (progerssRef && !progerssRef.current.contains(e.target)) {
      const width = clickRef.current.clientWidth;
      const offset = width - e.nativeEvent.offsetX;

      const progress = (offset / width) * 100;
      audioRef.current.currentTime = (progress / 100) * duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const secondsToTime = (sec: number) => {
    if (sec && !isNaN(sec)) {
      const h = Math.floor(sec / 3600);

      const m = Math.floor((sec % 3600) / 60)
        .toString()
        .padStart(2, "0");

      const s = Math.floor(sec % 60)
        .toString()
        .padStart(2, "0");

      return `${h > 0 ? h + ":" : ""}${m}:${s}`;
    }
    return "00:00";
  };

  if (typeof window !== "undefined") {
    window.onkeyup = (e) => {
      if (e.key === " " && show) {
        setIsPlaying(!isPlaying);
      }
    };
  }

  return (
    <div className={`audio-player ${show && "show"}`}>
      <div className="controles">
        <div className="duration">
          <span>
            {secondsToTime(duration)} / {secondsToTime(currentTime)}
          </span>
        </div>
        <div className="play-pause">
          {isPlaying ? (
            <span className="play" onClick={() => setIsPlaying(false)}>
              {isLoading ? <Loader /> : <IoIosPause size={25} />}
            </span>
          ) : (
            <span className="pause" onClick={() => setIsPlaying(true)}>
              <BsFillPlayFill size={25} />
            </span>
          )}
        </div>
        <div className="">
          <span
            className="more"
            onClick={() => setShowMoreMenu((prev) => !prev)}
            ref={showMoreMenuIconRef}
          >
            <FiMoreHorizontal size={25} />
          </span>
        </div>
      </div>

      <div
        className={`more-menu ${showMoreMenu && "active"}`}
        ref={moreMenuRef}
      >
        {isDownloadable && (
          <p className="download">
            <Link href={downloadURL} download>
              <HiOutlineDownload size={20} /> تحميل
            </Link>
          </p>
        )}
        {isManyReciters && (
          <p
            className="change-reciter"
            onClick={() => {
              setShowReciterMenu(true);
            }}
          >
            <span>
              <RxPerson size={20} /> تغيير القارئ{" "}
            </span>{" "}
            <IoIosArrowBack />
          </p>
        )}
        <p
          onClick={() => {
            setShow(false);
            setIsPlaying(false);
            setShowMoreMenu(false);
          }}
        >
          <IoMdClose size={20} />
          أغلق مشغل الصوت
        </p>
      </div>
      <audio loop onTimeUpdate={onPlaying} ref={audioRef} src={src}></audio>
      <div className="progress">
        <div
          className="progerss-wrapper"
          ref={clickRef}
          onClick={checkClick}
        ></div>
        <div
          className="seek-par"
          style={{ width: `${(currentTime / duration) * 100 + "%"}` }}
          ref={progerssRef}
        ></div>
      </div>
      <div
        className={`change-reciter-menu ${showReciterMenu && "active"}`}
        ref={reciterRef}
      >
        <p
          className="reciter"
          onClick={() => {
            setShowReciterMenu(false);
            setShowMoreMenu(true);
          }}
        >
          تغيير القارئ <IoIosArrowBack />
        </p>
        {reciters.map((reciter, index) => (
          <p
            key={index.toString()}
            className="reciter"
            onClick={() => handleChangeReciter(reciter)}
          >
            {reciter.name} {currentReciter === reciter.id && <MdOutlineDone />}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;
