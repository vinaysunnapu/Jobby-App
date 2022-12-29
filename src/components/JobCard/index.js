import './index.css'
import {Link} from 'react-router-dom'

import {GoLocation} from 'react-icons/go'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-list-item-container">
      <Link to={`/jobs/${id}`}>
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-image"
          />
          <div>
            <h1 className="title-heading">{title}</h1>
            <div className="rating-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star-image"
              />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-container">
          <GoLocation />
          <p>{location}</p>

          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="job-item-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
