export type Patient = {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    contactNumber: string;
    email: string;
    address: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    admissionDate: string;
    dischargeDate?: string;
    avatar?: string;
  };
