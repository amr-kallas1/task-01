import queries from "@/api/users/queries";
import PageTitle from "@/components/global/page-title";
import ReactHelmet from "@/components/global/react-helmet";
import Table from "@/components/table/table";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { TableCell, TableRow } from "@/components/ui/table";
import { USERS_PATH } from "@/routes/path";

const User = () => {
  const { data, isLoading, isError } = queries.GetAllUser();
  const columns = [
    { title: "#" },
    { title: "UserName" },
    { title: "firstName" },
    { title: "lastName" },
    { title: "phoneNumber" },
    { title: "birthDate" },
  ];

  return (
    <>
      <ReactHelmet name="user">
        <title>Users</title>
      </ReactHelmet>
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs data={[{ label: "Users", link: USERS_PATH.USERS }]} />
        <div className="flex justify-between items-start">
          <PageTitle title="Users" subTitle="View and manage user" />
        </div>
      </div>

      <Table
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        dataLength={data?.length}
        WithPagination
        totalPages={3}
      >
        {data?.map(
          ({ id, firstname, lastname, phone, birthDate, login }, index) => (
            <TableRow className={"p-6 "} key={id}>
              <TableCell className="font-medium ">{index + 1}</TableCell>
              <TableCell>{login.username}</TableCell>
              <TableCell>{firstname} </TableCell>
              <TableCell>{lastname} </TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{birthDate}</TableCell>
            </TableRow>
          )
        )}
      </Table>
    </>
  );
};

export default User;
