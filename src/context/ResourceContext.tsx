import React, { createContext, useContext, useState } from 'react';
import {
  AppLanguage,
  AppScreen,
  AvailableResource,
  CategoryInfo,
  ResourceCategory,
  ResourceNeed,
  ResourceRequest,
  UserRole,
  UserSession,
  VolunteerTask,
  OrganizationVerification,
  UserAccount,
  AuditLog,
} from '../types';
import {
  CATEGORIES,
  INITIAL_AVAILABLE_RESOURCES,
  INITIAL_NEEDS,
  INITIAL_REQUESTS,
  INITIAL_VOLUNTEER_TASKS,
  INITIAL_ORGANIZATION_VERIFICATIONS,
  INITIAL_USER_ACCOUNTS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

interface NeedDraft {
  category: ResourceCategory;
  title: string;
  quantity: number;
  unit: string;
  priority: 'High' | 'Medium' | 'Low';
  needBy: string;
  description: string;
}

interface ResourceContextType {
  screen: AppScreen;
  screenHistory: AppScreen[];
  language: AppLanguage;
  role: UserRole;
  userSession: UserSession;
  categories: CategoryInfo[];
  needs: ResourceNeed[];
  availableResources: AvailableResource[];
  requests: ResourceRequest[];
  volunteerTasks: VolunteerTask[];
  searchQuery: string;
  toast: string | null;
  // Flow states
  needDraft: NeedDraft;
  selectedMatch: {
    resource: AvailableResource;
    requestedQty: number;
  } | null;
  activeRequest: ResourceRequest | null;
  activeVolunteerTask: VolunteerTask | null;

  // Actions
  navigate: (screen: AppScreen) => void;
  goBack: () => void;
  setLanguage: (lang: AppLanguage) => void;
  setRole: (role: UserRole) => void;
  setSearchQuery: (query: string) => void;
  showToast: (msg: string) => void;
  loginUser: (identifier: string, role?: UserRole) => void;
  logout: () => void;
  updateUserProfile: (data: Partial<UserSession>) => void;

  // Orphanage Request flow
  selectCategoryForNeed: (category: ResourceCategory) => void;
  updateNeedDraft: (fields: Partial<NeedDraft>) => void;
  findMatchesForDraft: () => void;
  selectMatchToConfirm: (resource: AvailableResource, quantity?: number) => void;
  confirmCurrentRequest: () => ResourceRequest;

  // Tracking & Volunteer
  viewRequestDetails: (req: ResourceRequest) => void;
  openVolunteerHelp: () => void;
  acceptTaskAsVolunteer: (taskId: string) => void;
  progressVolunteerStep: (taskId: string) => void;

  // Provider / Donor Actions
  addProviderResource: (resource: Omit<AvailableResource, 'id'>) => void;
  offerResourceForNeed: (need: ResourceNeed) => void;

  // Admin Data & Actions
  organizationVerifications: OrganizationVerification[];
  verifyOrganization: (orgId: string, status: 'Verified' | 'Pending' | 'Needs Review') => void;
  userAccounts: UserAccount[];
  toggleUserVerification: (userId: string) => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string, badge?: 'info' | 'success' | 'warning') => void;
}


