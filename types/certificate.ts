export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  credentialId: string | null;
  image: string;
  redirectUrl: string | null;
  category: "award" | "certification" | "participation";
}

export interface CertificatesApiData {
  items: Certificate[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
