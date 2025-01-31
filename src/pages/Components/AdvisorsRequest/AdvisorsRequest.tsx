import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import AdvisorsRequestTable from './AdvisorsRequestTable'

function AdvisorsRequest() {
  return (
    <>
    <Breadcrumb pageName="Advisors Request" />
    <div className="flex flex-col gap-10">
      <AdvisorsRequestTable />
    </div>
  </>
  )
}

export default AdvisorsRequest