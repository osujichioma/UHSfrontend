import React, { useEffect, useState, useContext } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorPatients from "../../../components/multipleUsers/patient/Patients";
import {
  IndexNo,
  SearchInput,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  TotalNo,
} from "../../../components";
import ReactPagination from "../../../components/ReactPagination";
import { toast } from "react-toastify";
import axios from "../../../services/axios";

function Patients() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(loginContext);

  // READ : READ : READ : READ
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getPatients() {
    axios
      .get("/patient")
      .then((response) => {
        setPatients(response?.data);
      })
      .catch((response) => {
        toast.error(response?.data);
      });
  }

  // SEARCH
  const search = (data) => {
    axios.get(`/patient?q=${data}`).then((response) => {
      setPatients(response.data);
      setCurrentPage(1);
    });
  };

  useEffect(() => {
    getPatients();
  }, []);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = patients.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(patients.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <DoctorSidebar>
      {/* <DoctorPatients role={"/doctor"} /> */}
      <div>
        <div className="flex justify-between items-center">
          <SearchInput onSearch={search} />
          <div className="items-center flex flex-col lg:flex-row">
            <TotalNo totalnumber={patients?.length} />
            <ReactPagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
        <Table>
          <Thead>
            <IndexNo>#</IndexNo>
            <Th>Reg. Id</Th>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Sex</Th>
            <Th>Age</Th>
            <Th>Blood Group</Th>
            <Th>Time Of Registration</Th>
          </Thead>
          {currentPosts.map((patient, i) => {
            return (
              <Tbody key={i}>
                <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                <Td className="font-bold">{patient?.registrationId}</Td>
                <Td>{patient?.name}</Td>
                <Td>{patient?.phone}</Td>
                <Td>{patient?.sex}</Td>
                <Td>{patient?.age}</Td>
                <Td>{patient?.bloodgroup}</Td>
                <Td>{patient?.tor}</Td>
              </Tbody>
            );
          })}
        </Table>
      </div>{" "}
    </DoctorSidebar>
  );
}

export default Patients;
