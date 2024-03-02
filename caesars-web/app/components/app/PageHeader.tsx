interface PageHeaderProps {
  title: string;
  subTitle: string;
  //   isActive: boolean;
}
export default function PageHeader({ title, subTitle }: PageHeaderProps) {
  return (
    <div className='mb-[25px]'>
      <div className='capitalize text-xl font-bold text-[#0d0d54]'>{title}</div>
      <div className='text-sm font-semibold text-[#4F5B67]'>{subTitle}</div>
    </div>
  );
}
