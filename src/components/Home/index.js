import './index.css'

import Header from '../Header'

const Home = props => {
  const {history} = props
  const findJobs = () => {
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-para">
              Millions of peoples are searching for jobs, salary, information,
              company reviews. Find the job that fits your abilities ans
              potential
            </p>
            <button
              type="button"
              className="find-job-button"
              onClick={findJobs}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
