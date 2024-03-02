type Props = {
  role?: any;
};

const UserTeamConverter = ({ role }: Props) => {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'roster_lead':
      return 'Roster Team';
    case 'roster_maker':
      return 'Roster Team';
    case 'trading_lead':
      return 'Trading Team';
    case 'in_game_trader':
      return 'Trading Team';
    case 'pre_game_trader':
      return 'Trading Team';

    default:
      return '';
  }
};

export default UserTeamConverter;
