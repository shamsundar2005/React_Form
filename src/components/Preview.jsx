import React from 'react'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function Preview({ data }) {
  function exportPDF() {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Form Data', 14, 20)

    const rows = Object.entries(data).map(([k, v]) => [k.charAt(0).toUpperCase() + k.slice(1), v || ''])

    // autoTable: columns: Field, Value
    // @ts-ignore
    doc.autoTable({
      startY: 30,
      head: [['Field', 'Value']],
      body: rows,
      styles: { cellPadding: 3, fontSize: 11 },
      headStyles: { fillColor: [41, 128, 185] }
    })

    doc.save('form-data.pdf')
  }

  function exportExcel() {
    // Create worksheet with a single row containing the form values
    const ws = XLSX.utils.json_to_sheet([data])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'FormData')

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'form-data.xlsx')
  }

  return (
    <div className="preview">
      <div className="preview-grid">
        {Object.entries(data).map(([k, v]) => (
          <div className="field" key={k}>
            <div className="label">{k.charAt(0).toUpperCase() + k.slice(1)}</div>
            <div className="value">{v || '-'}</div>
          </div>
        ))}
      </div>

      <div className="export-actions">
        <button onClick={exportPDF}>Export as PDF</button>
        <button onClick={exportExcel}>Export as Excel</button>
      </div>
    </div>
  )
}
