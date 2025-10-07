import PassTypeSelect from '../fields/PassTypeSelect'
import DateField from '../fields/DateField'
import FullNameField from '../fields/FullNameField'
import ReasonField from '../fields/ReasonField'
import CarBrandField from '../fields/CarBrandField'
import CarModelField from '../fields/CarModelField'
import CarPlateField from '../fields/CarPlateField'

export default function RequestForm({ value, onChange, onSubmit, submitting }) {
  const v = value
  const set = (k)=> (val)=> onChange({ ...v, [k]: val })

  return (
    <form className="card" onSubmit={e=>{e.preventDefault(); onSubmit?.()}}>
      <div className="grid2">
        <PassTypeSelect value={v.passType} onChange={set('passType')} />
        <DateField value={v.date} onChange={set('date')} />

        <FullNameField value={v.fullName} onChange={set('fullName')} />
        <ReasonField value={v.reason} onChange={set('reason')} />

        {v.passType === 'car' && (
          <>
            <CarBrandField value={v.carBrand} onChange={set('carBrand')} />
            <CarModelField value={v.carModel} onChange={set('carModel')} />
            <CarPlateField value={v.carPlate} onChange={set('carPlate')} />
          </>
        )}
      </div>

      <button className="btn btn--primary" type="submit" disabled={submitting}>
        Подать заявку
      </button>
    </form>
  )
}
