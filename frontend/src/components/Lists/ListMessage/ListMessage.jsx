import React, { useContext, useMemo } from "react";
import { useTable } from "react-table";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";

const MessageList = () => {
  const { messages } = useContext(MessageContext);
  const data = useMemo(() => messages, [messages]);
  const columns = useMemo(
    () => [
      {
        Header: "Identifiant",
        accessor: "id",
      },
      {
        Header: "Titre",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "Description",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Expéditeur",
        accessor: "sender",
      },
      {
        Header: "Destinataire",
        accessor: "recipient",
      },
      {
        Header: "Statut",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className={Styles.containerList}>
      <table {...getTableProps()} className={Styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MessageList;
