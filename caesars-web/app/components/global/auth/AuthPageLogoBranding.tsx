import React from 'react';
import Image from 'next/image';
import Logo from '../../../assets/logos/fullLogo.svg';

const AuthPageLogoBranding = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div {...props}>
      <Image src={Logo} alt={'CASERS Entertainment'} width={158} height={87} />
    </div>
  );
};
export default AuthPageLogoBranding;
