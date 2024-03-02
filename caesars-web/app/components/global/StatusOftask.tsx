// import React from 'react';

// type Props = {
//   status: any;
// };

// const StatusOftask = ({ status }: Props) => {
//   switch (status) {
//     case 0:
//       return 'Not Opened';
//     case 1:
//       return 'In progress';
//     case 2:
//       return 'Submitted';
//     case 3:
//       return 'Approved and Handed Over';
//     case 4:
//       return 'Assigned';
//     case 5:
//       return 'Live';
//     case 6:
//       return 'Ended';

//     default:
//       return '--';
//   }
// };

// export default StatusOftask;

import React from "react";

type Props = {
  status: any;
};

const StatusOftask = ({ status }: Props) => {
  switch (status) {
    case 0:
      return "Not Opened";
    case 1:
      return "In progress";
    case 2:
      return "Submitted";
    case 3:
      return "Approved and Handed Over";
    case 4:
      return "Assigned";
    case 5:
      return "In-progress";
    case 6:
      return "Submitted";
    case 7:
      return "Live";
    case 8:
      return "Ended";
    case 9:
      return "Stats Confirmed";
    case 10:
      return "Match Suspended";

    default:
      return "--";
  }
};

export default StatusOftask;
