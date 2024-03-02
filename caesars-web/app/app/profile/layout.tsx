export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      <div style={{ flex: 1 }} className='flex'>
        {children}
      </div>
    </div>
  );
}
