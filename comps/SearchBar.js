import { useState } from "react";
import styles from "../styles/Home.module.css";

const SearchBar = ({
  onSearch,
  setContainerVisibility,
  searchedLink,
  setSearchedLink,
  filtersState,
  setFiltersState,
  setIsSubmitted,
  onSubmit
}) => {
  const handleSearch = () => {
    console.log("Searching for URL:", searchedLink);
    // Perform any necessary validation before calling onSearch
    // onSearch(searchedLink);
    // setIsSubmitted(true);
    // setContainerVisibility(true); // Show the container when search button is clicked
    onSubmit()
  };

  return (
    <div className={styles.searchContainer}>
      <form>
        <input
          type="text"
          required
          value={searchedLink}
          onChange={(e) => setSearchedLink(e.target.value)}
          className={styles.searchInput}
          placeholder="Enter URL"
        />
        <div>
          <input
            type="checkbox"
            checked={filtersState.security}
            onChange={(e) =>
              setFiltersState({
                security: e.target.checked,
                visual: filtersState.visual,
              })
            }
          />
          <label className={styles.checkboxLabel}>
            show website security threats
          </label>
          <br />
          <input
            type="checkbox"
            checked={filtersState.visual}
            onChange={(e) =>
              setFiltersState({
                visual: e.target.checked,
                security: filtersState.security,
              })
            }
          />
          <label className={styles.checkboxLabel}>
            show offensive visuals statistics
          </label>
        </div>
        <button type="button" onClick={handleSearch} className={styles.button}>
          Search URL
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
