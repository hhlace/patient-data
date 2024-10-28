import s from "./page.module.css";
import PatientServerComponent from "./components/PatientsContainer/PatientServerComponent";

export default function Home() {
  return (
    <div className={s.page}>
      <PatientServerComponent />
    </div>
  );
}
