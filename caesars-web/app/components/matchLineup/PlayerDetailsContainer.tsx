import React, { useEffect, useState } from 'react';
import TeamPlayerDetails from './utils/TeamPlayerDetails';
import { patch } from '@/app/apiIntegrations/fetcher';
import Avatar from '../global/Avatar';
import Toast, { toastProps } from '../global/toast/Toast';

type Props = {
  matchId: any;
  selectedPlayer: any;
  fixtureName: any;
  rosters: any;
  teamTitle: any;
  onPlayerClick: any;
  onOrderChange: any;
  logo: any;
  status: any;
  user: any;
  allow: any;
};

const PlayerDetailsContainer = (props: Props) => {
  const {
    matchId,
    selectedPlayer,
    fixtureName,
    rosters,
    teamTitle,
    onPlayerClick,
    onOrderChange,
    logo,
    allow,
  } = props;

  const [orderUpdated, setOrderUpdated] = useState(false);
  const [uList, setUList] = useState([]);
  // const [allow, setAllow] = useState(false);

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'error',
    title: '',
    discription: '',
    logo: '',
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  async function handleUpdate() {
    try {
      setOrderUpdated(false);
      const data = uList.map((d: any, i: number) => {
        return { id: d.id, order: i };
      });

      const res = await patch('bulk-update-roster-orders', {
        data,
        matchId,
        fixtureName,
      });
      // toast
      setToastPopup(true);
      setToastDetails({
        type: 'success',
        title: 'Success',
        discription: 'Line-up has been Updated.',
      });
    } catch (e) {
      console.warn(e);
    }
  }
  return (
    <>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className='bg-white h-[800px] px-5 py-2.5 border rounded-lg overflow-y-scroll max-[1600px]:h-[600px]'>
        <div className='flex items-center'>
          <div className='flex justify-center font-medium text-lg text-[#999]'>
            <Avatar image={logo} name={teamTitle} width={60} height={60} />
          </div>
          <p className='pl-2 text-[18px] font-semibold max-[1600px]:text-[16px]'>
            {teamTitle}
          </p>
        </div>
        <div className='w-full h-full my-1'>
          <div className='w-full h-[60px] flex items-center justify-end gap-5 sticky top-0'>
            <button
              className={`h-8 px-5 rounded-[4px] text-white ${
                allow
                  ? orderUpdated
                    ? 'cursor-pointer'
                    : 'cursor-default'
                  : 'cursor-not-allowed'
              }`}
              style={{ background: orderUpdated ? '#4285F4' : '#ccc' }}
              onClick={() => {
                if (allow) if (orderUpdated) handleUpdate();
              }}
            >
              Update
            </button>
          </div>
          <div className='w-full h-10 flex items-center bg-[#F0F1F3] px-5'>
            <div className='w-1/3 text-[13px] font-medium text-[#4285F4]'>
              All Players
            </div>
            {/* <div className='w-1/3 text-[13px] font-medium border-l pl-2 text-[#14171C]'>
              Playing
            </div>
            <div className='w-1/3 text-[13px] font-medium border-l pl-2 text-[#14171C]'>
              Bench
            </div> */}
          </div>

          <div className='mt-2.5'>
            <TeamPlayerDetails
              rosters={rosters}
              allow={allow}
              onPlayerClick={onPlayerClick}
              selectedPlayer={selectedPlayer}
              onOrderChange={(list: any) => {
                setOrderUpdated(true);
                setUList(list);
                onOrderChange(list);
              }}
            />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default PlayerDetailsContainer;
