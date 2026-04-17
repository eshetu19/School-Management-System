const Table = ({ columns, data, onRowClick = null, actions = null }) => {
  return (
    <div className=" overflow-x-auto bg-white rounded-lg shadow">
      <table className=" min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className=" px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className=" bg-white divide-y divide-gray-200">
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className=" px-6 py-4  whitespace-nowrap text-sm text-gray-900"
                >
                  {col.accessor ? row[col.accessor] : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className=" text-center py-8 text-gray-500 ">
          No data avaliable
        </div>
      )}
    </div>
  );
};
export default Table;
