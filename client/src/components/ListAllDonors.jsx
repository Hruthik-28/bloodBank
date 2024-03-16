import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteDonor, editDonor, listAllDonors } from "@/store/adminSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

function ListAllDonors() {
    const dispatch = useDispatch();
    const donors = useSelector((state) => state.admin?.donorsList);
    const [editDonorId, setEditDonorId] = useState(null);
    const { register, handleSubmit } = useForm();
    console.log(donors);
    const handleEditClick = (donorId) => {
        setEditDonorId(donorId === editDonorId ? null : donorId); // Toggle edit mode for clicked donor
    };

    const onSubmit = (data) => {
        dispatch(editDonor(data)).then(() => dispatch(listAllDonors()));
        setEditDonorId(null); // Exit edit mode after submission
    };

    useEffect(() => {
        dispatch(listAllDonors());
    }, [dispatch, deleteDonor, editDonor]);

    return (
        <>
            <Table className="w-full mx-auto mt-10">
                <TableCaption>List Of Donors</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Donor_id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Blood_group</TableHead>
                        <TableHead>Total_donated_units</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donors?.map((donor) => (
                        <TableRow
                            key={donor?.donor_id}
                            className="text-start font-medium"
                        >
                            <TableCell>
                                {editDonorId === donor?.donor_id ? (
                                    <>
                                        <Input
                                            {...register("donor_id", {
                                                required: true,
                                            })}
                                            defaultValue={donor?.donor_id}
                                            readOnly
                                        />
                                    </>
                                ) : (
                                    donor?.donor_id
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === donor?.donor_id ? (
                                    <>
                                        <Input
                                            {...register("name", {
                                                required: true,
                                            })}
                                            defaultValue={donor?.name}
                                        />
                                    </>
                                ) : (
                                    donor?.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === donor?.donor_id ? (
                                    <>
                                        <Input
                                            {...register("email", {
                                                required: true,
                                            })}
                                            defaultValue={donor?.email}
                                        />
                                    </>
                                ) : (
                                    donor?.email
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === donor?.donor_id ? (
                                    <>
                                        <Input
                                            {...register("mobile", {
                                                required: true,
                                            })}
                                            defaultValue={donor?.mobile}
                                        />
                                    </>
                                ) : (
                                    donor?.mobile
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === donor?.donor_id ? (
                                    <>
                                        <Input
                                            {...register("blood_group", {
                                                required: true,
                                            })}
                                            defaultValue={donor?.blood_group}
                                        />
                                    </>
                                ) : (
                                    donor?.blood_group
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === donor?.donor_id ? (
                                    <>
                                        <Input
                                            {...register(
                                                "total_donated_units",
                                                {
                                                    required: true,
                                                }
                                            )}
                                            defaultValue={
                                                donor?.total_donated_units
                                            }
                                        />
                                    </>
                                ) : (
                                    donor?.total_donated_units
                                )}
                            </TableCell>

                            <TableCell className="md:space-x-2 space-y-2">
                                {editDonorId === donor?.donor_id ? (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Button type="submit">Save</Button>
                                    </form>
                                ) : (
                                    <Button
                                        onClick={() =>
                                            handleEditClick(donor.donor_id)
                                        }
                                    >
                                        Edit
                                    </Button>
                                )}
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button>Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will delete the donor named{" "}
                                                {donor?.name}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    dispatch(
                                                        deleteDonor(
                                                            donor.donor_id
                                                        )
                                                    ).then(() =>
                                                        dispatch(
                                                            listAllDonors()
                                                        )
                                                    )
                                                }
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default ListAllDonors;
