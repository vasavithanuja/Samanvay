export type AppLanguage = 'en' | 'te';

export type UserRole = 'donor' | 'organization' | 'volunteer' | 'admin' | 'orphanage' | 'provider';

export type AppScreen =
  | 'splash'
  | 'language'
  | 'role_select'
  | 'login'
  | 'home'
  | 'ask_category'
  | 'ask_details'
  | 'matching'
  | 'marketplace'
  | 'confirm_request'
  | 'request_status'
  | 'volunteer_help'
  | 'my_requests'
  | 'delivery_task'
  | 'delivered_success'
  | 'profile'
  | 'provider_home'
  | 'provider_post'
  | 'provider_needs'
  | 'volunteer_home'
  | 'donor_dashboard'
  | 'donor_profile'
  | 'org_profile'
  | 'volunteer_profile'
  | 'admin_dashboard'
  | 'admin_profile';

export type ResourceCategory =
  | 'Books'
  | 'School Supplies'
  | 'Clothes'
  | 'Food'
  | 'Hygiene'
  | 'Furniture'
  | 'Electronics'
  | 'Toys';

export interface CategoryInfo {
  id: ResourceCategory;
  nameEn: string;
  nameTe: string;
  icon: string;
  defaultUnit: string;
  descriptionEn: string;
}

export interface ResourceNeed {
  id: string;
  title: string;
  category: ResourceCategory;
  quantity: number;
  unit: string;
  priority: 'High' | 'Medium' | 'Low';
  orphanageName: string;
  location: string;
  needBy: string;
  description: string;
  status: 'Open' | 'Matched' | 'Accepted' | 'Delivered';
  createdAt: string;
}

export interface AvailableResource {
  id: string;
  title: string;
  category: ResourceCategory;
  providerName: string;
  providerType: string;
  availableQuantity: number;
  unit: string;
  distanceKm: number;
  location: string;
  condition: string;
  description: string;
  badge?: 'Good Match' | 'Partial Match';
  reservedQuantity?: number;
  status?: 'Available' | 'Reserved' | 'Completed';
}

export type RequestStage =
  | 'Searching'
  | 'Requested'
  | 'Accepted'
  | 'Pickup'
  | 'On the Way'
  | 'Delivered'
  | 'Received';

export interface ResourceRequest {
  id: string;
  resourceTitle: string;
  category: ResourceCategory;
  quantity: number;
  unit: string;
  providerName: string;
  orphanageName: string;
  distanceKm: number;
  status: RequestStage;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  needId?: string;
  availableResourceId?: string;
  volunteerName?: string;
  currentStepMessage?: string;
}

export interface VolunteerTask {
  id: string;
  requestId: string;
  resourceTitle: string;
  quantity: number;
  unit: string;
  pickupLocation: string;
  dropLocation: string;
  distanceKm: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Available' | 'Accepted' | 'Picked Up' | 'Delivered';
  volunteerName?: string;
  fromName: string;
  toName: string;
}

export interface UserSession {
  role: UserRole;
  name: string;
  location: string;
  phoneOrEmail: string;
  email?: string;
  phone?: string;
  avatar?: string;
  isVerified?: boolean;
  donorType?: string;
  organizationType?: string;
  contactPerson?: string;
  availability?: string;
  preferredServiceArea?: string;
  adminRole?: string;
}

export interface OrganizationVerification {
  id: string;
  orgName: string;
  orgType: string;
  contactPerson: string;
  location: string;
  phone: string;
  email: string;
  registeredDate: string;
  status: 'Verified' | 'Pending' | 'Needs Review';
  certificateNumber: string;
}

export interface UserAccount {
  id: string;
  name: string;
  role: 'donor' | 'organization' | 'volunteer' | 'admin';
  email: string;
  phone: string;
  location: string;
  isVerified: boolean;
  joinedDate: string;
  categoryOrType?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  role: string;
  timestamp: string;
  details: string;
  badge?: 'info' | 'success' | 'warning';
}

