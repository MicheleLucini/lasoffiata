import React from "react";
import Icon from "@components/icon";
import Logo from "@components/svgs/Logo";
import styles from "./App.module.css";

const AppTopBar = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <Logo className={styles.logo} />
        <div>
          <Icon
            className={styles.icon}
            name="domain"
            fill={0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
          <span>La Soffiata, Crema, 26013 (CR)</span>
        </div>
        <div>
          <Icon
            className={styles.icon}
            name="business_center"
            fill={0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
          <span>p.iva 01722520192</span>
        </div>
        <div>
          <Icon
            className={styles.icon}
            name="call"
            fill={0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
          <span>Tel. 0373 250642</span>
        </div>
        <div>
          <Icon
            className={styles.icon}
            name="phone_android"
            fill={0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
          <span>Cel. 329 3258837</span>
        </div>
        <div>
          <Icon
            className={styles.icon}
            name="mail"
            fill={0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
          <span>info@lasoffiata.it</span>
        </div>
      </div>
    </div>
  );
};

export default AppTopBar;
