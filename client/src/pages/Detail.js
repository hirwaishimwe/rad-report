import PatientExamInfo from './components/PatientExamInfo'

export function Detail(){
    const patientExamData = {
        "_id": "61e83d679dc59e6e8e11a1ce",
        "patientId": "COVID-19-AR-16406504",
        "age": 39,
        "sex": "M",
        "zipCode": "722",
        "bmi": 33.5,
        "__v": 0,
        "examId": "Exam-2",
        "keyFindings": "vervRight basilar atelectasis",
        "brixiaScores": "jhvbhj",
        "imageURL": "https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/COVID-19-AR-16406504_XR_CHEST_AP_ONLY_1.png"
      };
    return (
    <>
        <PatientExamInfo exam={patientExamData} />
    </>
   
    )
}