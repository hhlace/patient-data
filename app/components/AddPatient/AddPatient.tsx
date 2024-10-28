"use client";

import { useState } from "react";
import Modal from "../Modal";
import EditPatientForm from "../EditPatientForm/EditPatientForm";
import s from "./AddPatient.module.scss";
import { IPatient, Patients } from "@/app/models/patient";
import { toast } from "sonner";

interface AddPatientProps {
  patients: Patients;
  setPatients: (patients: Patients) => void;
}

const AddPatient: React.FC<AddPatientProps> = ({ patients, setPatients }) => {
  const [openCreatePatient, setOpenCreatePatient] = useState(false);
  const openModal = () => setOpenCreatePatient(true);
  const closeModal = () => setOpenCreatePatient(false);

  const handleCreatePatient = (newPatient: IPatient) => {
    const updatedPatients = patients.addPatient(newPatient);
    setPatients(updatedPatients);
    closeModal();
    toast.success("Patient added successfully");
  };

  return (
    <div>
      <button className={s.addPatientButton} onClick={openModal}>
        +
      </button>
      <Modal isOpen={openCreatePatient} onClose={closeModal}>
        <EditPatientForm
          onClose={closeModal}
          handleCreatePatient={handleCreatePatient}
        />
      </Modal>
    </div>
  );
};

export default AddPatient;
