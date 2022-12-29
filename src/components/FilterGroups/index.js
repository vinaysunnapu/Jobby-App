import './index.css'

const FilterGroups = props => {
  const renderEmploymentTypeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachType => {
      const {changeEmploymentType} = props
      const onClickEmploymentType = () =>
        changeEmploymentType(eachType.employmentTypeId)

      return (
        <li
          className="employment-type-list-item"
          key={eachType.employmentTypeId}
          onClick={onClickEmploymentType}
        >
          <input type="checkbox" id={`checkbox ${eachType.employmentTypeId}`} />
          <label
            htmlFor={`checkbox ${eachType.employmentTypeId}`}
            className="employment-type-para"
          >
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachList => {
      const {changeSalaryRangeType} = props
      const onClickSalaryRange = () =>
        changeSalaryRangeType(eachList.salaryRangeId)

      return (
        <li className="salary-list-item" onClick={onClickSalaryRange}>
          <input
            type="radio"
            name="salary"
            id={`radio ${eachList.salaryRangeId}`}
          />
          <label htmlFor={`radio ${eachList.salaryRangeId}`}>
            {eachList.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="salary-range-container">
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul>{renderSalaryRangeList()}</ul>
    </div>
  )

  const renderEmploymentType = () => (
    <div className="employment-type-container">
      <h1 className="employment-type-heading">Type of Employment</h1>
      <ul className="employment-type-list">{renderEmploymentTypeList()}</ul>
    </div>
  )

  return (
    <div className="filter-group-container">
      {renderEmploymentType()}
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroups
