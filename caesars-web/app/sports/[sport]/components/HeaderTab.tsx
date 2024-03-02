import Image from 'next/image';

// icons
import close from '@/app/assets/icons/close.svg';
import pin from '@/app/assets/icons/pin.svg';

// hooks
import { useContextMenu } from '@/app/hooks/useContextMenu';

// components
import MenuList from '@/app/components/global/MenuList';

// antd
import { Dropdown, Popover } from 'antd';
import { onClose } from '../utils/onCloseTab';
import { closeAllUnpinnedTabs } from '../utils/closeUnpinnedtabs';
import React from 'react';
import DotsHorizontal from '@/app/assets1/custom-icons/dots/DotsHorizontal';

export const menuData = [
  { id: 1, name: 'close', icon: '' },
  { id: 2, name: 'pin', icon: '' },
];

type HeaderTabProps = {
  tabs: any[];
  onTabClick: (d: any) => void;
  setTabs: React.Dispatch<React.SetStateAction<any[]>>;
  selectedTabIndex: number | null;
  setSelectedTabindex: React.Dispatch<React.SetStateAction<number | null>>;
  onMenuClick: (d: any, item: any) => void;
  sportName: string;
  setMatchTabs: (data: any) => {};
};

export function HeaderTab(props: HeaderTabProps) {
  const {
    tabs = [],
    setTabs,
    onTabClick = () => {},
    selectedTabIndex = 0,
    setSelectedTabindex,
    onMenuClick,
    sportName,
    setMatchTabs,
  } = props;
  const { id, setId, showContextMenu, setShowContextMenu, coords, setCoords } =
    useContextMenu();

  const menus = [
    {
      key: 1,
      label: 'Close all unpinned tabs',
      onClick: () => {
        const res = closeAllUnpinnedTabs(sportName);
        setShowContextMenu(false);
        setId(null);
        if (res.length > 0) {
          setTabs(res);
          setSelectedTabindex(res[res.length - 1].matchId);
        }
      },
    },
    // {
    //   key: 1,
    //   label: 'Close all pinned tabs',
    //   onClick: () => {},
    // },
  ];

  const popoverContent = (
    <div className='w-auto px-5 py-2.5'>
      {menus.map((m: any) => {
        return (
          <div
            key={m.id}
            className='text-sm font-medium py-1.5 cursor-pointer'
            onClick={m.onClick}
          >
            {m.title}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className='w-full max-w-[1530px] max-h-[40px] h-full select-none flex items-center'>
      <div className='flex items-center overflow-x-scroll min-h-full'>
        {tabs?.map((d: any, i: number) => {
          return (
            <div
              key={'header' + i}
              className={`px-2.5 py-2.5 text-xs flex items-center justify-center mr-5 cursor-pointer last:mr-0`}
              style={{
                borderTop:
                  selectedTabIndex === d.matchId
                    ? '3px solid #4285F4'
                    : '0px solid green',
                borderRight:
                  selectedTabIndex === d.matchId
                    ? '1px solid #4285F4'
                    : '0px solid #77777770',
                borderLeft:
                  selectedTabIndex === d.matchId
                    ? '1px solid #4285F4'
                    : '0px solid green',
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setId(d.matchId);
                setShowContextMenu(true);
                setCoords({ x: e.pageX, y: e.pageY });
              }}
            >
              {showContextMenu && d.matchId === id && (
                <MenuList
                  id={id}
                  top={coords.y}
                  left={coords.x}
                  menu={menuData}
                  deatils={d}
                  onClick={onMenuClick}
                />
              )}
              <div className='w-20 min-w-fit' onClick={(e) => onTabClick(d)}>
                {d.title}
              </div>
              <div className='flex items-center gap-2 ml-2.5'>
                {d.isPinned === true && (
                  <div>
                    <Image src={pin} alt='pin' width={16} height={16} />
                  </div>
                )}
                {d.isPinned === false && (
                  <div
                    className='cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      const res = onClose(d, sportName);
                      const newres = res?.filter(
                        (t: any) => t.matchId === selectedTabIndex
                      );
                      setTabs(res);
                      if (newres.length === 0) {
                        setSelectedTabindex(res[res.length - 1]?.matchId);
                        setMatchTabs({
                          matchId: res[res.length - 1]?.matchId,
                          title: res[res.length - 1]?.title,
                          fixture_start_at:
                            res[res.length - 1]?.fixture_start_at,
                        });

                        // localStorage.setItem(
                        //   'matchTabs',
                        //   JSON.stringify({
                        //     title: res[res.length - 1]?.title,
                        //     matchId: res[res.length - 1]?.matchId,
                        //   })
                        // );
                      }
                    }}
                  >
                    <Image src={close} width={9} height={9} alt={'close'} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {tabs.length > 0 && (
        <div className='w-14 h-full flex items-center justify-center'>
          {/* <Popover trigger={['click']} content={popoverContent} arrow={false}>
            <div className='w-full h-full flex items-center justify-center cursor-pointer'>
              <Image src={dots} alt='dots' width={15} height={15} />
            </div>
          </Popover> */}
          <Dropdown
            trigger={['click']}
            className='cursor-pointer'
            placement='bottom'
            menu={{ items: menus }}
          >
            <div className='contents-[""]'>
              <DotsHorizontal color='#666' size={20} />
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