const defaultNeedDraft: NeedDraft = {
  category: 'School Supplies',
  title: 'School Notebooks',
  quantity: 50,
  unit: 'notebooks',
  priority: 'High',
  needBy: '2026-10-05',
  description: 'For children aged 8–15 starting the new academic term.',
};

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [screenHistory, setScreenHistory] = useState<AppScreen[]>([]);
  const [language, setLanguageState] = useState<AppLanguage>('en');
  const [role, setRoleState] = useState<UserRole>('orphanage');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const [categories] = useState<CategoryInfo[]>(CATEGORIES);
  const [needs, setNeeds] = useState<ResourceNeed[]>(INITIAL_NEEDS);
  const [availableResources, setAvailableResources] = useState<AvailableResource[]>(INITIAL_AVAILABLE_RESOURCES);
  const [requests, setRequests] = useState<ResourceRequest[]>(INITIAL_REQUESTS);
  const [volunteerTasks, setVolunteerTasks] = useState<VolunteerTask[]>(INITIAL_VOLUNTEER_TASKS);
  const [organizationVerifications, setOrganizationVerifications] = useState<OrganizationVerification[]>(INITIAL_ORGANIZATION_VERIFICATIONS);
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(INITIAL_USER_ACCOUNTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const [userSession, setUserSession] = useState<UserSession>({
    role: 'organization',
    name: 'Karuna Care Home',
    location: 'Ward 12, Gandhi Road, Bhimavaram',
    phoneOrEmail: 'contact@karunacare.org',
    email: 'contact@karunacare.org',
    phone: '+91 98490 12345',
    organizationType: 'Care Organization / Orphanage',
    contactPerson: 'Sister Mary / M. Rama Rao',
    isVerified: true,
    avatar: '🏠',
  });

  const [needDraft, setNeedDraft] = useState<NeedDraft>(defaultNeedDraft);
  const [selectedMatch, setSelectedMatch] = useState<{
    resource: AvailableResource;
    requestedQty: number;
  } | null>(null);
  const [activeRequest, setActiveRequest] = useState<ResourceRequest | null>(INITIAL_REQUESTS[0]);
  const [activeVolunteerTask, setActiveVolunteerTask] = useState<VolunteerTask | null>(INITIAL_VOLUNTEER_TASKS[0]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const navigate = (nextScreen: AppScreen) => {
    let resolvedScreen = nextScreen;
    if (nextScreen === 'profile') {
      if (role === 'donor' || role === 'provider') resolvedScreen = 'donor_profile';
      else if (role === 'organization' || role === 'orphanage') resolvedScreen = 'org_profile';
      else if (role === 'volunteer') resolvedScreen = 'volunteer_profile';
      else if (role === 'admin') resolvedScreen = 'admin_profile';
    } else if (nextScreen === 'home') {
      if (role === 'donor' || role === 'provider') resolvedScreen = 'donor_dashboard';
      else if (role === 'organization' || role === 'orphanage') resolvedScreen = 'home';
      else if (role === 'volunteer') resolvedScreen = 'volunteer_home';
      else if (role === 'admin') resolvedScreen = 'admin_dashboard';
    }

    setScreenHistory((prev) => [...prev, screen]);
    setScreen(resolvedScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length === 0) {
      if (role === 'donor' || role === 'provider') setScreen('donor_dashboard');
      else if (role === 'organization' || role === 'orphanage') setScreen('home');
      else if (role === 'volunteer') setScreen('volunteer_home');
      else if (role === 'admin') setScreen('admin_dashboard');
      return;
    }

    const prevHistory = [...screenHistory];
    const prevScreen = prevHistory.pop() || 'home';
    setScreenHistory(prevHistory);
    setScreen(prevScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    showToast(lang === 'te' ? 'భాష: తెలుగు ఎంపిక చేయబడింది' : 'Language set to English');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'donor' || newRole === 'provider') {
      setUserSession({
        role: 'donor',
        name: 'ABC Educational Trust',
        location: 'College Campus Road, Bhimavaram',
        phoneOrEmail: 'donor.trust@carenetwork.org',
        email: 'donor.trust@carenetwork.org',
        phone: '+91 98480 23456',
        donorType: 'College / Institution',
        isVerified: true,
        avatar: '🏛️',
      });
    } else if (newRole === 'organization' || newRole === 'orphanage') {
      setUserSession({
        role: 'organization',
        name: 'Karuna Care Home',
        location: 'Ward 12, Gandhi Road, Bhimavaram',
        phoneOrEmail: 'contact@karunacare.org',
        email: 'contact@karunacare.org',
        phone: '+91 98490 12345',
        organizationType: 'Care Organization / Orphanage',
        contactPerson: 'Sister Mary / M. Rama Rao',
        isVerified: true,
        avatar: '🏠',
      });
    } else if (newRole === 'volunteer') {
      setUserSession({
        role: 'volunteer',
        name: 'Ravi Kumar Varma',
        location: 'Bhimavaram Central, West Godavari',
        phoneOrEmail: 'ravi.volunteer@care.org',
        email: 'ravi.volunteer@care.org',
        phone: '+91 94401 56789',
        availability: 'Weekdays & Weekends (8 AM - 7 PM)',
        preferredServiceArea: 'Bhimavaram Care Circle (15 km radius)',
        isVerified: true,
        avatar: '🚚',
      });
    } else if (newRole === 'admin') {
      setUserSession({
        role: 'admin',
        name: 'State Mission Command Center',
        location: 'Andhra Pradesh Social Welfare Hub',
        phoneOrEmail: 'admin.desk@samanvay.gov.in',
        email: 'admin.desk@samanvay.gov.in',
        phone: '+91 8816 223344',
        adminRole: 'Super Administrator',
        isVerified: true,
        avatar: '🛡️',
      });
    }
  };

  const updateUserProfile = (data: Partial<UserSession>) => {
    setUserSession((prev) => ({ ...prev, ...data }));
    addAuditLog('Profile Updated', `User profile for ${data.name || userSession.name} updated`, 'info');
    showToast(language === 'te' ? 'ప్రొఫైల్ సేవ్ చేయబడింది!' : 'Profile saved successfully!');
  };

  const verifyOrganization = (orgId: string, status: 'Verified' | 'Pending' | 'Needs Review') => {
    setOrganizationVerifications((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, status } : o))
    );
    addAuditLog('Verification Updated', `Org verification status set to ${status}`, 'success');
    showToast(`Organization verification marked as ${status}`);
  };

  const toggleUserVerification = (userId: string) => {
    setUserAccounts((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = !u.isVerified;
          addAuditLog('User Verification', `User ${u.name} set to ${updated ? 'Verified' : 'Unverified'}`, 'info');
          return { ...u, isVerified: updated };
        }
        return u;
      })
    );
    showToast('User status updated');
  };

  const addAuditLog = (action: string, details: string, badge: 'info' | 'success' | 'warning' = 'info') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action,
      performedBy: userSession.name,
      role: userSession.role.toUpperCase(),
      timestamp: 'Just now',
      details,
      badge,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const loginUser = (identifier: string, chosenRole?: UserRole) => {
    const activeRole = chosenRole || role;
    setRole(activeRole);
    showToast(language === 'te' ? 'లాగిన్ విజయవంతమైంది' : 'Logged in successfully');

    if (activeRole === 'donor' || activeRole === 'provider') {
      navigate('donor_dashboard');
    } else if (activeRole === 'organization' || activeRole === 'orphanage') {
      navigate('home');
    } else if (activeRole === 'volunteer') {
      navigate('volunteer_home');
    } else if (activeRole === 'admin') {
      navigate('admin_dashboard');
    }
  };

  const logout = () => {
    setScreenHistory([]);
    setScreen('login');
    showToast(language === 'te' ? 'లాగ్ అవుట్ అయ్యారు' : 'Logged out');
  };

  // Ask for Resource workflow
  const selectCategoryForNeed = (cat: ResourceCategory) => {
    const catInfo = categories.find((c) => c.id === cat);
    setNeedDraft((prev) => ({
      ...prev,
      category: cat,
      title: cat === 'Books' ? 'Textbooks & Storybooks' : cat === 'School Supplies' ? 'School Notebooks' : `${cat} Essentials`,
      unit: catInfo?.defaultUnit || 'items',
    }));
    navigate('ask_details');
  };

  const updateNeedDraft = (fields: Partial<NeedDraft>) => {
    setNeedDraft((prev) => ({ ...prev, ...fields }));
  };

  const findMatchesForDraft = () => {
    // If not already in needs, register it
    const newNeed: ResourceNeed = {
      id: `need-${Date.now()}`,
      title: needDraft.title,
      category: needDraft.category,
      quantity: needDraft.quantity,
      unit: needDraft.unit,
      priority: needDraft.priority,
      orphanageName: userSession.name,
      location: userSession.location,
      needBy: needDraft.needBy,
      description: needDraft.description,
      status: 'Matched',
      createdAt: 'Just now',
    };
    setNeeds((prev) => [newNeed, ...prev]);
    navigate('matching');
  };

  const selectMatchToConfirm = (resource: AvailableResource, quantity?: number) => {
    const qty = quantity || Math.min(needDraft.quantity, resource.availableQuantity);
    setSelectedMatch({
      resource,
      requestedQty: qty,
    });
    navigate('confirm_request');
  };

  const confirmCurrentRequest = (): ResourceRequest => {
    const resource = selectedMatch?.resource || availableResources[0];
    const qty = selectedMatch?.requestedQty || 50;

    const newReq: ResourceRequest = {
      id: `req-${Date.now().toString().slice(-4)}`,
      resourceTitle: `${qty} ${resource.title}`,
      category: resource.category,
      quantity: qty,
      unit: resource.unit,
      providerName: resource.providerName,
      orphanageName: userSession.name,
      distanceKm: resource.distanceKm,
      status: 'Accepted',
      priority: 'High',
      createdAt: 'Just now',
      currentStepMessage: '50 notebooks are reserved for your orphanage. Volunteer pickup is being arranged.',
    };

    setRequests((prev) => [newReq, ...prev]);

    // Also create a volunteer task automatically
    const newTask: VolunteerTask = {
      id: `vtask-${Date.now().toString().slice(-4)}`,
      requestId: newReq.id,
      resourceTitle: newReq.resourceTitle,
      quantity: qty,
      unit: resource.unit,
      fromName: resource.providerName,
      toName: userSession.name,
      pickupLocation: `${resource.providerName}, ${resource.location}`,
      dropLocation: `${userSession.name}, ${userSession.location}`,
      distanceKm: resource.distanceKm,
      priority: 'High',
      status: 'Available',
    };

    setVolunteerTasks((prev) => [newTask, ...prev]);
    setActiveRequest(newReq);
    setActiveVolunteerTask(newTask);

    // Decrement available quantity
    setAvailableResources((prev) =>
      prev.map((r) =>
        r.id === resource.id
          ? { ...r, availableQuantity: Math.max(0, r.availableQuantity - qty) }
          : r
      )
    );

    navigate('request_status');
    return newReq;
  };

  const viewRequestDetails = (req: ResourceRequest) => {
    setActiveRequest(req);
    navigate('request_status');
  };

  const openVolunteerHelp = () => {
    navigate('volunteer_help');
  };

  const acceptTaskAsVolunteer = (taskId: string) => {
    const task = volunteerTasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask: VolunteerTask = {
      ...task,
      status: 'Accepted',
      volunteerName: userSession.role === 'volunteer' ? userSession.name : 'Ravi Kumar (Volunteer)',
    };

    setVolunteerTasks((prev) =>
      prev.map((t) => (t.id === taskId ? updatedTask : t))
    );

    setActiveVolunteerTask(updatedTask);
    showToast(language === 'te' ? 'టాస్క్ అంగీకరించబడింది!' : 'Delivery task accepted!');
    navigate('delivery_task');
  };

  const progressVolunteerStep = (taskId: string) => {
    const task = volunteerTasks.find((t) => t.id === taskId);
    if (!task) return;

    if (task.status === 'Accepted' || task.status === 'Available') {
      const pickedUpTask: VolunteerTask = {
        ...task,
        status: 'Picked Up',
      };
      setVolunteerTasks((prev) =>
        prev.map((t) => (t.id === taskId ? pickedUpTask : t))
      );
      setActiveVolunteerTask(pickedUpTask);

      // Update corresponding request
      setRequests((prev) =>
        prev.map((r) =>
          r.id === task.requestId
            ? { ...r, status: 'Pickup', currentStepMessage: 'Picked up from provider. On the way to orphanage.' }
            : r
        )
      );

      showToast(language === 'te' ? 'సేకరణ పూర్తయింది! ఆశ్రమానికి తీసుకెళ్లండి.' : 'Marked as Picked Up! Head to orphanage.');
    } else if (task.status === 'Picked Up') {
      const deliveredTask: VolunteerTask = {
        ...task,
        status: 'Delivered',
      };
      setVolunteerTasks((prev) =>
        prev.map((t) => (t.id === taskId ? deliveredTask : t))
      );
      setActiveVolunteerTask(deliveredTask);

      // Update corresponding request to Delivered
      setRequests((prev) =>
        prev.map((r) =>
          r.id === task.requestId
            ? { ...r, status: 'Delivered', currentStepMessage: 'Resource reached orphanage successfully.' }
            : r
        )
      );

      navigate('delivered_success');
    }
  };

  const addProviderResource = (resourceData: Omit<AvailableResource, 'id'>) => {
    const newRes: AvailableResource = {
      ...resourceData,
      id: `avail-${Date.now()}`,
    };
    setAvailableResources((prev) => [newRes, ...prev]);
    showToast(language === 'te' ? 'వస్తువు విజయవంతంగా జోడించబడింది!' : 'Resource posted successfully!');
    navigate('marketplace');
  };

  const offerResourceForNeed = (need: ResourceNeed) => {
    const newReq: ResourceRequest = {
      id: `req-${Date.now().toString().slice(-4)}`,
      resourceTitle: `${need.quantity} ${need.title}`,
      category: need.category,
      quantity: need.quantity,
      unit: need.unit,
      providerName: userSession.name,
      orphanageName: need.orphanageName,
      distanceKm: 8,
      status: 'Accepted',
      priority: need.priority,
      createdAt: 'Just now',
      currentStepMessage: `Offered by ${userSession.name}. Ready for volunteer pickup.`,
    };

    setRequests((prev) => [newReq, ...prev]);
    setActiveRequest(newReq);
    showToast(language === 'te' ? 'ఆఫర్ పంపబడింది!' : 'Resource offered to orphanage!');
    navigate('request_status');
  };

  return (
    <ResourceContext.Provider
      value={{
        screen,
        screenHistory,
        language,
        role,
        userSession,
        categories,
        needs,
        availableResources,
        requests,
        volunteerTasks,
        searchQuery,
        toast,
        needDraft,
        selectedMatch,
        activeRequest,
        activeVolunteerTask,
        navigate,
        goBack,
        setLanguage,
        setRole,
        setSearchQuery,
        showToast,
        loginUser,
        logout,
        selectCategoryForNeed,
        updateNeedDraft,
        findMatchesForDraft,
        selectMatchToConfirm,
        confirmCurrentRequest,
        viewRequestDetails,
        openVolunteerHelp,
        acceptTaskAsVolunteer,
        progressVolunteerStep,
        addProviderResource,
        offerResourceForNeed,
        updateUserProfile,
        organizationVerifications,
        verifyOrganization,
        userAccounts,
        toggleUserVerification,
        auditLogs,
        addAuditLog,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResource = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResource must be used within a ResourceProvider');
  }
  return context;
};
