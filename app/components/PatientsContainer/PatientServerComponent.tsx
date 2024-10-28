import { IPatient, Patients } from "@/app/models/patient";
import PatientContainer from "./PatientContainer";

const PatientServerComponent = async () => {
  const patientsInstance = new Patients();
  await patientsInstance.getAll();
  const patients: IPatient[] = patientsInstance.patients;

  return <PatientContainer initialPatients={patients} />;
};

export default PatientServerComponent;
