import React from 'react';
interface IProps {
  name: string;
  keyword: string;
}
const Mark: React.FC<IProps> = (props) => {
  const { name, keyword } = props;
  if (!keyword) {
    return <>{name}</>;
  }

  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str: string, index: number) => (
        <span key={index}>
          {str}
          {index === str.length - 1 ? null : <span style={{ color: '#257afd' }}>{keyword}</span>}
        </span>
      ))}
    </>
  );
};
export default Mark;
