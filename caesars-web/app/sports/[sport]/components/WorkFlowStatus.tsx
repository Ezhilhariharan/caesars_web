type Props = {
  status: any;
};

export default function WorkflowStatus(props: Props) {
  const { status } = props;

  const getUser = localStorage.getItem('user');

  if (getUser) {
    const user = JSON.parse(getUser);
    if (user?.title === 'roster_lead') {
      if (status >= 0 && status < 2) return 'Assigned to Roster Maker';
      if (status === 2) return 'Pending For Approval';
      if (status >= 3) return 'Approved and handedover';
    }

    if (user?.title === 'roster_maker') {
      if (status >= 0 && status < 2) return 'Assigned to Me';
      if (status >= 2) return 'Submitted to Roster Lead';
    }

    if (user?.title === 'trading_lead') {
      if (status === 3) return 'Approved and handedover';
      if (status >= 3 && status < 7) return 'Pre-Play';
      if (status === 7) return 'In-Play';
      if (status >= 8) return 'Ends';
    }

    if (user?.title === 'pre_game_trader') {
      if (status >= 4 && status <= 6) return 'Pre-Play';
    }

    if (user?.title === 'in_game_trader') {
      if (status === 7) return 'In-Play';
      if (status >= 8) return 'Ends';
    }
  }
}
