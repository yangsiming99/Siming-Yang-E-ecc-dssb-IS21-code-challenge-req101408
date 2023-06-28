import styles from '@/styles/ProjectRow.module.css'

/**
 * ProjectRow is a component that displays project details.
 *
 * @component
 * @example
 * // Render the component
 * <ProjectRow data={projectData} />
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The project data.
 * @param {string} props.data.productName - The product title.
 * @param {string} props.data.productOwnerName - The product owner's name.
 * @param {string} props.data.scrumMasterName - The scrum master's name.
 * @param {string} props.data.startDate - The start date of the project.
 * @param {string} props.data.methodology - The project methodology.
 * @param {string} props.data.location - The project location.
 * @param {string[]} props.data.Developers - The list of developers.
 * @returns {JSX.Element} The rendered component.
 */
export default function ProjectRow({ data }) {
  const {
    productName,
    productOwnerName,
    scrumMasterName,
    startDate,
    methodology,
    location,
    Developers
  } = data

  // formats the developers list into a comma seperated string
  const format_developers = () => {
    let formatted_string = ""
    for (let i = 0; i < Developers.length; i++) {
      if (Developers[i] === "") {
        continue
      }
      else if (i == 0) {
        formatted_string += `${Developers[i]}`
      }
      else {
        formatted_string += `, ${Developers[i]} `
      }
    }
    return formatted_string
  }

  const devView = format_developers()

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectRow}>
        <div>
          <div>Product Title:</div>
          <div><b>{productName}</b></div>
        </div>
        <div>
          <div>Product Owner:</div>
          <div><b>{productOwnerName}</b></div>
        </div>
        <div>
          <div>Scrum Master:</div>
          <div><b>{scrumMasterName}</b></div>
        </div>
        <div>
          <div>Methodology:</div>
          <div><b>{methodology}</b></div>
        </div>
        <div>
          <div>Link:</div>
          <div><a target="_blank" href={location}><b>{location}</b></a></div>
        </div>
        <div>
          <div>Start Date:</div>
          <div><b>{startDate}</b></div>
        </div>
      </div>
      <div className={styles.devRow}>
        <div >
          <div className={styles.devHeader}>Developers:</div>
          <div><b>{devView}</b></div>
        </div>
      </div>
    </div>
  )
}