import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SendHealthTipsList from './sendHealthTipsList';
import SendHealthTipsModule from './SendHealthTipsModule';

const SendHealthTips: React.FC = () => {
  const [showModule, setShowModule] = useState<boolean>(false);

  const handleToggleView = () => {
    setShowModule(!showModule);
  };

  return (
    <>
      <Breadcrumb pageName= {showModule ? "Add Health Tips":"Health Tips List"} />
      <div className="flex flex-col gap-10">
        {showModule ? (
          <SendHealthTipsModule handleToggleView={handleToggleView} />
        ) : (
          <SendHealthTipsList handleToggleView={handleToggleView} />
        )}
      </div>
    </>
  );
}

export default SendHealthTips;
