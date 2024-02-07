import React from 'react'
import SecAnalysis from './SecAnalysis'
import OffensiveAnalysis from './OffensiveAnalysis'
import styles from "../styles/Home.module.css";

const Analysis = ({webAddress}) => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_small}>
          <SecAnalysis webAddress={webAddress} />
        </div>
        <div className={styles.container_small}>
          <OffensiveAnalysis webAddress={webAddress} />
        </div>
      </div>
    </>
  )
}

export default Analysis;