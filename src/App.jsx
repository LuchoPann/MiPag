import { HashRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './Portfolio'
import ProjectPage from './ProjectPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/proyecto/:id" element={<ProjectPage />} />
      </Routes>
    </HashRouter>
  )
}
