
export type Widget = { id: string; name: string; text: string }
export type Category = { id: string; title: string; widgetIds: string[] }
export type DashboardData = { categories: Category[]; widgetLibrary: Widget[] }
