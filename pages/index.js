import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import SearchBar from "../comps/SearchBar";
import SecAnalysis from "../comps/SecAnalysis";
import Analysis from "../comps/Analysis";
import OffensiveAnalysis from "../comps/OffensiveAnalysis";
import { useState } from "react";

export default function Home() {
  const [isContainerVisible, setContainerVisibility] = useState(false);
  const [searchedLink, setSearchedLink] = useState("");
  const [submittedLink, setSubmittedLink] = useState("");
  const [filtersState, setFiltersState] = useState({
    security: true,
    visual: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSearch = () => {
    setContainerVisibility(true);
  }

  return (
    <>
      <Head>
        <title>NetGuard</title>
      </Head>
      <div>
        <div className={styles.searchContainer}>
          <SearchBar
            onSubmit={() => {setSubmittedLink(searchedLink); setContainerVisibility(true)}}
            onSearch={SearchBar.handleSearch}
            searchedLink={searchedLink}
            setSearchedLink={setSearchedLink}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            setIsSubmitted={setIsSubmitted}
            setContainerVisibility={true}
            />
          </div>
          {isContainerVisible &&<Analysis webAddress={submittedLink} />}
        </div>
    </>
  );
}
