import { useState } from 'react';
// import DraggableList from "react-draggable-lists";
import DraggableList from 'react-draggable-list';
import { useEffect, useRef } from 'react';
import dragger from '../../../assets/icons/dragger.svg';
import Image from 'next/image';
import { get } from '@/app/apiIntegrations/fetcher';
export default function DND({ match }: any) {
  const [team2, setTeam2] = useState([]);
  useEffect(() => {
    loadRoster();
  }, []);
  async function loadRoster() {
    const res = await get(
      `/rosters?match_id=${match.data.id}&team_id=${match.data.team1_id}`
    );
    setTeam2(res.data);
  }
  const list = [
    { order: 1, title: 'element 1' },
    { order: 2, title: 'element 2' },
    { order: 4, title: 'element 3' },
    { order: 3, title: 'element 4' },
  ];
  const listItems = [
    'Entertainment',
    'Private Time',
    'Rest',
    'Meal',
    'Exercise',
    'Work',
    'Home Projects',
    'Family',
  ];
  const [dropIndex, setDropIndex] = useState<any>(null);
  const [dropIndexOld, setDropIndexOld] = useState<any>(null);
  const [movingIndex, setMovingIndex] = useState<any>(null);
  const [placement, setPlacement] = useState<any>(null);
  const [placementIndex, setPlacementIndex] = useState<any>(null);
  //   const [list, setList] = useState<any>([
  //     { order: 1, title: "element 1" },
  //     { order: 2, title: "element 2" },
  //     { order: 4, title: "element 3" },
  //     { order: 3, title: "element 4" },
  //   ]);
  const onMoveEnd = (newList: any) => {};

  return (
    <div>
      <div style={{ width: 300, margin: '0 auto' }}>
        <App team2={team2} />
        <button onClick={(e) => {}}>log</button>
      </div>
    </div>
  );
}

const data = Array(10)
  .fill(null)
  .map((item, index) => ({ id: index, name: 'sname' + index }));

const Item = ({ item, itemSelected, dragHandleProps }: any) => {
  const { onMouseDown, onTouchStart } = dragHandleProps;

  return (
    <div
      className='disable-select'
      style={{
        borderBottom: '1px solid #ddd',
        margin: '1px',
        padding: '10px',
        display: 'flex',
        // justifyContent: "space-around",
        alignItems: 'center',
        background: '#fff',
        userSelect: 'none',
      }}
    >
      <div
        className='disable-select dragHandle'
        style={{ cursor: 'pointer', marginLeft: 10 }}
        onTouchStart={(e) => {
          e.preventDefault();
          (e.target as any).style.backgroundColor = 'blue';
          document.body.style.overflow = 'hidden';
          onTouchStart(e);
        }}
        onMouseDown={(e) => {
          document.body.style.overflow = 'hidden';
          onMouseDown(e);
        }}
        onTouchEnd={(e) => {
          (e.target as any).style.backgroundColor = 'black';
          document.body.style.overflow = 'visible';
        }}
        onMouseUp={() => {
          document.body.style.overflow = 'visible';
        }}
      >
        <Image src={dragger} alt={'drag'} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className='bg-[#F0F1F3] w-10 h-10 rounded-[60px]'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#555',
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            marginLeft: 20,
          }}
        >
          <div>{item.team_players.players.first_name?.slice(0, 2)}</div>
        </div>
        <span style={{ marginLeft: 20 }}>
          {item.team_players.players.first_name}{' '}
          {item.team_players.players.last_name}
        </span>
      </div>
    </div>
  );
};

function App({ team2 }: any) {
  const [list, setList] = useState(team2);
  useEffect(() => {
    setList(team2);
  }, [team2]);

  const containerRef = useRef(null);

  const _onListChange = (newList: any) => {
    setList(newList);
  };

  return (
    <div className='App'>
      <div ref={containerRef} style={{ touchAction: 'pan-y' }}>
        <DraggableList
          itemKey='id'
          template={Item as any}
          list={list}
          onMoveEnd={(newList: any) => _onListChange(newList)}
          container={() => containerRef.current}
        />
        {/* {JSON.stringify(list)} */}
      </div>
    </div>
  );
}
