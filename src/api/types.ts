export interface Customer {
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
        trainings?: { href: string };
      };
    }
  