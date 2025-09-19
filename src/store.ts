
import { create } from 'zustand'
import { nanoid } from 'nanoid'
import type { Category, Widget } from './types'
import { initialData } from './data'

type State = {
  categories: Category[]
  widgetLibrary: Widget[]
  search: string
  setSearch: (q: string) => void
  addExistingWidgetToCategory: (categoryId: string, widgetId: string) => void
  removeWidgetFromCategory: (categoryId: string, widgetId: string) => void
  createAndAddWidget: (categoryId: string, name: string, text: string) => void
  toggleWidgetInCategory: (categoryId: string, widgetId: string, enabled: boolean) => void
}

function uniq<T>(arr: T[]): T[] { return Array.from(new Set(arr)) }

export const useDash = create<State>((set, get) => ({
  categories: initialData.categories,
  widgetLibrary: initialData.widgetLibrary,
  search: '',
  setSearch: (q) => set({ search: q }),
  addExistingWidgetToCategory: (categoryId, widgetId) =>
    set((s) => ({
      categories: s.categories.map((c) =>
        c.id === categoryId ? { ...c, widgetIds: uniq([...c.widgetIds, widgetId]) } : c
      ),
    })),
  removeWidgetFromCategory: (categoryId, widgetId) =>
    set((s) => ({
      categories: s.categories.map((c) =>
        c.id === categoryId ? { ...c, widgetIds: c.widgetIds.filter((id) => id !== widgetId) } : c
      ),
    })),
  createAndAddWidget: (categoryId, name, text) =>
    set((s) => {
      const id = nanoid(8)
      const widget: Widget = { id, name, text }
      return {
        widgetLibrary: [widget, ...s.widgetLibrary],
        categories: s.categories.map((c) =>
          c.id === categoryId ? { ...c, widgetIds: [id, ...c.widgetIds] } : c
        ),
      }
    }),
  toggleWidgetInCategory: (categoryId, widgetId, enabled) => {
    const cat = get().categories.find(c => c.id === categoryId)
    const present = !!cat?.widgetIds.includes(widgetId)
    if (enabled && !present) get().addExistingWidgetToCategory(categoryId, widgetId)
    if (!enabled && present) get().removeWidgetFromCategory(categoryId, widgetId)
  },
}))
