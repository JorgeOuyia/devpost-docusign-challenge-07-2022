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
                  <span className="badge rounded-pill bg-danger">
                    Not connected
                  </span>
                </div>
              </div>
              
                    <p className="mt-4 car-text">
                        In order to use all functionalities, you have to log in with your arcGIS account. This will let you send surveys and use maps.
                    </p>

              <div className="d-flex justify-content-center mt-4">
                <button type="button" className="btn btn-success btn-lg">
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
                  <span className="badge rounded-pill bg-success">
                    Connected
                  </span>
                </div>
              </div>
                <p className="mt-4">It is necessary to log in to your Docusign account for being able to send envelopes to stakeholders and obtain validation of some forms.</p>
              <div className="d-flex justify-content-center mt-4">
                <button type="button" className="btn btn-success btn-lg">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
