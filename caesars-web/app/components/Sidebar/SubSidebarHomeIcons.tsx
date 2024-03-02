// components
import Apps from '@/app/assets1/custom-icons/sidebar/Apps';
import Bell from '@/app/assets1/custom-icons/sidebar/Bell';
import Book from '@/app/assets1/custom-icons/sidebar/Book';
import Integrations from '@/app/assets1/custom-icons/sidebar/Integrations';
import Markets from '@/app/assets1/custom-icons/sidebar/Markets';
import Matches from '@/app/assets1/custom-icons/sidebar/Matches';
import Members from '@/app/assets1/custom-icons/sidebar/Members';

type Props = {
  title: string;
  color: string;
};

export default function SubSidebarHomeIcons(props: Props) {
  const { title, color } = props;
  switch (title) {
    case 'Overview':
      return <Apps color={color} size={20} />;
    case 'Teams':
      return <Book color={color} size={20} />;
    case 'Matches':
      return <Matches color={color} size={20} />;
    case 'Members':
      return <Members color={color} size={20} />;
    case 'Notifications':
      return <Bell color={color} size={20} />;
    case 'Market':
      return <Markets color={color} size={20} />;
    case 'Integrations':
      return <Integrations color={color} size={20} />;
    case 'Leagues':
      return <Book color={color} size={20} />;

    default:
      break;
  }
}
