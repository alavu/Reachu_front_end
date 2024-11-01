export interface PartnerDTO {
    id: number;
    name: string;
    lastname?: string;
    email: string;
    phone: string;
    service: string;
    img?: string; // or byte[] if you handle it differently
  }