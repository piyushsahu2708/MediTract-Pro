export type Patient = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  gender: 'Male' | 'Female';
  age: number;
  lastVisit: string;
  conditions: string[];
  status: 'Active' | 'Inactive';
};

export type Appointment = {
  id: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Canceled';
};

export const patients: Patient[] = [
  { id: '1', name: 'Liam Johnson', avatar: 'patient-1', email: 'liam@example.com', gender: 'Male', age: 28, lastVisit: '2023-10-25', conditions: ['Hypertension'], status: 'Active' },
  { id: '2', name: 'Olivia Smith', avatar: 'patient-2', email: 'olivia@example.com', gender: 'Female', age: 45, lastVisit: '2023-11-12', conditions: ['Diabetes Type 2'], status: 'Active' },
  { id: '3', name: 'Noah Williams', avatar: 'patient-3', email: 'noah@example.com', gender: 'Male', age: 62, lastVisit: '2023-09-02', conditions: ['Arthritis', 'Asthma'], status: 'Active' },
  { id: '4', name: 'Emma Brown', avatar: 'patient-4', email: 'emma@example.com', gender: 'Female', age: 34, lastVisit: '2023-11-20', conditions: ['Migraines'], status: 'Active' },
  { id: '5', name: 'Ava Jones', avatar: 'patient-5', email: 'ava@example.com', gender: 'Female', age: 71, lastVisit: '2023-08-15', conditions: ['Osteoporosis'], status: 'Inactive' },
  { id: '6', name: 'James Garcia', avatar: 'patient-6', email: 'james@example.com', gender: 'Male', age: 53, lastVisit: '2023-11-30', conditions: ['High Cholesterol'], status: 'Active' },
];

export const appointments: Appointment[] = [
    { id: '1', patientName: 'Liam Johnson', doctor: 'Dr. Evelyn Reed', date: '2024-07-20', time: '10:00 AM', status: 'Scheduled' },
    { id: '2', patientName: 'Olivia Smith', doctor: 'Dr. Julian Baker', date: '2024-07-20', time: '11:30 AM', status: 'Scheduled' },
    { id: '3', name: 'Noah Williams', doctor: 'Dr. Evelyn Reed', date: '2024-07-20', time: '02:00 PM', status: 'Completed' },
    { id: '4', patientName: 'Emma Brown', doctor: 'Dr. Samuel Carter', date: '2024-07-21', time: '09:00 AM', status: 'Scheduled' },
    { id: '5', patientName: 'Ava Jones', doctor: 'Dr. Julian Baker', date: '2024-07-21', time: '10:30 AM', status: 'Canceled' },
];

export const patientWorkflowData = {
  admitted: [
    { id: '1', name: 'Liam Johnson', details: 'Awaiting initial consultation.' },
  ],
  consultation: [
    { id: '2', name: 'Olivia Smith', details: 'With Dr. Reed for diabetes management.' },
    { id: '4', name: 'Emma Brown', details: 'Follow-up for migraine treatment plan.' },
  ],
  treatment: [
    { id: '6', name: 'James Garcia', details: 'Undergoing cardiac monitoring.' },
  ],
  discharged: [
    { id: '3', name: 'Noah Williams', details: 'Discharged after asthma treatment.' },
    { id: '5', name: 'Ava Jones', details: 'Discharged, follow-up in 3 months.' },
  ]
}

export const recentActivities = [
    { id: 1, user: 'Dr. Reed', action: 'updated patient record for', target: 'Noah Williams', time: '2 hours ago' },
    { id: 2, user: 'Nurse Miller', action: 'scheduled a new appointment for', target: 'Liam Johnson', time: '5 hours ago' },
    { id: 3, user: 'Admin', action: 'discharged patient', target: 'Ava Jones', time: '1 day ago' },
    { id: 4, user: 'Dr. Baker', action: 'added a new prescription for', target: 'Olivia Smith', time: '2 days ago' },
]
