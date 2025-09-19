
# CNAPP Dashboard (Assignment)

See screenshots; this project reproduces the look-and-feel and the add/remove widget flow.

## Quickstart
```bash
npm i
npm run dev
```

## How it works
- `src/data.ts` holds the JSON used to build the dashboard.
- `zustand` store in `src/store.ts` manages categories and widgets and supports:
  - add/remove existing widgets to a category
  - create a new widget (name + text) and add it to a category
  - search (filters the library in the Add Widget modal)
- UI components:
  - `CategorySection` renders a category + its widgets and a `+ Add Widget` button
  - `AddWidgetModal` shows a checkbox list of all widgets and a form to create a new widget
  - `WidgetCard` renders each widget with an **×** remove button
```
