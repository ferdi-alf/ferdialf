export interface About {
  name: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    location?: string;
  };
  connect: {
    social: SocialLink[];
    freelancePlarforms: FreelancePlatform[];
  };
}

export interface SocialLink {
  name: string;
  link: string;
  logo: string;
}

export interface FreelancePlatform {
  name: string;
  link: string;
  logo: string;
}
