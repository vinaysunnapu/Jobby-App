import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import FilterGroups from '../FilterGroups'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileApiStatus: profileApiStatusConstants.initial,
    profileData: {},
    activeEmploymentTypeId: '',
    activeSalaryRangeId: '',
    jobsData: [],
    jobsApiStatus: jobsApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobDetails()
  }

  onClickRetryJobDetails = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsData: updatedJobsData,
        jobsApiStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConstants.failure})
    }
  }

  renderJobDetailsView = () => {
    const {jobsData} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsData.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderjobDetailsFailureView = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="fail-retry-button"
        onClick={this.onClickRetryJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsLoadingView = () => (
    <div className="job-details-loading-container">
      <Loader type="ThreeDots" color="#f1f5f9" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case profileApiStatusConstants.success:
        return this.renderJobDetailsView()
      case profileApiStatusConstants.failure:
        return this.renderjobDetailsFailureView()
      case profileApiStatusConstants.inProgress:
        return this.renderJobDetailsLoadingView()
      default:
        return null
    }
  }

  getProfile = async () => {
    this.setState({
      profileApiStatus: profileApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImage: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        profileApiStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstants.failure})
    }
  }

  renderProfileFailureView = () => (
    <div className="profile-retry-container">
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, profileImage, shortBio} = profileData

    return (
      <div className="profile-bg">
        <img src={profileImage} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileLoadingView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#f1f5f9" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileApiStatusConstants.success:
        return this.renderProfileView()
      case profileApiStatusConstants.failure:
        return this.renderProfileFailureView()
      case profileApiStatusConstants.inProgress:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  changeSalaryRangeType = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId})
  }

  changeEmploymentType = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId})
  }

  render() {
    const {activeEmploymentTypeId, activeSalaryRangeId} = this.state
    return (
      <>
        <Header />
        <div className="jobs-main-bg-container">
          <div className="jobs-bg-container">
            <div className="profile-container">
              {this.renderProfile()}

              <FilterGroups
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                changeEmploymentType={this.changeEmploymentType}
                activeEmploymentTypeId={activeEmploymentTypeId}
                activeSalaryRangeId={activeSalaryRangeId}
                changeSalaryRangeType={this.changeSalaryRangeType}
              />
            </div>
            <div className="job-details-container">
              <div className="search-container">
                <input type="search" className="search-items" />
                <BsSearch className="search-icon" />
              </div>
              <div className="job-detail-container">
                {this.renderJobDetails()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
