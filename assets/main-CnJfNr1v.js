import{d,a as f,R as u,b as m,U as N,I as L}from"./vendor-components-CwqMKwvY.js";import{c as E,w as g,o as I,q as b,b as v,e as x,u as k,T as R,j as S,k as M,l as B,m as U}from"./vendor-firebase-q4K5YV9j.js";import{A as p,D as n,a as w}from"./vendor-utils-lm0uXl8i.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();class F{constructor(e){if(!e)throw new Error("Container element is required");this.container=e,this.entries=[],this.initialized=!1,this.init()}async init(){try{this.updateLoadingState(!0),await this.loadEntries(),d.subscribe("timeEntriesTable",e=>{this.handleStateChange(e)}),this.render(),this.initialized=!0}catch(e){console.error("Failed to initialize time entries table:",e),this.showError("Failed to load time entries")}finally{this.updateLoadingState(!1)}}handleStateChange(e){const t=JSON.stringify({filters:e.filters,role:e.role});t!==this.lastStateKey&&(console.log("Filters changed:",e.filters),this.lastStateKey=t,this.currentFilters=e.filters,this.currentRole=e.role,this.loadEntries())}shouldReload(e){return e.filters!==this.currentFilters||e.role!==this.currentRole}async loadEntries(){try{d.setLoading(!0),this.updateLoadingState(!0);const{role:e,filters:t}=d.getState();let a=E(f,"timeEntries");const r=[];switch(t.status?.toLowerCase()){case"approved":r.push(g("managerApproved","==",!0));break;case"pending":r.push(g("needsApproval","==",!0));break;case"rejected":r.push(g("managerApproved","==",!1)),r.push(g("isSubmitted","==",!0));break}r.push(I("date","desc"));const s=b(a,...r);let i=(await v(s)).docs.map(l=>({id:l.id,...l.data()}));if(i.length>0){const l=[...new Set(i.map(c=>c.userId))],h={};for(let c=0;c<l.length;c+=10){const A=l.slice(c,c+10),D=b(E(f,"users"),g("__name__","in",A));(await v(D)).forEach(C=>{h[C.id]=C.data().email})}i=i.map(c=>({...c,workerEmail:h[c.userId]||"Unknown"}))}this.entries=i,console.log("Loaded entries:",i.length,i[0]),this.render()}catch(e){console.error("Failed to load time entries:",e),p.showNotification("Failed to load time entries","error")}finally{d.setLoading(!1),this.updateLoadingState(!1)}}async render(){if(!this.container)throw new Error("Container not found");n.removeAllChildren(this.container);const e=this.createFiltersSection();this.container.appendChild(e);const t=this.groupEntriesByWeek(this.entries),a=n.createElement("div",{className:"space-y-6"});t.forEach((r,s)=>{const o=this.createWeekContainer(s,r);a.appendChild(o)}),this.container.appendChild(a)}createTableHeader(){const e=n.createElement("tr");return["Date","Worker","Hours","Type","Status","Actions"].forEach(a=>{const r=n.createElement("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",text:a});e.appendChild(r)}),e}createFiltersSection(){const{filters:e}=d.getState(),t=n.createElement("div",{className:"mb-6 p-4 bg-white rounded-lg shadow"}),a=n.createElement("select",{className:"mr-4 px-3 py-2 border rounded"});["Pending","Approved","Rejected","All"].forEach(l=>{const h=n.createElement("option",{text:l,value:l.toLowerCase(),attributes:{selected:e.status===l.toLowerCase()}});a.appendChild(h)});const r=n.createElement("div",{className:"flex items-center space-x-4"}),s=n.createElement("input",{className:"px-3 py-2 border rounded",attributes:{type:"date",value:e.dateRange.startDate?new Date(e.dateRange.startDate).toISOString().split("T")[0]:""}}),o=n.createElement("input",{className:"px-3 py-2 border rounded",attributes:{type:"date",value:e.dateRange.endDate?new Date(e.dateRange.endDate).toISOString().split("T")[0]:""}}),i=n.createElement("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",text:"Apply Filters"});return i.addEventListener("click",()=>{const l={status:a.value,dateRange:{startDate:s.value?new Date(s.value):null,endDate:o.value?new Date(o.value):null}};console.log("Apply button clicked, sending filters:",l),d.updateFilters(l)}),r.append(s,o),t.append(a,r,i),t}renderEntries(){const e=this.container.querySelector("tbody");if(!e)return;n.removeAllChildren(e);const{user:t,settings:a}=d.getState();this.entries.forEach(r=>{const s=this.createEntryRow(r,t,a);e.appendChild(s)})}createEntryRow(e,t,a){const r=n.createElement("tr",{className:"hover:bg-gray-50"});r.appendChild(n.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:w.formatDate(new Date(e.date))})),r.appendChild(n.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.workerEmail||e.userId})),r.appendChild(n.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.hours.toString()})),r.appendChild(n.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.type||"Regular"}));const s=n.createElement("td",{className:"px-6 py-4 whitespace-nowrap"});let o;e.managerApproved?o="Approved":e.needsApproval?o="Pending Approval":e.isSubmitted?o="Submitted":o="Pending";const i=n.createElement("span",{className:`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getStatusBadgeClass(o)}`,text:o});s.appendChild(i),r.appendChild(s);const l=n.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium"});if(console.log("Action cell check:",{hasPermission:u.hasPermission(a,u.PERMISSIONS.APPROVE_TIME),needsApproval:e.needsApproval,managerApproved:e.managerApproved,userSettings:a,entry:e}),u.hasPermission(a,u.PERMISSIONS.APPROVE_TIME)&&e.needsApproval&&!e.managerApproved){const h=n.createElement("button",{className:"text-green-600 hover:text-green-900 mr-4",text:"Approve"});h.addEventListener("click",()=>this.updateStatus(e.id,!0));const c=n.createElement("button",{className:"text-red-600 hover:text-red-900",text:"Reject"});c.addEventListener("click",()=>this.updateStatus(e.id,!1)),l.append(h,c)}return r.appendChild(l),r}async updateStatus(e,t){try{const{user:a}=d.getState(),r=x(f,"timeEntries",e);await k(r,{managerApproved:t,needsApproval:!1,updatedAt:R.now(),updatedBy:a.uid}),await this.loadEntries(),p.showNotification(`Entry ${t?"approved":"rejected"} successfully`,"success")}catch(a){console.error("Error updating status:",a),p.showNotification("Failed to update entry status","error")}}getStatusBadgeClass(e){switch(e.toLowerCase()){case"approved":return"bg-green-100 text-green-800";case"pending approval":return"bg-yellow-100 text-yellow-800";case"submitted":return"bg-blue-100 text-blue-800";default:return"bg-gray-100 text-gray-800"}}updateLoadingState(e){if(!this.container)return;const t=this.container.querySelector(".loading-overlay");if(e&&!t){const a=n.createElement("div",{className:"loading-overlay"}),r=n.createElement("div",{className:"spinner"});a.appendChild(r),this.container.appendChild(a)}else!e&&t&&t.remove()}groupEntriesByWeek(e){const t=new Map;return e.forEach(a=>{const r=new Date(a.date),s=w.formatDate(w.getWeekStart(r));t.has(s)||t.set(s,{entries:[],totals:{regularHours:0,overtimeHours:0,ptoHours:0}});const o=t.get(s);if(o.entries.push(a),a.isTimeOff)a.timeOffType==="paid"&&(o.totals.ptoHours+=a.hours||0);else{const i=a.hours||0;i>8?(o.totals.regularHours+=8,o.totals.overtimeHours+=i-8):o.totals.regularHours+=i}}),t}createWeekContainer(e,t){const a=n.createElement("div",{className:"bg-white rounded-lg shadow overflow-hidden"}),{week:r,year:s}=this.getWeekNumber(new Date(e)),o=n.createElement("div",{className:"p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50"}),i=n.createElement("h3",{className:"text-lg font-medium text-gray-900",text:`Week ${r}, ${s}`}),l=n.createElement("div",{className:"text-sm text-gray-600",text:`Regular: ${t.totals.regularHours}h | OT: ${t.totals.overtimeHours}h | PTO: ${t.totals.ptoHours}h`});o.append(i,l),a.appendChild(o);const h=this.createWeekTable(t.entries);return a.appendChild(h),a}createWeekTable(e){const t=n.createElement("div",{className:"overflow-x-auto"}),a=n.createElement("table",{className:"min-w-full divide-y divide-gray-200 table-fixed"}),r=n.createElement("thead",{className:"bg-gray-50"});r.appendChild(this.createTableHeader()),a.appendChild(r);const s=n.createElement("tbody",{className:"bg-white divide-y divide-gray-200"});return[...e].sort((i,l)=>new Date(l.date)-new Date(i.date)).forEach(i=>{const l=this.createEntryRow(i,d.getState().user,d.getState().settings);s.appendChild(l)}),a.appendChild(s),t.appendChild(a),t}getWeekNumber(e){const t=new Date(e);t.setHours(0,0,0,0);const a=new Date(t.getFullYear(),0,1),r=new Date(a);if(r.setDate(a.getDate()+(7-a.getDay())%7),t<r)return{week:1,year:t.getFullYear()};const s=Math.floor((t-r)/(24*60*60*1e3));return{week:Math.floor(s/7)+2,year:t.getFullYear()}}destroy(){d.unsubscribe("timeEntriesTable"),this.container=null,this.initialized=!1}}class T{constructor(){this.dashboardState=d,this.components={userManagement:null,timeEntriesTable:null,invoiceGenerator:null},this.initialize=this.initialize.bind(this),this.loadUserData=this.loadUserData.bind(this),this.renderDashboard=this.renderDashboard.bind(this)}async initialize(){try{console.log("Initializing AdminDashboard...");const e=m.currentUser;if(!e)throw console.error("No authenticated user"),new Error("No authenticated user");return await this.loadUserData(e.uid),await this.renderDashboard(),!0}catch(e){throw console.error("Failed to initialize dashboard:",e),e}}async loadUserData(e){try{console.log("Fetching user data for:",e);const t=await S(x(f,"users",e));if(!t.exists())throw console.error("No user document found"),new Error("User document not found");const a=t.data(),r=u.getDefaultPermissions(a.role);this.dashboardState.setState({user:m.currentUser,role:a.role,assignedWorkers:a.assignedWorkers||[],settings:r,isInitialized:!0}),console.log("User role and settings loaded:",{role:a.role,settings:r})}catch(t){throw console.error("Error loading user data:",t),p.showNotification("Failed to load user data","error"),t}}async renderDashboard(){console.log("Rendering dashboard...");const e=document.getElementById("adminDashboard");if(!e)throw new Error("Admin dashboard container not found");e.style.display="block",n.removeAllChildren(e);const t=this.createHeader(),a=n.createElement("main",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"});e.appendChild(t),e.appendChild(a);const{role:r}=this.dashboardState.getState();console.log("Current user role:",r),u.hasAccess(r,[u.ROLES.SUPER_ADMIN,u.ROLES.MANAGER])&&await this.renderAdminSections(a)}createHeader(){const e=n.createElement("header",{className:"bg-white shadow mb-6"}),{user:t}=this.dashboardState.getState(),a=n.createElement("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"}),r=n.createElement("h1",{text:`Welcome, ${t?.email}`,className:"text-3xl font-bold text-gray-900"}),s=n.createElement("button",{text:"Logout",className:"px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"});return s.addEventListener("click",async()=>{try{await m.signOut(),window.location.reload()}catch(o){console.error("Error signing out:",o),p.showNotification("Failed to sign out","error")}}),a.append(r,s),e.appendChild(a),e}async renderAdminSections(e){try{console.log("Rendering admin sections...");const t=this.createSection("User Management","userManagementContent"),a=t.querySelector('[id="userManagementContent"]');a&&(this.components.userManagement=new N(a)),e.appendChild(t);const r=this.createSection("Time Entries","timeEntriesContent"),s=r.querySelector('[id="timeEntriesContent"]');s&&(this.components.timeEntriesTable=new F(s)),e.appendChild(r);const o=this.createSection("Invoice Generator","invoiceGeneratorContent"),i=o.querySelector('[id="invoiceGeneratorContent"]');if(i){const{companies:l=[]}=this.dashboardState.getState();this.components.invoiceGenerator=new L(l),this.components.invoiceGenerator.render(i)}e.appendChild(o)}catch(t){console.error("Error rendering admin sections:",t),p.showNotification("Failed to render dashboard sections","error")}}createSection(e,t){console.log(`Creating section: ${e}`);const a=n.createElement("div",{className:"bg-white shadow rounded-lg mb-6"}),r=n.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),s=n.createElement("h2",{text:e,className:"text-lg font-medium text-gray-900"}),o=n.createElement("div",{attributes:{id:t},className:"px-4 py-5 sm:p-6 section-content"});return r.appendChild(s),a.appendChild(r),a.appendChild(o),a}getContentElements(e){return{userManagementContent:document.getElementById("userManagementContent"),timeEntriesContent:document.getElementById("timeEntriesContent"),invoiceGeneratorContent:document.getElementById("invoiceGeneratorContent")}}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="/"}showError(e){p.showNotification(e,"error")}}class z{constructor(){this.initialized=!1,this.setupAuthListener()}setupAuthListener(){M(m,async e=>{console.log("Auth: ",e?"User authenticated":"No user");const t=document.getElementById("appLoading"),a=document.getElementById("authContainer"),r=document.getElementById("adminDashboard");if(t&&(t.style.display="none",console.log("Loading screen hidden")),e)try{if(console.log("Loading user data..."),!await this.loadUserData(e))throw new Error("No user data found");a&&(a.classList.remove("active"),a.style.display="none"),r&&(r.style.display="block")}catch(s){console.error("Error loading user data:",s),await this.logout()}else a&&(a.style.display="block",a.classList.add("active")),r&&(r.style.display="none"),console.log("No user, showing login form")})}async login(e,t){try{console.log("Attempting login...");const a=await B(m,e,t);console.log("Firebase Auth successful, loading user data...");const r=await this.loadUserData(a.user);if(!r)throw console.error("No user data found"),new Error("No user data found");if(console.log("Verifying admin access...",r.role),!this.verifyAdminAccess(r.role))throw console.error("User does not have admin access"),await this.logout(),new Error("Unauthorized access. Admin privileges required.");return console.log("Login successful!"),r}catch(a){console.error("Login error:",a);const r=this.getLoginErrorMessage(a);throw p.showNotification(r,"error"),a}}async loadUserData(e){try{let t=null;const a=x(f,"users",e.uid),r=await S(a);if(r.exists())t={id:r.id,...r.data()};else{const s=E(f,"users"),o=b(s,g("email","==",e.email)),i=await v(o);i.empty||(t={id:i.docs[0].id,...i.docs[0].data()})}if(!t)throw new Error("User data not found");return d.updateUserData({user:e,role:t.role,assignedWorkers:t.assignedWorkers||[],settings:t.settings||u.getDefaultPermissions(t.role)}),this.updateUIForAuthenticatedUser(e.email),t}catch(t){throw console.error("Error loading user data:",t),t}}verifyAdminAccess(e){return[u.ROLES.SUPER_ADMIN,u.ROLES.MANAGER].includes(e)}async logout(){try{await U(m),d.reset(),this.redirectToLogin()}catch(e){console.error("Logout error:",e),p.showNotification("Failed to logout. Please try again.","error")}}updateUIForAuthenticatedUser(e){const t=document.getElementById("authContainer"),a=document.getElementById("adminDashboard"),r=document.getElementById("adminEmail");t&&t.classList.remove("active"),a&&(a.style.display="block"),r&&(r.textContent=e)}getLoginErrorMessage(e){switch(e.code){case"auth/invalid-email":return"Invalid email address format.";case"auth/user-disabled":return"This account has been disabled. Please contact support.";case"auth/user-not-found":return"No account found with this email.";case"auth/wrong-password":return"Invalid password.";case"auth/too-many-requests":return"Too many failed attempts. Please try again later.";default:return e.message||"An error occurred during login."}}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="./"}async verifySession(){const e=m.currentUser;if(!e)return!1;try{return await e.getIdToken(!0),!0}catch(t){return console.error("Session verification failed:",t),!1}}getAuthStatus(){const{user:e,role:t,isInitialized:a}=d.getState();return{isAuthenticated:!!e,isAdmin:this.verifyAdminAccess(t),isInitialized:a,user:e}}}if(!d)throw console.error("DashboardState not initialized"),new Error("DashboardState not initialized");class O{constructor(){this.adminDashboard=null,this.authManager=new z}async initialize(){try{console.log("Initializing Admin App..."),this.setupEventListeners(),this.setupAuthStateListener(),this.setupErrorHandling()}catch(e){console.error("Failed to initialize admin app:",e),this.showError("Application initialization failed.")}}setupAuthStateListener(){m.onAuthStateChanged(async e=>{console.log("Auth state changed:",e?"User authenticated":"No user");const t=document.getElementById("appLoading"),a=document.getElementById("authContainer"),r=document.getElementById("adminDashboard");t&&(t.style.display="none"),e?(console.log("User authenticated:",e.email),a&&(a.style.display="none"),r&&(r.style.display="block"),await this.initializeDashboard(e)):(console.log("No user, showing login form"),a&&(a.style.display="block"),r&&(r.style.display="none"))})}setupEventListeners(){const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async a=>{a.preventDefault();const r=document.getElementById("email").value,s=document.getElementById("password").value;try{await this.authManager.login(r,s)}catch{}});const t=document.getElementById("logoutBtn");t&&t.addEventListener("click",()=>this.authManager.logout())}async initializeDashboard(e){try{this.adminDashboard=new T,await this.adminDashboard.initialize()}catch(t){console.error("Failed to initialize dashboard:",t),this.showError("Failed to initialize dashboard.")}}setupErrorHandling(){window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason),this.showError("An unexpected error occurred.")}),window.addEventListener("error",e=>{console.error("Global error:",e.error),this.showError("An unexpected error occurred.")})}showError(e){const t=document.getElementById("errorBoundary"),a=document.getElementById("errorMessage");t&&a&&(t.style.display="flex",a.textContent=e)}}document.addEventListener("DOMContentLoaded",()=>{new O().initialize()});
