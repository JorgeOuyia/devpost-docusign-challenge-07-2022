import React from "react";

const Connect = () => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h2 className="card-title">
                  ArcGIS{" "}
                  <img src="https://tigerware.lsu.edu/image/1cb577c8-6265-43fa-9ddd-b96ea3e73eb9.png?preset=Full" />
                </h2>

                <div>
                  <span className="badge rounded-pill bg-danger mt-3">
                    Not connected
                  </span>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                    />
                    <label>
                      Username <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                    />
                    <label>
                      Password <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-12">
                  <div className="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                    />
                    <label className="form-check-label">
                      Remember me for next time
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row-reverse mt-2">
                <button type="button" className="btn btn-success">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h2 className="card-title">
                  Docusign{" "}
                  <img src="https://play-lh.googleusercontent.com/ID3MqPRs31t4c01B-QkNPePx5UtcY-akAscwMg5NtB3DrA57NGEsUyQ9vur6WdHYrP6Y" />
                </h2>

                <div>
                  <span className="badge rounded-pill bg-success mt-3">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
