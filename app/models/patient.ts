const PATIENT_API_URL = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";

export interface IPatient {
  id: number;
  name: string;
  avatar?: string;
  description: string;
  website: string;
}

class Patient {
  id: number;
  name: string;
  avatar?: string;
  description: string;
  website: string;

  constructor(patient: Patient) {
    this.id = patient.id;
    this.name = patient.name;
    this.avatar = patient.avatar;
    this.description = patient.description;
    this.website = patient.website;
  }
}

export interface IPatients {
  patients: IPatient[];
  getPatients(): IPatient[];
  editPatient(id: number, editedPatient: Partial<IPatient>): Patients;
  addPatient(newPatient: IPatient): void;
}

export class Patients implements IPatients {
  public patients: Patient[];

  constructor(patients: IPatient[] = []) {
    this.patients = patients.map((p) => new Patient(p));
  }

  async getAll(): Promise<void> {
    const response = await fetch(PATIENT_API_URL);
    const data: IPatient[] = await response.json();
    // this.patients = data.map((patient) => new Patient(patient));
    this.patients = data.map((patient) => patient);
  }

  getPatients(): Patient[] {
    return this.patients;
  }

  editPatient(id: number, editedPatient: Partial<IPatient>): Patients {
    const index = this.patients.findIndex((patient) => patient.id === id);
    if (index === -1) return this;

    const updatedPatient = { ...this.patients[index], ...editedPatient };
    this.patients[index] = new Patient(updatedPatient);

    return new Patients(this.patients);
  }

  addPatient(newPatient: IPatient): Patients {
    const patient = new Patient(newPatient);
    patient.id = this.patients.length + 1;
    this.patients.push(patient);
    const updatedPatients = new Patients(this.patients);
    return updatedPatients;
  }
}
