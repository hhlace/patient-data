"use client";
import { IPatient, Patients } from "@/app/models/patient";
import { useState } from "react";
import PatientCard from "../PatientCard/PatientCard";
import PatientCardSkeleton from "../PatientCard/PatientCardSkeleton";
import s from "./PatientContainer.module.scss";
import AddPatient from "../AddPatient/AddPatient";
import { toast } from "sonner";

const PatientContainer: React.FC<{ initialPatients: IPatient[] }> = ({
  initialPatients,
}) => {
  const patientsInstance = new Patients(initialPatients);
  const [patients, setPatients] = useState<Patients>(patientsInstance);

  const handleEditPatient = (id: number, editedPatient: IPatient) => {
    const updatedPatients = patients.editPatient(id, editedPatient);
    if (updatedPatients) {
      setPatients(updatedPatients);
      toast.success("Patient updated successfully");
    }
  };

  return (
    <>
      <div className={s.titleContainer}>
        <h1>Patients</h1>
        <AddPatient patients={patients} setPatients={setPatients} />
      </div>

      <div>
        {!patients && (
          <div className="flex-grid">
            <PatientCardSkeleton />
            <PatientCardSkeleton />
            <PatientCardSkeleton />
            <PatientCardSkeleton />
          </div>
        )}
        <div className={`flex-grid ${s.grid}`}>
          {patients &&
            patients.patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                handleEditPatient={handleEditPatient}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default PatientContainer;
