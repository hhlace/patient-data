"use client";
import { useState } from "react";
import Image from "next/image";
import s from "./PatientCard.module.scss";

interface PatientAvatarProps {
  avatarUrl?: string;
  alt?: string;
  extended?: boolean;
}

const PatientAvatar = ({
  avatarUrl,
  alt = "Patient Avatar",
  extended = false,
}: PatientAvatarProps) => {
  const [imgSrc, setImgSrc] = useState(avatarUrl ?? "/empty_avatar.webp");

  const handleImageError = () => {
    setImgSrc("/empty_avatar.webp");
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleImageError}
      width={extended ? 150 : 30}
      height={extended ? 150 : 30}
      priority={true}
      className={s.avatarImage}
    />
  );
};

export default PatientAvatar;
