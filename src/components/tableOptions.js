import styles from '@/styles/TableOptions.module.css'
import { Button } from 'react-bootstrap'

/**
 * TableOptions is a component that displays options for a table.
 *
 * @component
 * @example
 * // Render the component
 * <TableOptions show={handleShow} />
 *
 * @param {object} props - The component props.
 * @param {function} props.show - The function to handle showing options.
 * @returns {JSX.Element} The rendered component.
 */
export default function TableOptions({ show }) {
  return (
    <div className={styles.optionsBar}>
      <Button onClick={() => show(true)}>+ Add Project</Button>
    </div>
  )
}