export const List = ({ list, users }) => {
  return (
    <table>
      <thead></thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
      <tbody>
        {list.map(project => {
          return (
            <tr key={project.id}>
              <td>{project.name}</td>
              {/* ?.  undefined 时返回undefined */}
              <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
