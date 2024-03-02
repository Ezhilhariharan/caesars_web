import React from 'react';
import CardContainer from './cardContainer/CardContainer';
import { allMonths } from './staticCalenderDatas';
import dateConverter from '@/app/lib/dateConverter';

type Props = {
  match: any;
  venue?: any;
  rowDate?: any;
};

const MatchDeatilsCard = ({ match, venue, rowDate }: Props) => {
  let date = new Date(match?.fixture_start_at);

  const rowDateConvert = dateConverter(rowDate);

  const fixtureStartAt = dateConverter(match?.fixture_start_at);

  return (
    <CardContainer
      header='Match Details'
      titleStyle={{
        fontSize: '21px',
        color: '#141522',
      }}
      style={{
        width: '100%',
        height: '198px',
        padding: '20px',
        border: '1px solid #E0E3E8',
      }}
    >
      <div className='h-auto'>
        <div className='flex my-3'>
          <div className='flex-1'>
            <h2 className='text-[13px] font-semibold text-[#141522]'>Venue:</h2>
            {!venue && (
              <div className='text-[13px] font-normal text-[#54577A]'>
                <div>{venue ? venue : match?.venue_name}</div>
                <div>
                  {match?.data
                    ? `${match?.city_name}, ${match?.country_alpha2_code}`
                    : '--'}
                </div>
                <div></div>
              </div>
            )}
            {venue && (
              <div className='text-[13px] font-normal text-[#54577A]'>
                {venue ? venue : '--'}
              </div>
            )}
          </div>
          {!rowDate && (
            <div className='flex-1'>
              <h2 className='text-[13px] font-semibold text-[#141522]'>
                Date:
              </h2>
              <p className='text-[13px] font-normal text-[#54577A]'>
                {fixtureStartAt.monthInString &&
                fixtureStartAt.date &&
                fixtureStartAt.year
                  ? `${fixtureStartAt.monthInString} ${fixtureStartAt.date} 
                ${fixtureStartAt.year}`
                  : '--'}
              </p>
              <p className='text-[13px] font-normal text-[#54577A]'>
                {fixtureStartAt.timeString ? fixtureStartAt.timeString : '--'}
              </p>
            </div>
          )}
          {rowDate && (
            <div className='flex-1'>
              <h2 className='text-[13px] font-semibold text-[#141522]'>
                Date:
              </h2>
              <p className='text-[13px] font-normal text-[#54577A]'>
                {rowDateConvert.monthInString &&
                rowDateConvert.date &&
                rowDateConvert.year
                  ? `${rowDateConvert.monthInString} ${rowDateConvert.date}{' '}
                ${rowDateConvert.year}`
                  : '--'}
              </p>
              <p className='text-[13px] font-normal text-[#54577A]'>
                {rowDateConvert.timeString ? rowDateConvert.timeString : '--'}
                {/* {rowDateConvert.hours}:{rowDateConvert.minutes} */}
              </p>
            </div>
          )}
        </div>
        <div className='flex'>
          <div>
            <h2 className='text-[13px] font-semibold text-[#141522]'>
              Weather:
            </h2>
            <p className='text-[13px] font-normal text-[#54577A]'>
              36' F Mostly Warmer
              {/* {matchDetails?.weather} */}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </CardContainer>
  );
};

export default MatchDeatilsCard;
