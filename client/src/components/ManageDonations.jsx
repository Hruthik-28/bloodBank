import { listDonations, manageDonation } from "@/store/adminSlice";
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

function ManageDonations() {
    const dispatch = useDispatch();
    const donations = useSelector((state) => state.admin.donations);

    const handleDonation = (donationId, response) => {
        dispatch(manageDonation({ donationId, response })).then(() =>
            dispatch(listDonations())
        );
    };
    useEffect(() => {
        dispatch(listDonations());
    }, [dispatch]);
    return (
        <>
            <Table className="w-full mx-auto mt-10">
                <TableCaption>List Of Donations</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Donation_id</TableHead>
                        <TableHead>Blood_group</TableHead>
                        <TableHead>Units_donated</TableHead>
                        <TableHead>Donation_date</TableHead>
                        <TableHead>Donor_name</TableHead>
                        <TableHead>Donor_email</TableHead>
                        <TableHead>Donor_mobile</TableHead>
                        <TableHead>Approve Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donations?.map((donation) => (
                        <TableRow
                            key={donation?.donation_id}
                            className="font-medium"
                        >
                            <TableCell>{donation?.donation_id}</TableCell>
                            <TableCell>{donation?.blood_group}</TableCell>
                            <TableCell>{donation?.units_donated}</TableCell>
                            <TableCell>{donation?.donation_date}</TableCell>
                            <TableCell>{donation?.donor_name}</TableCell>
                            <TableCell>{donation?.donor_email}</TableCell>
                            <TableCell>{donation?.donor_mobile}</TableCell>
                            <TableCell>
                                {donation?.donation_status !== "approved" && donation?.donation_status !== "rejected" ? (
                                    <div className="space-x-2">
                                        <Button
                                            onClick={() =>
                                                handleDonation(
                                                    donation?.donation_id,
                                                    "approve"
                                                )
                                            }
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleDonation(
                                                    donation?.donation_id,
                                                    "reject"
                                                )
                                            }
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                ) : (
                                    donation?.donation_status
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default ManageDonations;
