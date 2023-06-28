import styles from '@/styles/AddForm.module.css'
import { Form, Button } from 'react-bootstrap'
import { useEffect, useReducer, useState } from 'react'

const initial_info = {
  productName: "",
  productOwnerName: "",
  Developers: ["", "", "", "", ""],
  scrumMasterName: "",
  startDate: "",
  methodology: "Agile",
  location: ""
}

const infoReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value
      }
    case "UPDATE_DEV":
      state.Developers[action.field] = action.value
      return { ...state }
    default:
      return state
  }
}

/**
 * AddForm is a form component for adding product information.
 *
 * @component
 * @example
 * // Render the component
 * <AddForm title="Add Product" cancel={handleCancel} save={handleSave} />
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the form.
 * @param {function} props.cancel - The cancel event handler.
 * @param {function} props.save - The save event handler.
 * @returns {JSX.Element} The rendered component.
 */
export default function AddForm({ title, cancel, save }) {
  const [info, dispatchInfo] = useReducer(infoReducer, initial_info)
  const [disableSave, setdisableSave] = useState(true)

  useEffect(() => {
    if (verify_info() === true) {
      setdisableSave(false)
    }
    else {
      setdisableSave(true)
    }
  }, [info])

  const field_onChange = (event) => {
    const { name, value } = event.target
    dispatchInfo({ type: "UPDATE_FIELD", field: name, value })
  }

  const dev_onChange = (event) => {
    const { name, value } = event.target
    dispatchInfo({ type: "UPDATE_DEV", field: name, value })
  }

  const onAdd = () => {
    save(info)
    cancel(false)
  }

  const verify_info = () => {
    for (let key in info) {
      if (key === "Developers" && info[key][0] === "") {
        return false
      }
      else if (info[key] === "") {
        return false
      }
    }
    return true
  }

  return (
    <div className={styles.formBackground}>
      <div className={styles.formPanel}>
        <h1>{title}</h1>
        <Form>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="productName"
              onChange={field_onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Owner</Form.Label>
            <Form.Control name="productOwnerName" onChange={field_onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Scrum Master</Form.Label>
            <Form.Control name="scrumMasterName" onChange={field_onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control name="startDate" onChange={field_onChange} type="date" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Methodology</Form.Label>
            <Form.Select name="methodology" onChange={field_onChange} aria-label="Default select example">
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location" onChange={field_onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Developers</Form.Label>
            <Form.Control name="0" onChange={dev_onChange} placeholder='Required' />
            <Form.Control name="1" onChange={dev_onChange} />
            <Form.Control name="2" onChange={dev_onChange} />
            <Form.Control name="3" onChange={dev_onChange} />
            <Form.Control name="4" onChange={dev_onChange} />
          </Form.Group>
          <div className={styles.buttonBar}>
            <Button className={styles.actionButtons} variant="secondary" onClick={() => cancel(false)}>
              Cancel
            </Button>
            <Button className={styles.actionButtons} onClick={onAdd} disabled={disableSave}>
              Add
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}