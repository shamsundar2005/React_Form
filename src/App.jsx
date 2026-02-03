import React, { useState } from 'react'
import Form from './components/Form'
import Preview from './components/Preview'

export default function App() {
  const [formData, setFormData] = useState(null)

  function handleSubmit(data) {
    setFormData(data)
  }

  return (
    <div className="container">
      <h1>Form Export App</h1>
      <div className="grid">
        <div className="card">
          <h2>Enter your details</h2>
          <Form onSubmit={handleSubmit} initialData={formData} />
        </div>
        <div className="card">
          <h2>Preview</h2>
          {formData ? (
            <Preview data={formData} />
          ) : (
            <p className="muted">Fill the form and submit to see a preview and export options.</p>
          )}
        </div>
      </div>
    </div>
  )
}
