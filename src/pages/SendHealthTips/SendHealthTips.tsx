import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import SendHealthTipsModule from './SendHealthTipsModule'

function SendHealthTips() {
    return (
        <>
            <Breadcrumb pageName="Send Health Tips" />
            <div className="flex flex-col gap-10">
                <SendHealthTipsModule />
            </div>
        </>
    )
}

export default SendHealthTips