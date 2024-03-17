import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { requestHistory } from "@/store/patientSlice";

function PatientDashboard() {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.patient.requestHistory);
    const patientId = localStorage.getItem("patientId");

    useEffect(() => {
        if (patientId) {
            dispatch(requestHistory(patientId));
        }
    }, []);

    return (
        <>
            <Table className="w-full mx-auto mt-10">
                <TableCaption>Request History</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Request_id</TableHead>
                        <TableHead>patient_id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Blood_group</TableHead>
                        <TableHead>Units_Requested</TableHead>
                        <TableHead>Request_date</TableHead>
                        <TableHead>Request_status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-medium">
                    {requests?.map((request) => (
                        <TableRow key={request?.request_id}>
                            <TableCell>{request?.request_id}</TableCell>
                            <TableCell>{request?.patient_id}</TableCell>
                            <TableCell>{request?.name}</TableCell>
                            <TableCell>{request?.email}</TableCell>
                            <TableCell>{request?.blood_group}</TableCell>
                            <TableCell>{request?.units_requested}</TableCell>
                            <TableCell>{request?.request_date}</TableCell>
                            <TableCell>{request?.request_status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default PatientDashboard;
