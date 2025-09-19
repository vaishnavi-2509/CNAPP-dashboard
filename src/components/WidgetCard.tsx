
import React from 'react'
import { useDash } from '../store'
import type { Widget } from '../types'

export default function WidgetCard({ widget, categoryId }: { widget: Widget; categoryId: string }) {
  const remove = useDash(s => s.removeWidgetFromCategory)
  return (
    <div className="widget">
      <button className="close" title="Remove" onClick={() => remove(categoryId, widget.id)}>×</button>
      <h4>{widget.name}</h4>
      <p className="small">{widget.text}</p>
      <div className="empty">No chart data</div>
    </div>
  )
}
