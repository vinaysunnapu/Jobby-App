import './index.css'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'

const SimilarJobs = props => {
  const {similarJobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobItem
  return (
    <li className="similar-job-item-container">
      <div className="similar-company-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-image"
        />
        <div>
          <p className="similar-title">{title}</p>
          <div className="similar-rating-container">
            <AiFillStar color="#fbbf24" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-heading">Description</h1>
      <p className="similar-description-para">{jobDescription}</p>
      <div className="similar-bottom-container">
        <GoLocation color="white" />
        <p>{location}</p>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
