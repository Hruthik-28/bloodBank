import { listRequests, manageRequests } from "@/store/adminSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function ManageRequests() {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.admin.requests);

    const handleRequest = (requestId, response) => {
        dispatch(manageRequests({ requestId, response })).then(() =>
            dispatch(listRequests())
        );
    };
    useEffect(() => {
        dispatch(listRequests());
    }, [dispatch]);
    return (
        <>
            <Table className="w-full mx-auto mt-10">
                <TableCaption>List Of Requests</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Request_id</TableHead>
                        <TableHead>Patient_id</TableHead>
                        <TableHead>Blood_group</TableHead>
                        <TableHead>Units_requested</TableHead>
                        <TableHead>Request_status</TableHead>
                        <TableHead>Request_date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests?.map((request) => (
                        <TableRow
                            key={request?.request_id}
                            className="font-medium"
                        >
                            <TableCell>{request?.request_id}</TableCell>
                            <TableCell>{request?.patient_id}</TableCell>
                            <TableCell>{request?.blood_group}</TableCell>
                            <TableCell>{request?.units_requested}</TableCell>
                            <TableCell>{request?.request_status}</TableCell>
                            <TableCell>{request?.request_date}</TableCell>
                            <TableCell>
                                {request?.request_status !== "approved" &&
                                request?.request_status !== "rejected" ? (
                                    <div className="space-x-2">
                                        <Button
                                            onClick={() =>
                                                handleRequest(
                                                    request?.request_id,
                                                    "approve"
                                                )
                                            }
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleRequest(
                                                    request?.request_id,
                                                    "reject"
                                                )
                                            }
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                ) : (
                                    request?.request_status
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default ManageRequests;
