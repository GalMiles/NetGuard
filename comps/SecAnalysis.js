import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";


const SecAnalysis = ({ webAddress  }) => {

  const [securityData, setSecurityData] = useState({});
  const [securityInfo, setSecurityInfo] = useState({});
  const [securityRisks, setSecurityRisks] = useState({});

  useEffect(() => {
    async function fetchSecurityData() {
      const response = await fetch(
        `http://localhost:3000/api/security?url=${webAddress}`,
      );
      const res = await response.json();
      setSecurityData(res);
      setSecurityInfo(res.info);
      setSecurityRisks(res.risks);
      console.log(res);
    }

    fetchSecurityData();
    // console.log(data.info);
  }, [webAddress]);

  if(securityData && securityInfo && securityRisks) {
    return (
      <div>
        <h2 className={styles.titleComp}>Security Analysis</h2>
        <p className={styles.argumentComp}>Domain</p>
        <p className={styles.resultComp}>{securityInfo.domain}</p>
        <p className={styles.argumentComp}>IP</p>
        <p className={styles.resultComp}> {securityInfo.ip}</p>
        <p className={styles.argumentComp}>Country</p>
        <p className={styles.resultComp}> {securityInfo.country}</p>
        <p className={styles.argumentComp}>Risk Level</p>
        <p className={styles.resultComp}> {securityData.risk_level}</p>
        <p className={styles.argumentComp}>Phishing</p>
        <p className={styles.resultComp}>  {!securityRisks.phishing ? "False" : "True" }</p>
        <p className={styles.argumentComp}>Malware</p>
        <p className={styles.resultComp}>{securityRisks.malware  ? "False" : "True" }</p>
        <p className={styles.argumentComp}>Security</p>
        <p className={styles.resultComp}>  {securityData.score}</p>

      </div>
    )
  }
  return( <></>)
    
  

};

export default SecAnalysis;
