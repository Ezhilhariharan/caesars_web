type Props = {
  id?: any;
};

const UserRoleConverter = ({ id }: Props) => {
  switch (id) {
    case "roster_lead":
      return "Roster Lead";
    case "roster_maker":
      return "Roster Maker";
    case "trading_lead":
      return "Trading Lead";
    case "pre_game_trader":
      return "Pre-game Trader";
    case "in_game_trader":
      return "In-game Trader";
    default:
      return "";
  }
};

export default UserRoleConverter;
