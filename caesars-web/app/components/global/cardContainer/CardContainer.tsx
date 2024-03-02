import React from "react";
import Title from "../title/Title";

type CardContainerProps = {
  header?: string;
  contentDescription?: string;
  headerSize?: "small" | "medium" | "large";
  headerComponent?: React.ReactNode;
  leftSideComponent?: React.ReactNode;
  rightSideComponent?: React.ReactNode;
  children?: React.ReactNode;
  headerStyle?: {};
  titleStyle?: {};
  cardClassName?: string;
  style?: {};
};

const CardContainer = (props: CardContainerProps) => {
  const {
    header,
    headerComponent,
    headerSize,
    headerStyle,
    leftSideComponent,
    rightSideComponent,
    cardClassName,
    titleStyle,
    contentDescription,
    children,
    ...prop
  } = props;
  return (
    <article className={`bg-white rounded-[10px] ${cardClassName}`} {...prop}>
      <header className="flex items-center justify-between" style={headerStyle}>
        {leftSideComponent && <div>{leftSideComponent}</div>}
        {header && (
          <Title title={header} size={headerSize} style={titleStyle} />
        )}

        {headerComponent && <div>{headerComponent}</div>}
        {rightSideComponent && <div>{rightSideComponent}</div>}
      </header>

      {contentDescription && (
        <div className="text-sm font-light  text-[#718096] pl-2.5 mb-3">
          {contentDescription}
        </div>
      )}

      {children}
    </article>
  );
};

export default CardContainer;
