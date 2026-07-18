import { createBrowserRouter, RouterProvider } from 'react-router'
import { Shell } from './components/shell/Shell'
import { BrainPage } from './routes/brain/BrainPage'
import { CompanyPage } from './routes/company/CompanyPage'
import { FoundersPage } from './routes/founders/FoundersPage'
import { FundPage } from './routes/fund/FundPage'
import { PipelinePage } from './routes/pipeline/PipelinePage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Shell,
    children: [
      { index: true, Component: BrainPage },
      { path: 'pipeline', Component: PipelinePage },
      { path: 'founders', Component: FoundersPage },
      { path: 'fund', Component: FundPage },
      { path: 'company/:id', Component: CompanyPage },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
