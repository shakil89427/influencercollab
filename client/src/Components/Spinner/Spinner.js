import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 inset-0 bg-[#a1a0a077] z-10 flex items-center justify-center">
      <div className={styles.spin} />
    </div>
  );
};

export default Spinner;
