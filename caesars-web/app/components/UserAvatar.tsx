import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import Avatar from './global/Avatar';
import { getUserFromLocalstorage } from '../lib/localstorageHelpers';

type Props = {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  width: number;
  height: number;
};

export default function UserAvatar(props: Props) {
  const {
    id,
    first_name,
    last_name,
    middle_name,
    width = 40,
    height = 40,
  } = props;

  const [user, setuser] = useState<any>(null);

  useEffect(() => {
    setuser(getUserFromLocalstorage());
  }, []);

  return (
    <div>
      {user?.user_id === id ? (
        <Tooltip placement='top' title={`${first_name} ${last_name}`}>
          <Avatar
            name={`${first_name} ${last_name}`}
            width={width}
            height={height}
          />
        </Tooltip>
      ) : (
        <Tooltip placement='top' title={`${first_name} ${last_name}`}>
          <Avatar
            name={`${first_name} ${last_name}`}
            width={width}
            height={height}
          />
        </Tooltip>
      )}
    </div>
  );
}
