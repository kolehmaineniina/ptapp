export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
  _links: {
      self: { href: string };
      customer?: { href: string };
      trainings: { href: string };
    };
  }

export interface TrainingCustomer {
  id: number;
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
}

export interface Training {
  id: number;
  date: string;
  duration: number;
  activity: string;
  _links: {
    self: { href: string };
    training: { href: string };
    customer: { href: string };
  };
  customer: TrainingCustomer;
}

export interface TrainingToPost {
  date: string,
  activity: string,
  duration: number,
  customer?: string,
}


