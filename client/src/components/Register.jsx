import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonorRegister from "./DonorRegister";
import PatientRegister from "./PatientRegister";

function Register() {
    return (
        <>
            <div className="w-full flex justify-center mt-5">
                <Tabs defaultValue="donor">
                    <TabsList>
                        <TabsTrigger
                            value="donor"
                            className="sm:w-[200px] w-[150px]"
                        >
                            Donor
                        </TabsTrigger>
                        <TabsTrigger
                            value="patient"
                            className="sm:w-[200px] w-[150px]"
                        >
                            Patient
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="donor">
                        <DonorRegister />
                    </TabsContent>
                    <TabsContent value="patient">
                        <PatientRegister />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default Register;
