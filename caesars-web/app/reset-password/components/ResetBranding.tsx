import Link from 'next/link';
import AuthPageLogoBranding from '../../components/global/auth/AuthPageLogoBranding';
import resetPasswordBrandingImage from '../assets/resetPasswordBrandingImage.svg';
import Image from 'next/image';
export default function ResetBranding() {
  return (
    <div
      className='flex flex-1 object-center justify-center items-center'
      style={{ background: '#ECF3FE' }}
    >
      <div className='flex flex-col'>
        <AuthPageLogoBranding />
        <div
          style={{
            textAlign: 'center',
            marginTop: 40,
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: '0em',
            color: '#292731',
          }}
        >
          <div>To access Caesars Player Props System,</div>
          <div>You must have a valid account.</div>
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: 40,
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: '0em',
            color: '#292731',
          }}
        >
          <div>
            Are you having problems signing in?{' '}
            <a style={{ color: '#4285F4' }}>Contact support here.</a>
          </div>
        </div>
        <div
          className='flex'
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 40,
          }}
        >
          <Image
            src={resetPasswordBrandingImage}
            alt={'CASERS Entertainment Login'}
          />
        </div>
      </div>
    </div>
  );
}
