import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// icons
import activityImage from '../../assets/Activity.svg';

// API fetchers
import { get } from '@/app/apiIntegrations/fetcher';

// cord container
import CardContainer from '../global/cardContainer/CardContainer';
import CardBody from '../global/cardContainer/CardBody';

const ActivityCard = () => {
  const data = [20, 40, 30, 50, 25, 30, 19];
  const [cd, setCd] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await get('dashboard/activity_overview');
    setCd(res);
  }

  return (
    <CardContainer
      style={{
        width: '458px',
        height: '214px',
        backgroundColor: '#ECF3FE',
        padding: '20px',
      }}
      header='Activity'
    >
      <CardBody
        style={{
          width: '422px',
          height: '150px',
          margin: '2px auto 0',
        }}
      >
        <Image src={activityImage} alt='' />

        {/* <Line data={data}  /> */}
        {/* <LineChart data={cd} /> */}
        {/* <SpineChart dataColors='["blue", "red", "green"]' /> */}
        {/* <DashedLine data={cd} dataColors='["black", "red", "green"]' /> */}
      </CardBody>
    </CardContainer>
  );
};

export default ActivityCard;
