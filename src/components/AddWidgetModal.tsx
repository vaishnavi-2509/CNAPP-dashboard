import React, { useMemo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'    
import { useDash } from '../store'
import type { Category } from '../types'

type Props = { category: Category; onClose: () => void }

export default function AddWidgetModal({ category, onClose }: Props) {
  const { widgetLibrary, toggleWidgetInCategory, createAndAddWidget } = useDash()
  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newText, setNewText] = useState('')

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return widgetLibrary
    return widgetLibrary.filter(w =>
      w.name.toLowerCase().includes(q) || w.text.toLowerCase().includes(q)
    )
  }, [widgetLibrary, query])


  return createPortal(
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header>
          <strong>Add Widget</strong>
          <button className="close" onClick={onClose}>×</button>
        </header>

        <div className="content">
          <div className="section">
            <h3>Library <span className="badge">{list.length}</span></h3>
            <div className="field">
              <input
                placeholder="Search widgets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="helper">Check/uncheck to add/remove from <b>{category.title}</b></div>
            </div>
            <div className="list">
              {list.map(w => {
                const checked = category.widgetIds.includes(w.id)
                return (
                  <label className="item" key={w.id}>
                    <span className="checkbox">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => toggleWidgetInCategory(category.id, w.id, e.target.checked)}
                      />
                      <b>{w.name}</b>
                    </span>
                    <span className="small">{w.text}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="section">
            <h3>Create new</h3>
            <div className="field">
              <label>Name</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Widget name" />
            </div>
            <div className="field">
              <label>Text</label>
              <textarea value={newText} onChange={e => setNewText(e.target.value)} placeholder="Widget text" />
            </div>
            <button
              className="btn"
              onClick={() => {
                if (!newName.trim()) return
                createAndAddWidget(category.id, newName.trim(), newText.trim() || 'Custom widget')
                setNewName(''); setNewText('')
              }}
            >
              Add to {category.title}
            </button>
            <p className="helper">Creates a new widget in the library and adds it to this category.</p>
          </div>
        </div>

        <div className="footer">
          <button className="btn secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.body
  )
}
