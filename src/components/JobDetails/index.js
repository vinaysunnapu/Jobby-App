import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {FaExternalLinkAlt} from 'react-icons/fa'

import './index.css'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiJobDetailsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
    title: '',
    apiJobStatus: apiJobDetailsConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  onClickJobDetailsRetry = () => {
    this.getJobData()
  }

  getJobData = async () => {
    // this.setState({apiJobStatus: apiJobDetailsConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedJobData = await response.json()
      console.log(fetchedJobData)

      const updatedJobDetails = {
        companyLogoUrl: fetchedJobData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedJobData.job_details.company_website_url,
        employmentType: fetchedJobData.job_details.employment_type,
        id: fetchedJobData.job_details.id,
        jobDescription: fetchedJobData.job_details.job_description,
      }
      const updatedLifeAtCompany = {
        location: fetchedJobData.job_details.location,
        packagePerAnnum: fetchedJobData.job_details.package_per_annum,

        rating: fetchedJobData.job_details.rating,
        lifeDescription: fetchedJobData.job_details.life_at_company.description,
        lifeImageUrl: fetchedJobData.job_details.life_at_company.image_url,
      }
      const updatedSkills = fetchedJobData.job_details.skills.map(
        eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        }),
      )
      const updatedTitle = fetchedJobData.job_details.title
      const updatedSimilarJobs = fetchedJobData.similar_jobs.map(
        eachsimilarJob => ({
          companyLogoUrl: eachsimilarJob.company_logo_url,
          employmentType: eachsimilarJob.employment_type,
          id: eachsimilarJob.id,
          jobDescription: eachsimilarJob.job_description,
          location: eachsimilarJob.location,
          rating: eachsimilarJob.rating,
          title: eachsimilarJob.title,
        }),
      )
      this.setState({
        jobDetails: updatedJobDetails,
        lifeAtCompany: updatedLifeAtCompany,
        skills: updatedSkills,
        similarJobs: updatedSimilarJobs,
        title: updatedTitle,
        apiJobStatus: apiJobDetailsConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobDetailsConstants.failure})
    }
  }

  renderJobItemDetailsViewList = () => {
    const {jobDetails, lifeAtCompany, skills, similarJobs, title} = this.state

    return (
      <>
        <div className="job-item-details-sub-container">
          <div className="jobCompanyLogo-container">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="job-company-logo"
            />
            <div className="job-title-container">
              <p>{title}</p>
              <div className="job-rating-container">
                <AiFillStar color="#fbbf24" />
                <p>{lifeAtCompany.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-package-container">
            <GoLocation color="white" />
            <p>{lifeAtCompany.location}</p>
            <p>{jobDetails.employmentType}</p>
            <p>{lifeAtCompany.packagePerAnnum}</p>
          </div>
          <hr className="job-bottom-line" />
          <div className="visit-url-container">
            <h1 className="job-description-heading">Description</h1>
            <a href={jobDetails.companyWebsiteUrl} className="visit-link">
              Visit
              <span>
                <FaExternalLinkAlt />
              </span>
            </a>
          </div>
          <p className="job-description-para">{jobDetails.jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(each => (
              <li className="skill-item-container">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skill-image"
                  key={each.name}
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.lifeDescription}
            </p>
            <img
              src={lifeAtCompany.lifeImageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>

        <div className="similar-jobs-container">
          <h1 className="similar-job-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobs.map(eachJob => (
              <SimilarJobs similarJobItem={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="job-details-retry-button"
        onClick={this.onClickJobDetailsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsView = () => {
    const {apiJobStatus} = this.state
    console.log(apiJobStatus)

    switch (apiJobStatus) {
      case apiJobDetailsConstants.success:
        return this.renderJobItemDetailsViewList()
      case apiJobDetailsConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiJobDetailsConstants.inProgress:
        return this.renderJobDetailsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-job-item-details-container">
          <div className="job-item-details-container">
            {this.renderJobItemDetailsView()}
          </div>
        </div>
      </>
    )
  }
}
export default JobDetails
