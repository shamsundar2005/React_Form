import React, { useState, useEffect } from 'react'

const initial = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: ''
}

export default function Form({ onSubmit, initialData }) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (initialData) setValues(initialData)
  }, [initialData])

  function validate() {
    const e = {}

    if (!values.name.trim())
      e.name = 'Name is required.'

    if (!values.email.trim())
      e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = 'Invalid email format.'

    if (values.phone && !/^\d{10}$/.test(values.phone))
      e.phone = 'Phone must be 10 digits.'

    return e
  }

  function handleChange(e) {
    const { name, value } = e.target

    setValues(v => ({ ...v, [name]: value }))

    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const eObj = validate()
    setErrors(eObj)

    if (Object.keys(eObj).length === 0) {
      setSubmitted(true)
      onSubmit(values)
      setValues(initial)
    } else {
      setSubmitted(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>

      <label>
        Name *
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </label>

      <label>
        Email *
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </label>

      <label>
        Phone
        <input
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </label>

      <label>
        Address
        <input
          name="address"
          value={values.address}
          onChange={handleChange}
        />
      </label>

      <div className="row">
        <label>
          City
          <input name="city" value={values.city} onChange={handleChange} />
        </label>

        <label>
          State
          <input name="state" value={values.state} onChange={handleChange} />
        </label>

        <label>
          Zip
          <input name="zip" inputMode="numeric" value={values.zip} onChange={handleChange} />
        </label>
      </div>

      <div className="actions">
        <button type="submit" disabled={submitted}>
          {submitted ? "Submitting..." : "Submit"}
        </button>

        {submitted && <span className="success">Submitted ✓</span>}
      </div>

    </form>
  )
}
