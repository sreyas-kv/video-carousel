import React from "react";
import styles from "./NavButton.module.css";
import rightArrow from "../../assets/chevron-right.svg";
import leftArrow from "../../assets/chevron-left.svg";

interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  label?: string;
}

const ChevronLeft = () => (
  <img src={leftArrow} alt="Previous" />
);

const ChevronRight = () => (
  <img src={rightArrow} alt="Next" />
);


export const NavButton: React.FC<NavButtonProps> = ({
  direction,
  onClick,
  label,
}) => {
  const defaultLabel = direction === "prev" ? "Previous" : "Next";

  return (
    <button
      className={styles.navButton}
      onClick={onClick}
      aria-label={label ?? defaultLabel}
    >
      {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
};