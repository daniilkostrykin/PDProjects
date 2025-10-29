import { useEffect, useState } from 'react'
import ApprovedTable from './components/ApprovedTable'
import { PassesApi } from '@/services/api/passes.api'

export default function AdminApproved() {
  const [approvedPasses, setApprovedPasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApprovedPasses = async () => {
      try {
        setLoading(true)
        const data = await PassesApi.listAll({ status: 'APPROVED' })
        setApprovedPasses(data)
      } catch (error) {
        console.error('Error fetching approved passes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApprovedPasses()
  }, [])

  if (loading) {
    return <div>Загрузка...</div>
  }

  return <ApprovedTable rows={approvedPasses} />
}
