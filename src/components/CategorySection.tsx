
import React, { useMemo, useState } from 'react'
import { useDash } from '../store'
import WidgetCard from './WidgetCard'
import AddWidgetModal from './AddWidgetModal'

export default function CategorySection({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const { categories, widgetLibrary } = useDash()
  const category = categories.find(c => c.id === id)!
  const widgets = useMemo(() =>
    category.widgetIds
      .map(wid => widgetLibrary.find(w => w.id === wid))
      .filter(Boolean) as typeof widgetLibrary, [category.widgetIds, widgetLibrary])

  return (
    <section className="category">
      <div className="category-header">
        <div className="category-title">{category.title}</div>
        <div className="toolbar">
          <span className="badge">{category.widgetIds.length} widgets</span>
          <button className="btn secondary" onClick={() => setOpen(true)}>+ Add Widget</button>
        </div>
      </div>
      <div className="widgets">
        {widgets.map(w => (<WidgetCard key={w.id} widget={w} categoryId={category.id}/>))}
        <div className="add-tile">
          <button onClick={() => setOpen(true)}>+ Add Widget</button>
        </div>
      </div>
      {open && <AddWidgetModal category={category} onClose={() => setOpen(false)} />}
    </section>
  )
}
