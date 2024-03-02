import React from 'react';
import Image from 'next/image';
import mlbIcon from '../../assets/icons/sports-icon/mlb.svg';
import cbbIcon from '../../assets/icons/sports-icon/cbb.svg';
import cfbIcon from '../../assets/icons/sports-icon/cfb.svg';
import nbaIcon from '../../assets/icons/sports-icon/nba.svg';
import nhlIcon from '../../assets/icons/sports-icon/nhl.svg';
import nflIcon from '../../assets/icons/sports-icon/nlf.svg';
import notFoundPath from '../../assets/not-found-path.svg';

export default function SubSidebarNotFound({ pathname }: { pathname: any }) {
  function getIcon(sports: string) {
    switch (sports) {
      case 'MLB':
        return mlbIcon;
      case 'CBB':
        return cbbIcon;
      case 'CFB':
        return cfbIcon;
      case 'NBA':
        return nbaIcon;
      case 'NHL':
        return nhlIcon;
      case 'NFL':
        return nflIcon;
      default:
        return mlbIcon;
    }
  }
  return (
    <div
      style={{
        width: 280,
        borderRight: '1px solid #EDEDED',
        // border: "10px solid red",
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 20,
          paddingLeft: 5,
          marginTop: 15,
          color: '#0D0D54',
        }}
      >
        Caesars Entertainment
      </div>
      <div
        style={{
          fontWeight: 400,
          fontSize: 14,
          paddingLeft: 5,
          color: '#4F5B67',
        }}
      >
        Player Props System
      </div>
      <div className='text-[#6B6B6B] text-center h-full flex flex-col justify-center items-center'>
        <Image
          src={getIcon(pathname.toUpperCase())}
          alt=''
          width={70}
          height={70}
          className='grayscale'
        />
        <Image
          src={notFoundPath}
          alt=''
          width={180}
          height={100}
          className='mt-5'
        />
        <div className='flex items-center justify-center text-sm font-semibold mt-5'>
          You don’t have any <p className='uppercase px-1'>{pathname}</p>{' '}
          Matches
        </div>
        <div className='text-xs font-normal mt-2 leading-5'>
          You dont have any matches in the respective sports
        </div>
      </div>
    </div>
  );
}
