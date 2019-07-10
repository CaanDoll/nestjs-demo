export interface IColumn {
  title: string;
  dataIndex: string;
  render?: (v: any, row: any) => any;
}

export const json2excel = (columns: IColumn[], list: any[]): string => {
  let data = '';
  data += `${columns.map(i => i.title).join(',')}\r\n`;

  list.forEach(listItem => {
    data += `${columns
      .map(i => {
        const value = listItem[i.dataIndex];
        const newValue = i.render ? i.render(value, listItem) : value;
        return typeof newValue === 'string' ? newValue.replace(/,/g, '，') : newValue;
      })
      .join(',')}\r\n`;
  });
  return data;
};
