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

import { listPatients, editPatient, deletePatient } from "@/store/adminSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

function ListPatients() {
    const dispatch = useDispatch();
    const patients = useSelector((state) => state.admin.patientsList);
    const [editDonorId, setEditDonorId] = useState(null);
    const { register, handleSubmit } = useForm();

    const handleEditClick = (donorId) => {
        setEditDonorId(donorId === editDonorId ? null : donorId); // Toggle edit mode for clicked donor
    };

    const onSubmit = (data) => {
        dispatch(editPatient(data)).then(() => dispatch(listPatients()));
        setEditDonorId(null); // Exit edit mode after submission
    };

    useEffect(() => {
        dispatch(listPatients());
    }, [dispatch, deletePatient, editPatient]);

    return (
        <>
            <Table className="w-full mx-auto mt-10">
                <TableCaption>List Of Patients</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient_id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Blood_group</TableHead>
                        <TableHead>Total Requests</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients?.map((patient) => (
                        <TableRow
                            key={patient?.patient_id}
                            className="text-start font-medium"
                        >
                            <TableCell>
                                {editDonorId === patient?.patient_id ? (
                                    <>
                                        <Input
                                            {...register("patient_id", {
                                                required: true,
                                            })}
                                            defaultValue={patient?.patient_id}
                                            readOnly
                                        />
                                    </>
                                ) : (
                                    patient?.patient_id
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === patient?.patient_id ? (
                                    <>
                                        <Input
                                            {...register("name", {
                                                required: true,
                                            })}
                                            defaultValue={patient?.name}
                                        />
                                    </>
                                ) : (
                                    patient?.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === patient?.patient_id ? (
                                    <>
                                        <Input
                                            {...register("email", {
                                                required: true,
                                            })}
                                            defaultValue={patient?.email}
                                        />
                                    </>
                                ) : (
                                    patient?.email
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === patient?.patient_id ? (
                                    <>
                                        <Input
                                            {...register("mobile", {
                                                required: true,
                                            })}
                                            defaultValue={patient?.mobile}
                                        />
                                    </>
                                ) : (
                                    patient?.mobile
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === patient?.patient_id ? (
                                    <>
                                        <Input
                                            {...register("blood_group", {
                                                required: true,
                                            })}
                                            defaultValue={patient?.blood_group}
                                        />
                                    </>
                                ) : (
                                    patient?.blood_group
                                )}
                            </TableCell>
                            <TableCell>
                                {editDonorId === patient?.patient_id ? (
                                    <>
                                        <Input
                                            {...register("total_requests", {
                                                required: true,
                                            })}
                                            defaultValue={
                                                patient?.total_requests
                                            }
                                        />
                                    </>
                                ) : (
                                    patient?.total_requests
                                )}
                            </TableCell>

                            <TableCell className="md:space-x-2 space-y-2">
                                {editDonorId === patient?.patient_id ? (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Button type="submit">Save</Button>
                                    </form>
                                ) : (
                                    <Button
                                        onClick={() =>
                                            handleEditClick(patient.patient_id)
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
                                                {patient?.name}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    dispatch(
                                                        deletePatient(
                                                            patient.patient_id
                                                        )
                                                    ).then(() =>
                                                        dispatch(listPatients())
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

export default ListPatients;
