import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";

function App() {
  const [projectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const projectsPerPage = 5;
  const offset = currentPage * projectsPerPage;
  const currentPageProjects = projectData.slice(
    offset,
    offset + projectsPerPage
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="App">
      <h1>Projects Table</h1>

      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <>
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Percentage Funded</th>
                <th>Amount Pledged</th>
              </tr>
            </thead>
            <tbody>
              {currentPageProjects.map((project, index) => (
                <tr key={index}>
                  <td>{project["s.no"]}</td>
                  <td>{project["percentage.funded"]}%</td>
                  <td>${project["amt.pledged"]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={Math.ceil(projectData.length / projectsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
}

export default App;
