import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'

export default function AppLayout() {
  return (
    <div className="app">
      <TopNav />
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}
