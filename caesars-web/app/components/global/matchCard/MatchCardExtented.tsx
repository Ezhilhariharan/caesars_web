import React, { useState } from 'react';
import Title from '../title/Title';
import MatchCardExtentedTask from './MatchCardExtentedTask';
import UpcomingMatchCardHeader from './UpcomingMatchCardHeader';
import UpcomingMatchMeta from './UpcomingMatchCardMeta';
import UpcomingMatchProgress from './UpcomingMatchCardProgress';
import UpcomingMatchContributors from './UpcomingMatchCardContributors';
import CardContainer from '../cardContainer/CardContainer';
import { Button } from '../../Button';
import { StaticImageData } from 'next/image';
import SportsLogo from '@/app/components/global/SportsLogo';
import { divide } from 'cypress/types/lodash';
import MatchDetails from '../../matchDetails/MatchDetails';

type MatchCardExtentedProps = {
  matchId?: any;
  header: {
    team1_image: string;
    team2_image: string;
  };
  match?: any;
  sports: {
    team1_name?: string;
    team2_name?: string;
    location?: {
      name?: string;
      city?: string;
      country?: string;
    };
    image: string;
  };
  progress?: {
    percentage?: number;
    lastModifiedDate?: string;
  };
  contributors?: {
    users?: {
      id: number;
      first_name: string;
      last_name: string;
      middle_name: string;
    }[];
    matchDate?: string;
  };
  taskProcess?: any[];
};

const MatchCardExtented = (props: MatchCardExtentedProps) => {
  const {
    matchId,
    header,
    match,
    sports,
    progress,
    contributors,
    taskProcess,
  } = props;
  const [toggle, setToggle] = useState<boolean>(false);
  const [openModal, setopenModal] = useState(false);

  return (
    <CardContainer
      cardClassName='overflow-hidden'
      style={{
        width: '100%',
        // maxWidth: '379px',
        height: 'auto',
        // padding: "12px 28px",
        background: '#fff',
      }}
      // className="w-[372px] h-auto px-7 py-3 bg-white"
    >
      <UpcomingMatchCardHeader
        team1_image={header?.team1_image || null}
        team2_image={header?.team2_image || null}
        team1_name={sports?.team1_name || null}
        team2_name={sports?.team2_name || null}
        primary={false}
      />
      <UpcomingMatchMeta
        team1_name={sports?.team1_name}
        team2_name={sports?.team2_name}
        location={sports?.location}
        image={sports?.image}
      />
      <UpcomingMatchProgress
        percentage={progress?.percentage}
        barHeight={16}
        circleWidth={25}
        // lastModifiedDate={progress?.lastModifiedDate}
        style={{ width: '100%' }}
      />
      {/* <div className="h-[55px] px-5 border-y-[3px] border-[#F9F9F9] text-[#54577A] text-sm font-medium flex justify-center items-center">
        View Full Details
      </div> */}
      <UpcomingMatchContributors
        users={contributors?.users || []}
        matchDate={contributors?.matchDate}
      />

      <div className='px-7'>
        <div className='flex  items-center justify-between pb-2 border-b border-[#F5F5F7]'>
          <Title title='Task' style={{ color: '#141522' }} />
          <p className='text-xs font-medium text-[#54577A]'>Roster Makers</p>
        </div>

        <div className='my-5'>
          <MatchCardExtentedTask matchId={matchId} primary={false} />
        </div>
        <Button
          backgroundColor='#4285F4'
          primary
          label='View Task'
          size='medium'
          style={{
            width: '100%',
            margin: '12px auto 40px',
          }}
          onClick={() => setopenModal(true)}
        />
      </div>
      <MatchDetails
        match={match}
        title={sports?.team1_name + ' vs ' + sports?.team2_name}
        id={matchId}
        open={openModal}
        setModelOpen={setopenModal}
      />
    </CardContainer>
  );
};

export default MatchCardExtented;
