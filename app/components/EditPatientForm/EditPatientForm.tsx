import { IPatient } from "@/app/models/patient";
import { useState } from "react";
import PatientAvatar from "../PatientCard/Avatar";
import s from "./EditPatientForm.module.scss";

interface EditPatientFormProps {
  patient?: IPatient;
  handleEditPatient?: (id: number, editedPatient: IPatient) => void;
  handleCreatePatient?: (newPatient: IPatient) => void;
  onClose: () => void;
}

const EditPatientForm: React.FC<EditPatientFormProps> = ({
  patient,
  handleEditPatient,
  handleCreatePatient,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    id: patient?.id ?? 0,
    name: patient?.name ?? "",
    avatar: patient?.avatar ?? "",
    website: patient?.website ?? "",
    description: patient?.description ?? "",
  });
  const [errors, setErrors] = useState({
    name: "",
    avatar: "",
    website: "",
    description: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "name" && value.trim().length < 2) {
      error = "Name is required";
    }

    if (
      name === "avatar" &&
      value &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value)
    ) {
      error = "Invalid URL format for avatar";
    }

    if (name === "website" && value && !/^https?:\/\/.+\..+$/.test(value)) {
      error = "Invalid URL format for website";
    }

    if (name === "description" && value.trim().length < 10) {
      error = "Description must have at least 10 characters";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((key) => {
      const value = formData[key as keyof typeof formData];
      if (typeof value === "string") {
        validateField(key, value);
      }
      return !errors[key as keyof typeof errors];
    });
    if (!isValid) return;

    if (patient) {
      handleEditPatient?.(formData.id, formData);
    } else {
      handleCreatePatient?.(formData);
    }
    onClose();
  };

  return (
    <div className={s.editPatientModal}>
      <div className={s.title}>
        <h3>{patient ? "Edit Patient" : "Create Patient"}</h3>
      </div>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.inputsAndAvatar}>
          <div className={s.inputsContainer}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && <span className={s.error}>{errors.name}</span>}
            </label>
            <label>
              Website:
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.website && (
                <span className={s.error}>{errors.website}</span>
              )}
            </label>
          </div>
          <div className={s.avatarEdit}>
            <div className={s.avatarContainer}>
              <PatientAvatar
                avatarUrl={formData.avatar || "/empty_avatar.webp"}
                alt={formData.name}
                extended
              />
              <div className={s.editButton}>
                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Edit
                </button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }} // Hide the file input element
                  onBlur={handleBlur}
                />
                {errors.avatar && (
                  <span className={s.error}>{errors.avatar}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={s.description}>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && (
              <span className={s.error}>{errors.description}</span>
            )}
          </label>
        </div>

        <div className={s.editPatientActionButtons}>
          <button onClick={onClose}>Cancel</button>
          <button type="submit" className={s.saveButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientForm;
