import React from 'react';
import { useResource } from '../context/ResourceContext';
import { DonorProfile } from './DonorProfile';
import { OrganizationProfile } from './OrganizationProfile';
import { VolunteerProfile } from './VolunteerProfile';
import { AdminProfile } from './AdminProfile';

export const Page16Profile: React.FC = () => {
  const { role } = useResource();

  if (role === 'donor' || role === 'provider') {
    return <DonorProfile />;
  }

  if (role === 'volunteer') {
    return <VolunteerProfile />;
  }

  if (role === 'admin') {
    return <AdminProfile />;
  }

  return <OrganizationProfile />;
};
