export type PassRequestStatus = 'NEW' | 'APPROVED' | 'REJECTED';


export type PassRequest = {
id: string;
employeeName: string;
vehicleNumber: string;
validFrom: string; // ISO
validTo: string; // ISO
status: PassRequestStatus;
};


export type NewPassRequest = Omit<PassRequest, 'id' | 'status'>;