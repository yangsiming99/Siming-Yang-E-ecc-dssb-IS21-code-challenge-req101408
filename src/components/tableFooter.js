import styles from '@/styles/TableFooter.module.css'

/**
 * TableFooter is a component that displays the total size of a table.
 *
 * @component
 * @example
 * // Render the component
 * <TableFooter size={10} />
 *
 * @param {object} props - The component props.
 * @param {number} props.size - The total size of the table.
 * @returns {JSX.Element} The rendered component.
 */
export default function TableFooter({ size }) {
  return (
    <div className={styles.tableFooter}>
      <b>Total: {size}</b>
    </div>
  )
}