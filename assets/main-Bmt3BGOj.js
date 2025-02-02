import{d,a as f,R as u,b as h,U as C,I as S}from"./vendor-components-js-d6i_3.js";import{c as w,w as g,o as N,q as b,b as v,e as E,u as D,T as A,j as x,k as L,l as I,m as R}from"./vendor-firebase-q4K5YV9j.js";import{A as c,D as s,a as y}from"./vendor-utils-lm0uXl8i.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();class B{constructor(e){if(!e)throw new Error("Container element is required");console.log("Initializing TimeEntriesTable with container:",e),this.container=e,this.entries=[],this.render(),d.subscribe("timeEntriesTable",t=>{console.log("TimeEntriesTable received state update:",t),this.handleStateChange(t)})}handleStateChange(e){const t=JSON.stringify({filters:e.filters,role:e.role});t!==this.lastStateKey&&this.shouldReload(e)&&(console.log("TimeEntriesTable: Role or filters changed"),this.lastStateKey=t,this.currentFilters=e.filters,this.currentRole=e.role,this.loadEntries())}shouldReload(e){return e.filters!==this.currentFilters||e.role!==this.currentRole}async loadEntries(){try{d.setLoading(!0),this.updateLoadingState(!0);const{role:e,user:t,assignedWorkers:a,filters:r}=d.getState();let n=w(f,"timeEntries");const o=[];e===u.ROLES.MANAGER&&a?.length>0&&o.push(g("workerId","in",a)),r.status&&r.status!=="all"&&o.push(g("status","==",r.status)),r.dateRange.startDate&&r.dateRange.endDate&&(o.push(g("date",">=",r.dateRange.startDate)),o.push(g("date","<=",r.dateRange.endDate))),o.push(N("date","desc"));const i=b(n,...o),l=await v(i);this.entries=l.docs.map(m=>({id:m.id,...m.data()})),this.renderEntries()}catch(e){console.error("Failed to load time entries:",e),c.showNotification("Failed to load time entries","error")}finally{d.setLoading(!1),this.updateLoadingState(!1)}}async render(){if(!this.container)throw new Error("Container not found");s.removeAllChildren(this.container);const e=this.createFiltersSection();this.container.appendChild(e);const t=this.groupEntriesByWeek(this.entries),a=s.createElement("div",{className:"space-y-6"});t.forEach((r,n)=>{const o=this.createWeekContainer(n,r);a.appendChild(o)}),this.container.appendChild(a)}createTableHeader(){const e=s.createElement("tr");return["Date","Worker","Hours","Type","Status","Actions"].forEach(a=>{const r=s.createElement("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",text:a});e.appendChild(r)}),e}createFiltersSection(){const{filters:e}=d.getState(),t=s.createElement("div",{className:"mb-6 p-4 bg-white rounded-lg shadow"}),a=s.createElement("select",{className:"mr-4 px-3 py-2 border rounded"});["All","Pending","Approved","Rejected"].forEach(l=>{const m=s.createElement("option",{text:l,value:l.toLowerCase(),attributes:{selected:e.status===l.toLowerCase()}});a.appendChild(m)});const r=s.createElement("div",{className:"flex items-center space-x-4"}),n=s.createElement("input",{className:"px-3 py-2 border rounded",attributes:{type:"date",value:e.dateRange.startDate?.toISOString().split("T")[0]||""}}),o=s.createElement("input",{className:"px-3 py-2 border rounded",attributes:{type:"date",value:e.dateRange.endDate?.toISOString().split("T")[0]||""}}),i=s.createElement("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",text:"Apply Filters"});return i.addEventListener("click",()=>{d.updateFilters({status:a.value,dateRange:{startDate:n.value?new Date(n.value):null,endDate:o.value?new Date(o.value):null}})}),r.append(n,o),t.append(a,r,i),t}renderEntries(){const e=this.container.querySelector("tbody");if(!e)return;s.removeAllChildren(e);const{user:t,settings:a}=d.getState();this.entries.forEach(r=>{const n=this.createEntryRow(r,t,a);e.appendChild(n)})}createEntryRow(e,t,a){const r=s.createElement("tr",{className:"hover:bg-gray-50"});r.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:y.formatDate(new Date(e.date))})),r.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.workerEmail||e.workerId})),r.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.hours.toString()})),r.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.type||"Regular"}));const n=s.createElement("td",{className:"px-6 py-4 whitespace-nowrap"}),o=s.createElement("span",{className:`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getStatusBadgeClass(e.status)}`,text:e.status||"Pending"});n.appendChild(o),r.appendChild(n);const i=s.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium"});if(u.hasPermission(a,u.PERMISSIONS.APPROVE_TIME))if(e.status==="pending"){const l=s.createElement("button",{className:"text-green-600 hover:text-green-900 mr-4",text:"Approve"});l.addEventListener("click",()=>this.updateStatus(e.id,"approved"));const m=s.createElement("button",{className:"text-red-600 hover:text-red-900",text:"Reject"});m.addEventListener("click",()=>this.updateStatus(e.id,"rejected")),i.append(l,m)}else{const l=s.createElement("button",{className:"text-blue-600 hover:text-blue-900",text:"Reset Status"});l.addEventListener("click",()=>this.updateStatus(e.id,"pending")),i.appendChild(l)}return r.appendChild(i),r}async updateStatus(e,t){try{const{user:a}=d.getState(),r=E(f,"timeEntries",e);await D(r,{status:t,updatedAt:A.now(),updatedBy:a.uid}),await this.loadEntries(),c.showNotification(`Entry ${t} successfully`,"success")}catch(a){console.error("Error updating status:",a),c.showNotification("Failed to update entry status","error")}}getStatusBadgeClass(e){switch(e?.toLowerCase()){case"approved":return"bg-green-100 text-green-800";case"rejected":return"bg-red-100 text-red-800";default:return"bg-yellow-100 text-yellow-800"}}updateLoadingState(e){if(!this.container)return;const t=this.container.querySelector(".loading-overlay");if(e&&!t){const a=s.createElement("div",{className:"loading-overlay"}),r=s.createElement("div",{className:"spinner"});a.appendChild(r),this.container.appendChild(a)}else!e&&t&&t.remove()}groupEntriesByWeek(e){const t=new Map;return e.forEach(a=>{const r=new Date(a.date),n=y.formatDate(y.getWeekStart(r));t.has(n)||t.set(n,{entries:[],totals:{regularHours:0,overtimeHours:0,ptoHours:0}});const o=t.get(n);if(o.entries.push(a),a.isTimeOff)a.timeOffType==="paid"&&(o.totals.ptoHours+=a.hours||0);else{const i=a.hours||0;i>8?(o.totals.regularHours+=8,o.totals.overtimeHours+=i-8):o.totals.regularHours+=i}}),t}createWeekContainer(e,t){const a=s.createElement("div",{className:"bg-white rounded-lg shadow overflow-hidden"}),r=s.createElement("div",{className:"p-4 border-b border-gray-200 flex justify-between items-center"}),n=s.createElement("h3",{className:"text-lg font-medium",text:`Week of ${y.formatDateForDisplay(new Date(e))}`}),o=s.createElement("div",{className:"text-sm text-gray-500",text:`Regular: ${t.totals.regularHours}h | OT: ${t.totals.overtimeHours}h | PTO: ${t.totals.ptoHours}h`});r.append(n,o),a.appendChild(r);const i=this.createWeekTable(t.entries);return a.appendChild(i),a}createWeekTable(e){const t=s.createElement("div",{className:"overflow-x-auto"}),a=s.createElement("table",{className:"min-w-full divide-y divide-gray-200"}),r=s.createElement("thead",{className:"bg-gray-50"});r.appendChild(this.createTableHeader()),a.appendChild(r);const n=s.createElement("tbody",{className:"bg-white divide-y divide-gray-200"});return e.forEach(o=>{const i=this.createEntryRow(o,d.getState().user,d.getState().settings);n.appendChild(i)}),a.appendChild(n),t.appendChild(a),t}destroy(){this.cleanup&&this.cleanup()}}class T{constructor(){this.dashboardState=d,this.components={userManagement:null,timeEntriesTable:null,invoiceGenerator:null},this.initialize=this.initialize.bind(this),this.loadUserData=this.loadUserData.bind(this),this.renderDashboard=this.renderDashboard.bind(this)}async initialize(){try{console.log("Initializing AdminDashboard...");const e=h.currentUser;if(!e)throw console.error("No authenticated user"),new Error("No authenticated user");return await this.loadUserData(e.uid),await this.renderDashboard(),!0}catch(e){throw console.error("Failed to initialize dashboard:",e),e}}async loadUserData(e){try{console.log("Fetching user data for:",e);const t=await x(E(f,"users",e));if(!t.exists())throw console.error("No user document found"),new Error("User document not found");const a=t.data();this.dashboardState.setState({user:h.currentUser,role:a.role,assignedWorkers:a.assignedWorkers||[],settings:a.settings||{},isInitialized:!0}),console.log("User role loaded:",a.role)}catch(t){throw console.error("Error loading user data:",t),c.showNotification("Failed to load user data","error"),t}}async renderDashboard(){console.log("Rendering dashboard...");const e=document.getElementById("adminDashboard");if(!e)throw new Error("Admin dashboard container not found");e.style.display="block",s.removeAllChildren(e);const t=this.createHeader(),a=s.createElement("main",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"});e.appendChild(t),e.appendChild(a);const{role:r}=this.dashboardState.getState();console.log("Current user role:",r),u.hasAccess(r,[u.ROLES.SUPER_ADMIN,u.ROLES.MANAGER])&&await this.renderAdminSections(a)}createHeader(){const e=s.createElement("header",{className:"bg-white shadow mb-6"}),{user:t}=this.dashboardState.getState(),a=s.createElement("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"}),r=s.createElement("h1",{text:`Welcome, ${t?.email}`,className:"text-3xl font-bold text-gray-900"}),n=s.createElement("button",{text:"Logout",className:"px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"});return n.addEventListener("click",async()=>{try{await h.signOut(),window.location.reload()}catch(o){console.error("Error signing out:",o),c.showNotification("Failed to sign out","error")}}),a.append(r,n),e.appendChild(a),e}async renderAdminSections(e){try{console.log("Rendering admin sections...");const t=this.createSection("User Management","userManagementContent"),a=t.querySelector('[id="userManagementContent"]');a&&(this.components.userManagement=new C(a)),e.appendChild(t);const r=this.createSection("Time Entries","timeEntriesContent"),n=r.querySelector('[id="timeEntriesContent"]');n&&(this.components.timeEntriesTable=new B(n)),e.appendChild(r);const o=this.createSection("Invoice Generator","invoiceGeneratorContent"),i=o.querySelector('[id="invoiceGeneratorContent"]');if(i){const{companies:l=[]}=this.dashboardState.getState();this.components.invoiceGenerator=new S(l),this.components.invoiceGenerator.render(i)}e.appendChild(o)}catch(t){console.error("Error rendering admin sections:",t),c.showNotification("Failed to render dashboard sections","error")}}createSection(e,t){console.log(`Creating section: ${e}`);const a=s.createElement("div",{className:"bg-white shadow rounded-lg mb-6"}),r=s.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),n=s.createElement("h2",{text:e,className:"text-lg font-medium text-gray-900"}),o=s.createElement("div",{attributes:{id:t},className:"px-4 py-5 sm:p-6 section-content"});return r.appendChild(n),a.appendChild(r),a.appendChild(o),a}getContentElements(e){return{userManagementContent:document.getElementById("userManagementContent"),timeEntriesContent:document.getElementById("timeEntriesContent"),invoiceGeneratorContent:document.getElementById("invoiceGeneratorContent")}}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="/"}showError(e){c.showNotification(e,"error")}}class k{constructor(){this.initialized=!1,this.setupAuthListener()}setupAuthListener(){L(h,async e=>{console.log("Auth: ",e?"User authenticated":"No user");const t=document.getElementById("appLoading"),a=document.getElementById("authContainer"),r=document.getElementById("adminDashboard");if(t&&(t.style.display="none",console.log("Loading screen hidden")),e)try{if(console.log("Loading user data..."),!await this.loadUserData(e))throw new Error("No user data found");a&&(a.classList.remove("active"),a.style.display="none"),r&&(r.style.display="block")}catch(n){console.error("Error loading user data:",n),await this.logout()}else a&&(a.style.display="block",a.classList.add("active")),r&&(r.style.display="none"),console.log("No user, showing login form")})}async login(e,t){try{console.log("Attempting login...");const a=await I(h,e,t);console.log("Firebase Auth successful, loading user data...");const r=await this.loadUserData(a.user);if(!r)throw console.error("No user data found"),new Error("No user data found");if(console.log("Verifying admin access...",r.role),!this.verifyAdminAccess(r.role))throw console.error("User does not have admin access"),await this.logout(),new Error("Unauthorized access. Admin privileges required.");return console.log("Login successful!"),r}catch(a){console.error("Login error:",a);const r=this.getLoginErrorMessage(a);throw c.showNotification(r,"error"),a}}async loadUserData(e){try{let t=null;const a=E(f,"users",e.uid),r=await x(a);if(r.exists())t={id:r.id,...r.data()};else{const n=w(f,"users"),o=b(n,g("email","==",e.email)),i=await v(o);i.empty||(t={id:i.docs[0].id,...i.docs[0].data()})}if(!t)throw new Error("User data not found");return d.updateUserData({user:e,role:t.role,assignedWorkers:t.assignedWorkers||[],settings:t.settings||u.getDefaultPermissions(t.role)}),this.updateUIForAuthenticatedUser(e.email),t}catch(t){throw console.error("Error loading user data:",t),t}}verifyAdminAccess(e){return[u.ROLES.SUPER_ADMIN,u.ROLES.MANAGER].includes(e)}async logout(){try{await R(h),d.reset(),this.redirectToLogin()}catch(e){console.error("Logout error:",e),c.showNotification("Failed to logout. Please try again.","error")}}updateUIForAuthenticatedUser(e){const t=document.getElementById("authContainer"),a=document.getElementById("adminDashboard"),r=document.getElementById("adminEmail");t&&t.classList.remove("active"),a&&(a.style.display="block"),r&&(r.textContent=e)}getLoginErrorMessage(e){switch(e.code){case"auth/invalid-email":return"Invalid email address format.";case"auth/user-disabled":return"This account has been disabled. Please contact support.";case"auth/user-not-found":return"No account found with this email.";case"auth/wrong-password":return"Invalid password.";case"auth/too-many-requests":return"Too many failed attempts. Please try again later.";default:return e.message||"An error occurred during login."}}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="./"}async verifySession(){const e=h.currentUser;if(!e)return!1;try{return await e.getIdToken(!0),!0}catch(t){return console.error("Session verification failed:",t),!1}}getAuthStatus(){const{user:e,role:t,isInitialized:a}=d.getState();return{isAuthenticated:!!e,isAdmin:this.verifyAdminAccess(t),isInitialized:a,user:e}}}if(!d)throw console.error("DashboardState not initialized"),new Error("DashboardState not initialized");class U{constructor(){this.adminDashboard=null,this.authManager=new k}async initialize(){try{console.log("Initializing Admin App..."),this.setupEventListeners(),this.setupAuthStateListener(),this.setupErrorHandling()}catch(e){console.error("Failed to initialize admin app:",e),this.showError("Application initialization failed.")}}setupAuthStateListener(){h.onAuthStateChanged(async e=>{console.log("Auth state changed:",e?"User authenticated":"No user");const t=document.getElementById("appLoading"),a=document.getElementById("authContainer"),r=document.getElementById("adminDashboard");t&&(t.style.display="none"),e?(console.log("User authenticated:",e.email),a&&(a.style.display="none"),r&&(r.style.display="block"),await this.initializeDashboard(e)):(console.log("No user, showing login form"),a&&(a.style.display="block"),r&&(r.style.display="none"))})}setupEventListeners(){const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async a=>{a.preventDefault();const r=document.getElementById("email").value,n=document.getElementById("password").value;try{await this.authManager.login(r,n)}catch{}});const t=document.getElementById("logoutBtn");t&&t.addEventListener("click",()=>this.authManager.logout())}async initializeDashboard(e){try{this.adminDashboard=new T,await this.adminDashboard.initialize()}catch(t){console.error("Failed to initialize dashboard:",t),this.showError("Failed to initialize dashboard.")}}setupErrorHandling(){window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason),this.showError("An unexpected error occurred.")}),window.addEventListener("error",e=>{console.error("Global error:",e.error),this.showError("An unexpected error occurred.")})}showError(e){const t=document.getElementById("errorBoundary"),a=document.getElementById("errorMessage");t&&a&&(t.style.display="flex",a.textContent=e)}}document.addEventListener("DOMContentLoaded",()=>{new U().initialize()});
