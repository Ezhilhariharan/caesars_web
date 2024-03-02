interface PageSectionTitleProps {
  title: string;
}
export default function PageSectionTitle({ title }: PageSectionTitleProps) {
  return (
    <div>
      <div
        style={{
          fontWeight: 500,
          fontSize: 24,
          marginBottom: 20,
          color: '#141522',
        }}
      >
        {title}
      </div>
    </div>
  );
}
