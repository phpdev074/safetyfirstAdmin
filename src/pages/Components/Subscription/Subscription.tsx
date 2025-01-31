import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import SubscriptionList from './SubscriptionList'

function Subscription() {
  return (
    <>
    <Breadcrumb pageName="Subscription" />
    <div className="flex flex-col gap-10">
      <SubscriptionList />
    </div>
  </>
  )
}

export default Subscription