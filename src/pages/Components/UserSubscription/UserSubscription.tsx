import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import UserSubscriptionList from './UserSubscriptionList'

function UserSubscription() {
  return (
    <>
      <Breadcrumb pageName="Subscription List" />
      <div className="flex flex-col gap-10">
        <UserSubscriptionList />
      </div>
    </>
  )
}

export default UserSubscription