import React from 'react'

const Hero = () => {
  return (

<section className="py-xl-8 py-6">
  <div className="container py-xl-6">
    <div className="row align-items-center gy-6 gy-xl-0">
      <div className="col-lg-5 col-xxl-5 col-12">
        <div className="d-flex flex-column gap-5">

          {/* Small Label */}
          <div className="d-flex flex-row gap-2 align-items-center">
            <span>🎁</span>
            <span className="text-primary fw-semibold">
              <span>Create Your Secret Santa Wishlist</span>
            </span>
          </div>

          {/* Main Heading + Description */}
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <h1 className="mb-0 display-2 fw-bolder">
                Your Personalized Secret Santa Wishlist Starts Here
              </h1>
              <p className="mb-0">
                Add your wishes, gift ideas, and surprises so your Secret Santa 
                knows exactly what will make your holidays magical.
              </p>
            </div>

            {/* Checklist */}
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              {[
                "Easy & fun wishlist builder",
                "Add links, descriptions & budget",
                "Share with your Secret Santa securely"
              ].map((text, index) => (
                <li key={index} className="d-flex flex-row gap-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-circle-fill text-success"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="d-grid d-md-flex flex-row gap-2">
            <a href="#!" className="btn btn-primary btn-lg">
              Create Your Wishlist
            </a>
            <a href="#!" className="btn btn-outline-secondary btn-lg">
              View Gift Ideas
            </a>
          </div>
        </div>
      </div>

      {/* Right Column (unchanged, images/graphics stay the same) */}
      <div className="col-xxl-6 offset-xxl-1 col-lg-7 col-12">
        <div className="row gx-0 gy-4 gy-lg-0">

          <div className="col-md-6 flex-column justify-content-start align-items-center d-none d-md-flex">
            <div className="position-relative me-n7">
              <div className="position-absolute bottom-25 start-0 ms-n8 end-0 d-flex flex-column align-items-start">

                <div className="bg-white rounded-pill py-2 px-3 shadow mb-2 d-inline-block">
                  <svg width="24" height="24" viewBox="0 0 30 30"><path fill="#F59E0B"/></svg>
                  <span className="text-dark fw-semibold">Holiday Cheer</span>
                </div>

                <div className="bg-white rounded-pill py-2 px-3 shadow mb-2 d-inline-block">
                  <svg width="24" height="25" viewBox="0 0 30 31"><path fill="#139A74"/></svg>
                  <span className="text-dark fw-semibold">Personalized Wishes</span>
                </div>

                <div className="bg-white rounded-pill py-2 px-3 shadow">
                  <svg width="24" height="25" viewBox="0 0 30 31"><path fill="#E53E3E"/></svg>
                  <span className="text-dark fw-semibold">Secret Sharing</span>
                </div>
              </div>

              <svg width="205" height="189" viewBox="0 0 205 189">
                <path fill="#139A74" />
              </svg>
            </div>
          </div>

          {/* Middle Image */}
          <div className="col-md-6 mt-8 mt-md-0">
            <div
              className="bg-warning d-flex justify-content-center rounded-4 position-relative"
              style={{ paddingBottom: "150px", paddingTop: "100px" }}
            >
              <img
                src="../assets/images/landing-immigration/college-student-holding-laptop-pointing-right.png"
                alt=""
                className="position-absolute bottom-0 me-8"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="col-md-6 flex-column justify-content-end d-none d-md-flex">
            <div
              className="bg-primary d-flex justify-content-center rounded-4 position-relative mx-5"
              style={{ paddingBottom: "150px", paddingTop: "100px" }}
            >
              <img
                src="../assets/images/landing-immigration/front-view-young-man-going-university-with-bag.png"
                alt=""
                className="position-absolute bottom-0"
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="col-md-6 d-none d-md-block">
            <div className="position-relative mt-5">
              <svg width="204" height="189" viewBox="0 0 204 189">
                <path fill="#EF8E70" />
              </svg>

              <div className="bg-white rounded-4 p-3 position-absolute bottom-10 start-10 mb-3 shadow">
                <div className="avatar-group mb-2">
                  {[1, 2, 3, 4].map((num) => (
                    <span key={num} className="avatar avatar-md">
                      <img
                        alt="avatar"
                        src={`../assets/images/avatar/avatar-${num}.jpg`}
                        className="rounded-circle"
                      />
                    </span>
                  ))}
                </div>
                <div className="text-dark fw-bold fs-4">Thousands</div>
                <div className="text-gray-500">
                  Sharing their Secret Santa wishes 🎅✨
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>


  )
}

export default Hero



