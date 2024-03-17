import { donationHistory } from "@/store/donorSlice";
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

function DonorDashboard() {
    const dispatch = useDispatch();
    const donations = useSelector((state) => state.donor.donationHistory);
    const donorId = localStorage.getItem("donorId");

    useEffect(() => {
        if (donorId) {
            dispatch(donationHistory(donorId));
        }
    }, []);

    return (
        <>
            <Table className="w-full mx-auto mt-10">
                <TableCaption>Donation History</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Donation_id</TableHead>
                        <TableHead>Donor_id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Blood_group</TableHead>
                        <TableHead>Units_donated</TableHead>
                        <TableHead>Donation_date</TableHead>
                        <TableHead>Donation_status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-medium">
                    {donations?.map((donation) => (
                        <TableRow key={donation?.donation_id}>
                            <TableCell>{donation?.donation_id}</TableCell>
                            <TableCell>{donation?.donor_id}</TableCell>
                            <TableCell>{donation?.name}</TableCell>
                            <TableCell>{donation?.email}</TableCell>
                            <TableCell>{donation?.blood_group}</TableCell>
                            <TableCell>{donation?.units_donated}</TableCell>
                            <TableCell>{donation?.donation_date}</TableCell>
                            <TableCell>{donation?.donation_status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default DonorDashboard;
