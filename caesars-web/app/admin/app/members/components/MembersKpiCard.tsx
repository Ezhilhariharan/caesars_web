import React from 'react';

type Props = {
  count: {
    title?: any;
    value?: any;
  }[];
};

const MembersKpiCard = (props: Props) => {
  const { count } = props;
  return (
    <>
      {count?.map((count) => {
        const { title, value } = count;
        return (
          <>
            {title !== '' && value !== '' ? (
              <div className='text-center'>
                <p className='text-xl font-bold text-[#0A1629]'>{value}</p>
                <p className='text-xs font-normal text-[#54577A]'>{title}</p>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </>
  );
};

export default MembersKpiCard;
