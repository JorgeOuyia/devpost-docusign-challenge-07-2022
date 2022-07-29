import React from "react";

const CameraDataCard = () => {
  return (
    <div>
      <div className="w-100 h-100 card shadow-card-hoverable">
        <div className="d-flex flex-column">
          <div
            style={{
              minHeight: "400px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <div
              className="carousel slide"
              id="carousel"
              data-bs-ride="carousel"
              data-interval="false"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmjqJslHbrMMXlF7Y3NYmpa_SvIwMsZc9JuQ&usqp=CAU"
                    style={{
                      minHeight: "400px",
                      maxHeight: "400px",
                    }}
                  />
                </div>

                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="http://3.bp.blogspot.com/-jt3ckG6P9OU/VRELXCss0zI/AAAAAAAADqs/dFwIP5huIe0/s1600/41968850.jpg"
                    style={{
                      minHeight: "400px",
                      maxHeight: "400px",
                    }}
                  />
                </div>

                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec803811-8ef3-4823-bf66-0a895efde33c/dc4j94f-82c0e11f-3700-4d63-84f1-db712100c79b.png/v1/fill/w_1024,h_1457,q_80,strp/bobobo_bo_bo_bobo_by_acpuig_dc4j94f-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ1NyIsInBhdGgiOiJcL2ZcL2VjODAzODExLThlZjMtNDgyMy1iZjY2LTBhODk1ZWZkZTMzY1wvZGM0ajk0Zi04MmMwZTExZi0zNzAwLTRkNjMtODRmMS1kYjcxMjEwMGM3OWIucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.kOajwfTyZSLoIfw8EH-tO_B5hmLFItFKzfI0FOja0BA"
                    style={{
                      minHeight: "400px",
                      maxHeight: "400px",
                    }}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="card-body mt-3">
            <div className="d-flex flex-row justify-content-between">
              <div>
                <h3>Title</h3>
              </div>
              <div>
                <span className="badge bg-warning">Revision status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraDataCard;
