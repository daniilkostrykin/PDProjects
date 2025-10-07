import { useState } from 'react'
import RequestForm from './RequestForm/RequestForm'
import HistoryFilters from './HistoryFilters'
import HistoryTable from './HistoryTable'

export default function RequestPage() {
  const [form, setForm] = useState({
    passType:'car', date:'', fullName:'', reason:'',
    carBrand:'', carModel:'', carPlate:''
  })
  const [submitting, setSubmitting] = useState(false)
  const [filters, setFilters] = useState({ status:'', q:'' })
  const [history, setHistory] = useState([])

  const submit = async () => {
    setSubmitting(true)
    try {
      // TODO: здесь будет вызов твоего бэка, когда появится эндпоинт
      const row = { ...form, status:'pending' }
      setHistory([row, ...history])
      setForm({ passType:'car', date:'', fullName:'', reason:'', carBrand:'', carModel:'', carPlate:'' })
    } finally { setSubmitting(false) }
  }

  const filtered = history.filter(r =>
    (!filters.status || r.status===filters.status) &&
    (!filters.q || JSON.stringify(r).toLowerCase().includes(filters.q.toLowerCase()))
  )

  return (
    <>
      <RequestForm value={form} onChange={setForm} onSubmit={submit} submitting={submitting} />
      <HistoryFilters value={filters} onChange={setFilters} />
      <HistoryTable rows={filtered} />
    </>
  )
}
