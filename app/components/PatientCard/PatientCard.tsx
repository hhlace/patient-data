import { IPatient } from "@/app/models/patient";
import PatientAvatar from "./Avatar";
import { useState } from "react";
import Modal from "../Modal";
import EditPatientForm from "../EditPatientForm/EditPatientForm";
import { FaEdit } from "react-icons/fa";
import s from "./PatientCard.module.scss";

const PatientCard: React.FC<{
  patient: IPatient;
  handleEditPatient: (id: number, editedPatient: IPatient) => void;
}> = ({ patient, handleEditPatient }) => {
  const [isCardExtended, setIsCardExtended] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleExtendCard = () => setIsCardExtended(!isCardExtended);
  // const handleCloseExtendCard = () => setIsCardExtended(false);

  const container = `${s.PatientCardContainer}  ${
    isCardExtended ? s.extendedCard : s.compactCard
  }`;

  return (
    <>
      <div className={container} onClick={handleExtendCard}>
        <button
          onClick={handleOpenModal}
          className={s.editButton}
          aria-label="Edit"
        >
          <FaEdit />
        </button>
        <div className={s.titles}>
          <h3 className={s.name}>{patient.name}</h3>
          {patient.website && (
            // <Link href={patient.website}>
            <h4 className={s.link}>{patient.website}</h4>
            // </Link>
          )}
          {isCardExtended && patient.description && (
            <p>{patient.description}</p>
          )}
        </div>
        <div className={s.avatarContainer}>
          {patient.avatar && (
            <PatientAvatar
              avatarUrl={patient.avatar}
              alt={patient.name}
              extended={isCardExtended}
            />
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EditPatientForm
          patient={patient}
          onClose={handleCloseModal}
          handleEditPatient={handleEditPatient}
        />
      </Modal>
    </>
  );
};

export default PatientCard;
