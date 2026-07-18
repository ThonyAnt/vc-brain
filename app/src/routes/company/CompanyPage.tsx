import { useParams } from 'react-router'
import { Eyebrow } from '../../components/ui/Eyebrow'

export function CompanyPage() {
  const { id } = useParams()
  return (
    <div className="p-8">
      <Eyebrow>Company</Eyebrow>
      <h1 className="display-sm mt-2">{id}</h1>
    </div>
  )
}
