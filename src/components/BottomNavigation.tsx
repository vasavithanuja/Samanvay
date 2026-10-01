import React from 'react';
import { useResource } from '../context/ResourceContext';
import {
  Home,
  Package,
  PlusCircle,
  ClipboardList,
  User,
  Truck,
  MapPin,
  ShieldCheck,
  Search,
  CheckCircle2,
  Navigation,
} from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const { screen, navigate, language, role } = useResource();

  // Only show bottom navigation on main app screens
  const mainScreens = [
    'home',
    'marketplace',
    'my_requests',
    'profile',
    'provider_home',
    'provider_post',
    'provider_needs',
    'volunteer_home',
    'volunteer_help',
    'donor_dashboard',
    'donor_profile',
    'org_profile',
    'volunteer_profile',
    'admin_dashboard',
    'admin_profile',
    'delivery_task',
  ];

  if (!mainScreens.includes(screen)) {
    return null;
  }

  const isTe = language === 'te';
  const isDonor = role === 'donor' || role === 'provider';
  const isVolunteer = role === 'volunteer';
  const isAdmin = role === 'admin';
  const isOrg = !isDonor && !isVolunteer && !isAdmin;

  if (isAdmin) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-purple-900/50 shadow-lg max-w-md mx-auto text-white"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-3 h-16">
          <button
            onClick={() => navigate('admin_dashboard')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'admin_dashboard' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">Dashboard</span>
          </button>

          <button
            onClick={() => navigate('marketplace')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'marketplace' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">Network</span>
          </button>

          <button
            onClick={() => navigate('admin_profile')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'admin_profile' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">Profile</span>
          </button>
        </div>
      </nav>
    );
  }

  if (isDonor) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg max-w-md mx-auto"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-5 h-16">
          {/* 1. Dashboard */}
          <button
            onClick={() => navigate('donor_dashboard')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'donor_dashboard' || screen === 'provider_home'
                ? 'text-teal-700 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? 'హోమ్' : 'Dashboard'}</span>
          </button>

          {/* 2. My Resources */}
          <button
            onClick={() => navigate('marketplace')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'marketplace' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? 'వనరులు' : 'Resources'}</span>
          </button>

          {/* 3. + Add Resource */}
          <button
            onClick={() => navigate('provider_post')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'provider_post' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? '+ జోడించు' : '+ Post'}</span>
          </button>

          {/* 4. Requests */}
          <button
            onClick={() => navigate('my_requests')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'my_requests' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? 'అభ్యర్థనలు' : 'Requests'}</span>
          </button>

          {/* 5. Profile */}
          <button
            onClick={() => navigate('donor_profile')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'donor_profile' || screen === 'profile'
                ? 'text-teal-700 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? 'ప్రొఫైల్' : 'Profile'}</span>
          </button>
        </div>
      </nav>
    );
  }

  if (isVolunteer) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg max-w-md mx-auto"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-4 h-16">
          {/* 1. Dashboard */}
          <button
            onClick={() => navigate('volunteer_home')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'volunteer_home' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? 'హోమ్' : 'Dashboard'}</span>
          </button>

          {/* 2. Tasks */}
          <button
            onClick={() => navigate('volunteer_help')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'volunteer_help' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? 'టాస్క్‌లు' : 'Tasks'}</span>
          </button>

          {/* 3. Active Delivery */}
          <button
            onClick={() => navigate('delivery_task')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'delivery_task' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Navigation className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? 'రవాణా' : 'Transit'}</span>
          </button>

          {/* 4. Profile */}
          <button
            onClick={() => navigate('volunteer_profile')}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
              screen === 'volunteer_profile' || screen === 'profile'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{isTe ? 'ప్రొఫైల్' : 'Profile'}</span>
          </button>
        </div>
      </nav>
    );
  }

  // Organization Bottom Navigation
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg max-w-md mx-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 h-16">
        {/* 1. Dashboard */}
        <button
          onClick={() => navigate('home')}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            screen === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">{isTe ? 'హోమ్' : 'Dashboard'}</span>
        </button>

        {/* 2. Post Need */}
        <button
          onClick={() => navigate('ask_category')}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            screen === 'ask_category' || screen === 'ask_details'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">{isTe ? '+ అవసరం' : '+ Post Need'}</span>
        </button>

        {/* 3. Matching Resources */}
        <button
          onClick={() => navigate('marketplace')}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            screen === 'marketplace' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">{isTe ? 'వనరులు' : 'Resources'}</span>
        </button>

        {/* 4. Requests */}
        <button
          onClick={() => navigate('my_requests')}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            screen === 'my_requests' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">{isTe ? 'అభ్యర్థనలు' : 'Requests'}</span>
        </button>

        {/* 5. Profile */}
        <button
          onClick={() => navigate('org_profile')}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            screen === 'org_profile' || screen === 'profile'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">{isTe ? 'ప్రొఫైల్' : 'Profile'}</span>
        </button>
      </div>
    </nav>
  );
};
