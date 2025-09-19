
import React from 'react'
import { useDash } from './store'
import CategorySection from './components/CategorySection'
import './styles.css'

export default function App(){
  const categories = useDash(s => s.categories)
  const search = useDash(s => s.search)
  const setSearch = useDash(s => s.setSearch)

  return (
    <div className="container">
      <div className="header">
        <h1>CNAPP Dashboard</h1>
        <div className="search">
          <input placeholder="Search widgets in library..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <span className="badge">Assignment</span>
      </div>
      <div className="grid" style={{marginTop:12}}>
        {categories.map(c => (<CategorySection key={c.id} id={c.id}/>))}
      </div>
      <p className="small" style={{marginTop:16}}>Demo UI inspired by screenshot. Widgets contain placeholder text.</p>
    </div>
  )
}
