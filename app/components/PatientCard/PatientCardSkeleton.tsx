import React from "react";
import s from "./PatientCardSkeleton.module.scss";

const PatientCardSkeleton: React.FC = () => {
  return (
    <div className={s.skeletonCard}>
      <div className={s.titles}>
        <div className={s.skeletonTitle}></div>
        <div className={s.skeletonSubtitle}></div>
      </div>
      <div className={s.skeletonAvatar}></div>
    </div>
  );
};

export default PatientCardSkeleton;
