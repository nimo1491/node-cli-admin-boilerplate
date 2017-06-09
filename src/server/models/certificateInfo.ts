export interface ICertificateInfoRes {
  id: number;
  certificate_version: string;
  serial_number: string;
  signature_algorithm: string;
  public_key: string;
  from_common_name: string;
  from_organization: string;
  from_organization_unit: string;
  from_city: string;
  from_state: string;
  from_country: string;
  from_email_id: string;
  valid_from: string;
  valid_till: string;
  to_common_name: string;
  to_organization: string;
  to_organization_unit: string;
  to_city: string;
  to_state: string;
  to_country: string;
  to_email_id: string;
}

const certificateList: ICertificateInfoRes[] = [
  {
    id: 1,
    certificate_version: '3',
    serial_number: '92046422C980E206',
    signature_algorithm: 'sha256WithRSAEncryption',
    public_key: '(2048 bit)',
    from_common_name: 'Red',
    from_organization: 'Red Inc',
    from_organization_unit: 'Server',
    from_city: 'Atlanta',
    from_state: 'Georgia',
    from_country: 'US',
    from_email_id: 'admin@red.com',
    valid_from: 'Jun 1 07:01:56 2016 GMT',
    valid_till: 'May 30 07:01:56 2026 GMT',
    to_common_name: 'Red',
    to_organization: 'Red Inc',
    to_organization_unit: 'Server',
    to_city: 'Atlanta',
    to_state: 'Georgia',
    to_country: 'US',
    to_email_id: 'admin@red.com',
  },
  {
    id: 1,
    certificate_version: '3',
    serial_number: '3512382727A0J183',
    signature_algorithm: 'sha256WithRSAEncryption',
    public_key: '(2048 bit)',
    from_common_name: 'Blue',
    from_organization: 'Blue Inc',
    from_organization_unit: 'Server',
    from_city: 'Taipei',
    from_state: 'Taiwan',
    from_country: 'TW',
    from_email_id: 'admin@blue.com',
    valid_from: 'Jun 1 07:01:56 2016 GMT',
    valid_till: 'May 30 07:01:56 2026 GMT',
    to_common_name: 'Blue',
    to_organization: 'Blue Inc',
    to_organization_unit: 'Server',
    to_city: 'Taipei',
    to_state: 'Taiwan',
    to_country: 'TW',
    to_email_id: 'admin@blue.com',
  },
];

/** Get a random certificate object */
export function findCertificateInfo() {
  return certificateList[Math.floor(Math.random() * certificateList.length)];
}
