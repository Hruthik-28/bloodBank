import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { adminDashBoard } from "@/store/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
    const dispatch = useDispatch();
    const dashboard = useSelector((state) => state.admin.dashboard);

    useEffect(() => {
        dispatch(adminDashBoard());
    }, []);
    return (
        <>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 p-8">
                {dashboard?.map((item) => (
                    <Card key={item?.blood_group}>
                        <CardHeader>
                            <CardTitle className="font-semibold text-xl">
                                {item?.blood_group}
                            </CardTitle>
                            <CardDescription>
                                {item?.total_units > 0
                                    ? "Blood available"
                                    : "Blood Not available"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-md">
                                Total Units:{" "}
                                <span className="font-semibold text-">
                                    {item.total_units}
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default AdminDashboard;
