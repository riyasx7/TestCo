import React from 'react';
import { styles } from "../../styles";

const Home = () => {
  return (
    <div className=' '>
      <p className={`${styles.montserratLight} text-`}>HOME home light</p>
      <p className={`${styles.montserratRegular} text-myColor-primary`}>HOME home regular</p>
      <p className={`${styles.montserratMedium} text-myColor-secondary`}>HOME home medium</p>
      <p className={`${styles.montserratBold} text-myColor-tertiary`}>HOME home bold</p>
      <p className={`${styles.montserratExtraBold} text-myColor-dark`}>HOME home extra bold</p>
    </div>
  );
}

export default Home;
