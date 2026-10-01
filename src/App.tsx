import React from 'react';
import { ResourceProvider, useResource } from './context/ResourceContext';
import { TopHeader } from './components/TopHeader';
import { BottomNavigation } from './components/BottomNavigation';
import { FloatingToast } from './components/FloatingToast';

// All Screens
import { Page1Splash } from './components/Page1Splash';
import { Page2Language } from './components/Page2Language';
import { Page3RoleSelect } from './components/Page3RoleSelect';
import { Page4Login } from './components/Page4Login';
import { Page5HomeDashboard } from './components/Page5HomeDashboard';
import { Page6AskCategory } from './components/Page6AskCategory';
import { Page7ResourceDetails } from './components/Page7ResourceDetails';
import { Page8MatchingResources } from './components/Page8MatchingResources';
import { Page9Marketplace } from './components/Page9Marketplace';
import { Page10ConfirmRequest } from './components/Page10ConfirmRequest';
import { Page11RequestStatus } from './components/Page11RequestStatus';
import { Page12VolunteerHelp } from './components/Page12VolunteerHelp';
import { Page13MyRequests } from './components/Page13MyRequests';
import { Page14DeliveryTask } from './components/Page14DeliveryTask';
import { Page15DeliveredSuccess } from './components/Page15DeliveredSuccess';
import { Page16Profile } from './components/Page16Profile';
import { DonorDashboard } from './components/DonorDashboard';
import { DonorProfile } from './components/DonorProfile';
import { OrganizationProfile } from './components/OrganizationProfile';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { VolunteerProfile } from './components/VolunteerProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminProfile } from './components/AdminProfile';
import { ProviderPostResource } from './components/ProviderPostResource';
import { ProviderFindNeeds } from './components/ProviderFindNeeds';

function AppContent() {
  const { screen, navigate, role, language } = useResource();

  const renderCurrentScreen = () => {
    switch (screen) {
      case 'splash':
        return <Page1Splash />;
      case 'language':
        return <Page2Language />;
      case 'role_select':
        return <Page3RoleSelect />;
      case 'login':
        return <Page4Login />;
      case 'home':
        return <Page5HomeDashboard />;
      case 'ask_category':
        return <Page6AskCategory />;
      case 'ask_details':
        return <Page7ResourceDetails />;
      case 'matching':
        return <Page8MatchingResources />;
      case 'marketplace':
        return <Page9Marketplace />;
      case 'confirm_request':
        return <Page10ConfirmRequest />;
      case 'request_status':
        return <Page11RequestStatus />;
      case 'volunteer_help':
        return <Page12VolunteerHelp />;
      case 'my_requests':
        return <Page13MyRequests />;
      case 'delivery_task':
        return <Page14DeliveryTask />;
      case 'delivered_success':
        return <Page15DeliveredSuccess />;
      case 'profile':
        return <Page16Profile />;
      case 'donor_dashboard':
      case 'provider_home':
        return <DonorDashboard />;
      case 'donor_profile':
        return <DonorProfile />;
      case 'org_profile':
        return <OrganizationProfile />;
      case 'volunteer_home':
        return <VolunteerDashboard />;
      case 'volunteer_profile':
        return <VolunteerProfile />;
      case 'admin_dashboard':
        return <AdminDashboard />;
      case 'admin_profile':
        return <AdminProfile />;
      case 'provider_post':
        return <ProviderPostResource />;
      case 'provider_needs':
        return <ProviderFindNeeds />;
      default:
        if (role === 'donor' || role === 'provider') return <DonorDashboard />;
        if (role === 'volunteer') return <VolunteerDashboard />;
        if (role === 'admin') return <AdminDashboard />;
        return <Page5HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] flex flex-col items-center justify-start text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Mobile-first Container Frame */}
      <div className="w-full max-w-md min-h-screen bg-[#FAF8F5] flex flex-col relative shadow-2xl shadow-stone-400/20 border-x border-stone-200/80">
        {/* Top Header */}
        <TopHeader />

        {/* Global Floating Toast */}
        <FloatingToast />

        {/* Dynamic Screen Viewport */}
        <main className="flex-1 flex flex-col">
          {renderCurrentScreen()}
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ResourceProvider>
      <AppContent />
    </ResourceProvider>
  );
}
