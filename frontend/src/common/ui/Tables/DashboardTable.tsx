import React from "react";
import Card from "../Card";
import Table from "../Table";
import TableRow from "../TableRow";
import TableBody from "../TableBody";
import TableCell from "../TableCell";
import TableHeader from "../TableHeader";
import TableWrapper from "../Wrappers/TableWrapper";
import Button from "../Button";

interface DataType {
  [key: string]: string;
}

interface PropsType {
  headers: string[];
  data: DataType[];
}

const DashboardTable: React.FC<PropsType> = ({ data, headers }) => {
  return (
    <Card>
      <TableWrapper>
        <Table>
          <TableHeader headers={headers} />
          <TableBody>
            {data.map((d, index) => (
              <TableRow key={d.id}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.email}</TableCell>
                <TableCell>{d.source ?? d.company} </TableCell>
                <TableCell>{d.jobTitle ?? d.industry}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
      <div className="flex items-center justify-end ">
        <Button className="w-[100px] text-xs">View All</Button>
      </div>
    </Card>
  );
};

export default DashboardTable;
