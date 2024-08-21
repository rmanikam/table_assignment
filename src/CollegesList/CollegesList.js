import React, { useEffect, useState } from "react";
import CollegeData from "../collegeData.json";
import "../CollegesList/CollegeList.css";
import down from "../images/down.png";
import right from "../images/right-arrow.png";
import download from "../images/download.png";
import checkBox from "../images/unchecked.png";
import leftRightArrow from "../images/left-and-right-arrows.png";
const CollegesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [collegeData, setCollegeData] = useState(CollegeData.slice(0, 10));
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !isLoading
    ) {
      setIsLoading(true);
      fetchMoreData();
    }
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setCollegeData((prevData) => [
        ...prevData,
        ...CollegeData.slice(prevData.length, prevData.length + 10),
      ]);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, collegeData.length]);

  // Sort functionality
  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...collegeData].sort((a, b) => {
      if (key === "fees") {
        // For fees, strip the ₹ and commas, then compare numbers
        return direction === "ascending"
          ? parseInt(a[key].replace(/[₹,]/g, "")) -
              parseInt(b[key].replace(/[₹,]/g, ""))
          : parseInt(b[key].replace(/[₹,]/g, "")) -
              parseInt(a[key].replace(/[₹,]/g, ""));
      } else if (key === "rating") {
        // For rating, strip the "#" and compare numeric values
        const ratingA = parseInt(a[key].replace("#", ""));
        const ratingB = parseInt(b[key].replace("#", ""));
        return direction === "ascending"
          ? ratingA - ratingB
          : ratingB - ratingA;
      } else if (key === "userReviewRating") {
        const ratingA = parseFloat(a[key].split("/")[0]); // Extract the numeric part before "/"
        const ratingB = parseFloat(b[key].split("/")[0]);

        return direction === "ascending"
          ? ratingA - ratingB
          : ratingB - ratingA;
      }
    });

    setCollegeData(sortedData);
    setSortConfig({ key, direction });
  };

  // Search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredData = collegeData.filter((college) =>
    college.name.toLowerCase().includes(searchQuery)
  );
  return (
    <>
      <input
        type="text"
        placeholder="Search by College Name"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => sortData("rating")}>Sort by Rating</button>
        <button onClick={() => sortData("fees")}>Sort by Fees</button>
        <button onClick={() => sortData("userReviewRating")}>
          Sort by User Review Rating
        </button>
      </div>
      <table border="1px">
        <thead>
          <tr>
            <th> CD Rank </th>
            <th> Colleges 3 </th>
            <th> Course Fees </th>
            <th> Placement </th>
            <th> User Reviews </th>
            <th> Ranking </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((College, index) => {
            return (
              <tr key={index}>
                <td>{College.rating}</td>
                <td>
                  <div className="CollegeContainer">
                    <tr>
                      <img
                        src={College.logo}
                        alt="College Logo"
                        width="50px"
                        height="50px"
                      ></img>
                    </tr>
                    <tr className="name">
                      <p>{College.name}</p>
                    </tr>
                    <div className="one">
                      <div className="locationContainer">
                        <tr id="locationName">
                          Chennai, TamilNadu | AICTE Approved
                        </tr>
                      </div>
                      <div className="degreeContainer">
                        <tr id="degreeName">
                          <div className="stream">
                            <p>B.Tech Computer Science Engineering</p>
                            <p>JEE-Advanced 2023 Cutoff: 144</p>
                            <img
                              src={down}
                              alt="down"
                              width="20px"
                              height="20px"
                            />
                          </div>
                        </tr>
                      </div>
                      <div className="applyContainerOne">
                        <tr id="submitOne">
                          <div className="applyOne">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="two">
                      <div className="locationContainer">
                        <tr id="locationSecond">New Delhi, Delhi NCR</tr>
                      </div>
                      <div className="degreeContainer">
                        <tr id="degreeNameTwo">
                          <div className="streamTwo">
                            <p id="branch">
                              B.Tech + M.Tech Mathematics and Computing
                            </p>
                            <p id="cutoffTwo">JEE-Advanced 2023 Cutoff: 115</p>
                            <img
                              src={down}
                              alt="down"
                              width="20px"
                              height="20px"
                            />
                          </div>
                        </tr>
                      </div>
                      <div className="applyContainerTwo">
                        <tr id="submitTwo">
                          <div className="applyTwo">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="three">
                      <div className="applyContainerThree">
                        <tr id="submitThree">
                          <div className="apply">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="four">
                      <div className="applyContainerFour">
                        <tr id="submit">
                          <div className="apply">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="five">
                      <div className="applyContainerFive">
                        <tr id="submit">
                          <div className="apply">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="six">
                      <div className="applyContainerSix">
                        <tr id="submit">
                          <div className="apply">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="seven">
                      <div className="locationContainer"></div>

                      <div className="applyContainerSeven">
                        <tr id="submit">
                          <div className="apply">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="eight">
                      <div className="applyContainerEight">
                        <tr id="submit">
                          <div className="apply">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="nine">
                      <div className="applyContainerNine">
                        <tr id="submit">
                          <div className="apply">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    <div className="ten">
                      <div className="applyContainerTen">
                        <tr id="submit">
                          <div className="apply">
                            <img
                              src={right}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Apply Now</p>
                          </div>
                          <div className="download">
                            <img
                              src={download}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Download Brochure</p>
                          </div>
                          <div className="compare">
                            <img
                              src={checkBox}
                              alt="right"
                              width="13px"
                              height="13px"
                            />
                            <p>Add To Compare</p>
                          </div>
                        </tr>
                      </div>
                    </div>
                    {College.featured && (
                      <div className="featuredFlag">Featured</div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="FeeContainer">
                    <tr id="collegeFees">{College.fees}</tr>
                    <div className="degreeInContainer">
                      <tr id="nameOfDegree">BE/B.Tech</tr>
                    </div>
                    <div className="FeesContainer">
                      <tr id="feesYear">
                        <div className="fees">
                          <p>-</p>
                          <p>Ist Year Fees</p>
                        </div>
                      </tr>
                    </div>
                    <div className="ComparisonContainer">
                      <tr id="compare">
                        <div className="compareContainer">
                          <img
                            src={leftRightArrow}
                            alt="leftRight"
                            width="20px"
                            height="20px"
                          ></img>
                          <p>Compare Fees</p>
                        </div>
                      </tr>
                    </div>
                  </div>
                </td>
                <td>
                  <tr id="placementAverage">₹{College.placementsavg}</tr>
                  <div className="AveragePackage">
                    <tr id="nameOfDegree">AveragePackage</tr>
                  </div>
                  <tr id="placementMax">₹{College.placementsmax}</tr>
                  <div className="HighestPackage">
                    <tr id="nameOfDegree">HighestPackage</tr>
                  </div>
                  <div className="ComparisonContainer">
                    <tr id="compare">
                      <div className="compareContainer">
                        <img
                          src={leftRightArrow}
                          alt="leftRight"
                          width="20px"
                          height="20px"
                        ></img>
                        <p>Compare Placement</p>
                      </div>
                    </tr>
                  </div>
                </td>
                <td>
                  <ul>
                    <li>{College.userReviewRating}</li>
                  </ul>
                </td>
                <td>
                  <tr>{College.Ranking}</tr>
                  <tr>
                    <img src={College.rankinglogo} alt="rankingLogo"></img>
                  </tr>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && <p>Loading more colleges...</p>}
    </>
  );
};

export default CollegesList;
