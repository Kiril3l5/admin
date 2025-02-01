import{d,a as y,R as h,b as u,U as v,I as C}from"./vendor-components-DnukZakY.js";import{c as E,w as g,o as S,q as w,b,e as f,u as N,T as D,j as x,k as A,l as L,m as I}from"./vendor-firebase-q4K5YV9j.js";import{A as p,D as s,a as R}from"./vendor-utils-B8p85eXh.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}})();class B{constructor(){this.container=null,this.entries=[],this.lastDoc=null,this.hasMore=!1,this.cleanup=()=>{d.unsubscribe("timeEntriesTable")},d.subscribe("timeEntriesTable",this.handleStateChange.bind(this))}handleStateChange(e){(e.filters!==this.currentFilters||e.role!==this.currentRole)&&(this.currentFilters=e.filters,this.currentRole=e.role,this.loadEntries())}async loadEntries(){try{d.setLoading(!0),this.updateLoadingState(!0);const{role:e,user:a,assignedWorkers:r,filters:t}=d.getState();let n=E(y,"timeEntries");const o=[];e===h.ROLES.MANAGER&&r?.length>0&&o.push(g("workerId","in",r)),t.status&&t.status!=="all"&&o.push(g("status","==",t.status)),t.dateRange.startDate&&t.dateRange.endDate&&(o.push(g("date",">=",t.dateRange.startDate)),o.push(g("date","<=",t.dateRange.endDate))),o.push(S("date","desc"));const i=w(n,...o),l=await b(i);this.entries=l.docs.map(c=>({id:c.id,...c.data()})),this.renderEntries()}catch(e){console.error("Failed to load time entries:",e),p.showNotification("Failed to load time entries","error")}finally{d.setLoading(!1),this.updateLoadingState(!1)}}async render(e){if(!e)throw new Error("Container is required");this.container=e;const a=this.createTableStructure();e.appendChild(a),await this.loadEntries()}createTableStructure(){const e=s.createElement("div",{className:"overflow-x-auto"}),a=this.createFiltersSection();e.appendChild(a);const r=s.createElement("table",{className:"min-w-full divide-y divide-gray-200"}),t=s.createElement("thead",{className:"bg-gray-50"});t.appendChild(this.createTableHeader()),r.appendChild(t);const n=s.createElement("tbody",{className:"bg-white divide-y divide-gray-200"});return r.appendChild(n),e.appendChild(r),e}createTableHeader(){const e=s.createElement("tr");return["Date","Worker","Hours","Type","Status","Actions"].forEach(r=>{const t=s.createElement("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",text:r});e.appendChild(t)}),e}createFiltersSection(){const{filters:e}=d.getState(),a=s.createElement("div",{className:"mb-6 p-4 bg-white rounded-lg shadow"}),r=s.createElement("select",{className:"mr-4 px-3 py-2 border rounded"});["All","Pending","Approved","Rejected"].forEach(l=>{const c=s.createElement("option",{text:l,value:l.toLowerCase(),attributes:{selected:e.status===l.toLowerCase()}});r.appendChild(c)});const t=s.createElement("div",{className:"flex items-center space-x-4"}),n=s.createElement("input",{className:"px-3 py-2 border rounded",attributes:{type:"date",value:e.dateRange.startDate?.toISOString().split("T")[0]||""}}),o=s.createElement("input",{className:"px-3 py-2 border rounded",attributes:{type:"date",value:e.dateRange.endDate?.toISOString().split("T")[0]||""}}),i=s.createElement("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",text:"Apply Filters"});return i.addEventListener("click",()=>{d.updateFilters({status:r.value,dateRange:{startDate:n.value?new Date(n.value):null,endDate:o.value?new Date(o.value):null}})}),t.append(n,o),a.append(r,t,i),a}renderEntries(){const e=this.container.querySelector("tbody");if(!e)return;s.removeAllChildren(e);const{user:a,settings:r}=d.getState();this.entries.forEach(t=>{const n=this.createEntryRow(t,a,r);e.appendChild(n)})}createEntryRow(e,a,r){const t=s.createElement("tr",{className:"hover:bg-gray-50"});t.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:R.formatDate(new Date(e.date))})),t.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.workerEmail||e.workerId})),t.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.hours.toString()})),t.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.type||"Regular"}));const n=s.createElement("td",{className:"px-6 py-4 whitespace-nowrap"}),o=s.createElement("span",{className:`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getStatusBadgeClass(e.status)}`,text:e.status||"Pending"});n.appendChild(o),t.appendChild(n);const i=s.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium"});if(h.hasPermission(r,h.PERMISSIONS.APPROVE_TIME))if(e.status==="pending"){const l=s.createElement("button",{className:"text-green-600 hover:text-green-900 mr-4",text:"Approve"});l.addEventListener("click",()=>this.updateStatus(e.id,"approved"));const c=s.createElement("button",{className:"text-red-600 hover:text-red-900",text:"Reject"});c.addEventListener("click",()=>this.updateStatus(e.id,"rejected")),i.append(l,c)}else{const l=s.createElement("button",{className:"text-blue-600 hover:text-blue-900",text:"Reset Status"});l.addEventListener("click",()=>this.updateStatus(e.id,"pending")),i.appendChild(l)}return t.appendChild(i),t}async updateStatus(e,a){try{const{user:r}=d.getState(),t=f(y,"timeEntries",e);await N(t,{status:a,updatedAt:D.now(),updatedBy:r.uid}),await this.loadEntries(),p.showNotification(`Entry ${a} successfully`,"success")}catch(r){console.error("Error updating status:",r),p.showNotification("Failed to update entry status","error")}}getStatusBadgeClass(e){switch(e?.toLowerCase()){case"approved":return"bg-green-100 text-green-800";case"rejected":return"bg-red-100 text-red-800";default:return"bg-yellow-100 text-yellow-800"}}updateLoadingState(e){const a=this.container.querySelector(".loading-overlay");if(e&&!a){const r=s.createElement("div",{className:"loading-overlay"}),t=s.createElement("div",{className:"spinner"});r.appendChild(t),this.container.appendChild(r)}else!e&&a&&a.remove()}destroy(){this.cleanup&&this.cleanup()}}class M{constructor(){this.dashboardState=d,this.userManagement=null,this.timeEntriesTable=null,this.invoiceGenerator=null}async loadUserData(e){try{console.log("Fetching user data for:",e);const a=await x(f(y,"users",e));if(!a.exists()){console.error("No user document found"),this.redirectToLogin();return}const r=a.data();this.dashboardState.setState({user:u.currentUser,role:r.role,assignedWorkers:r.assignedWorkers||[],settings:r.settings||{},isInitialized:!0}),console.log("User role loaded:",r.role),this.renderDashboard()}catch(a){console.error("Error loading user data:",a),this.showError("Failed to load user data. Please refresh the page.")}}renderDashboard(){const e=document.getElementById("adminDashboard");if(!e)throw new Error("Admin dashboard container not found.");s.removeAllChildren(e);const a=s.createElement("div",{className:"bg-white shadow"}),r=this.createHeaderContent();a.appendChild(r),e.appendChild(a);const t=s.createElement("main",{className:"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"}),n=this.createTimeEntriesSection();t.appendChild(n);const{role:o}=this.dashboardState.getState();if(h.hasAccess(o,["super-admin"])){const i=this.createUserManagementSection(),l=this.createInvoiceSection();t.append(i,l)}e.appendChild(t)}createHeaderContent(){const{user:e}=this.dashboardState.getState(),a=s.createElement("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"}),r=s.createElement("h1",{text:`Welcome, ${e?.email}`,className:"text-3xl font-bold text-gray-900"}),t=s.createElement("button",{text:"Logout",className:"btn-secondary"});return t.addEventListener("click",()=>u.signOut()),a.append(r,t),a}createTimeEntriesSection(){const e=s.createElement("div",{className:"bg-white shadow rounded-lg mb-6"}),a=s.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),r=s.createElement("h2",{text:"Time Entries",className:"text-lg font-medium text-gray-900"});a.appendChild(r),e.appendChild(a);const t=s.createElement("div",{id:"timeEntriesContainer",className:"px-4 py-5 sm:p-6"});return e.appendChild(t),this.timeEntriesTable=new B,this.timeEntriesTable.render(t),e}createUserManagementSection(){const e=s.createElement("div",{className:"bg-white shadow rounded-lg mb-6"}),a=s.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),r=s.createElement("h2",{text:"User Management",className:"text-lg font-medium text-gray-900"});a.appendChild(r),e.appendChild(a);const t=s.createElement("div",{id:"userManagementContainer",className:"px-4 py-5 sm:p-6"});return e.appendChild(t),this.userManagement=new v("userManagementContainer"),this.userManagement.render(),e}createInvoiceSection(){const e=s.createElement("div",{className:"bg-white shadow rounded-lg"}),a=s.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),r=s.createElement("h2",{text:"Invoice Generator",className:"text-lg font-medium text-gray-900"});a.appendChild(r),e.appendChild(a);const t=s.createElement("div",{id:"invoiceGeneratorContainer",className:"px-4 py-5 sm:p-6"});e.appendChild(t);const{companies:n}=this.dashboardState.getState();return this.invoiceGenerator=new C(n),this.invoiceGenerator.render(t),e}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="/"}showError(e){p.showNotification(e,"error")}}class U{constructor(){this.initialized=!1,this.setupAuthListener()}setupAuthListener(){console.log("Setting up auth listener..."),A(u,async e=>{console.log("Auth state changed:",e?"User logged in":"No user");const a=document.getElementById("appLoading"),r=document.getElementById("authContainer"),t=document.getElementById("adminDashboard");if(a&&(a.style.display="none",console.log("Loading screen hidden")),e)try{if(console.log("Loading user data..."),!await this.loadUserData(e))throw new Error("No user data found");r&&(r.classList.remove("active"),r.style.display="none"),t&&(t.style.display="block")}catch(n){console.error("Error loading user data:",n),await this.logout()}else r&&(r.style.display="block",r.classList.add("active")),t&&(t.style.display="none"),console.log("No user, showing login form")})}async login(e,a){try{console.log("Attempting login...");const r=await L(u,e,a);console.log("Firebase Auth successful, loading user data...");const t=await this.loadUserData(r.user);if(!t)throw console.error("No user data found"),new Error("No user data found");if(console.log("Verifying admin access...",t.role),!this.verifyAdminAccess(t.role))throw console.error("User does not have admin access"),await this.logout(),new Error("Unauthorized access. Admin privileges required.");return console.log("Login successful!"),t}catch(r){console.error("Login error:",r);const t=this.getLoginErrorMessage(r);throw p.showNotification(t,"error"),r}}async loadUserData(e){try{let a=null;const r=f(y,"users",e.uid),t=await x(r);if(t.exists())a={id:t.id,...t.data()};else{const n=E(y,"users"),o=w(n,g("email","==",e.email)),i=await b(o);i.empty||(a={id:i.docs[0].id,...i.docs[0].data()})}if(!a)throw new Error("User data not found");return d.updateUserData({user:e,role:a.role,assignedWorkers:a.assignedWorkers||[],settings:a.settings||h.getDefaultPermissions(a.role)}),this.updateUIForAuthenticatedUser(e.email),a}catch(a){throw console.error("Error loading user data:",a),a}}verifyAdminAccess(e){return[h.ROLES.SUPER_ADMIN,h.ROLES.MANAGER].includes(e)}async logout(){try{await I(u),d.reset(),this.redirectToLogin()}catch(e){console.error("Logout error:",e),p.showNotification("Failed to logout. Please try again.","error")}}updateUIForAuthenticatedUser(e){const a=document.getElementById("authContainer"),r=document.getElementById("adminDashboard"),t=document.getElementById("adminEmail");a&&a.classList.remove("active"),r&&(r.style.display="block"),t&&(t.textContent=e)}getLoginErrorMessage(e){switch(e.code){case"auth/invalid-email":return"Invalid email address format.";case"auth/user-disabled":return"This account has been disabled. Please contact support.";case"auth/user-not-found":return"No account found with this email.";case"auth/wrong-password":return"Invalid password.";case"auth/too-many-requests":return"Too many failed attempts. Please try again later.";default:return e.message||"An error occurred during login."}}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="./"}async verifySession(){const e=u.currentUser;if(!e)return!1;try{return await e.getIdToken(!0),!0}catch(a){return console.error("Session verification failed:",a),!1}}getAuthStatus(){const{user:e,role:a,isInitialized:r}=d.getState();return{isAuthenticated:!!e,isAdmin:this.verifyAdminAccess(a),isInitialized:r,user:e}}}if(!d)throw console.error("DashboardState not initialized"),new Error("DashboardState not initialized");class T{constructor(){this.adminDashboard=null,this.authManager=new U}async initialize(){try{console.log("Initializing Admin App..."),this.setupEventListeners(),this.setupAuthStateListener(),this.setupErrorHandling()}catch(e){console.error("Failed to initialize admin app:",e),this.showError("Application initialization failed.")}}setupAuthStateListener(){u.onAuthStateChanged(async e=>{console.log("Auth state changed:",e?"User authenticated":"No user");const a=document.getElementById("appLoading"),r=document.getElementById("authContainer"),t=document.getElementById("adminDashboard");a&&(a.style.display="none"),e?(console.log("User authenticated:",e.email),r&&(r.style.display="none"),t&&(t.style.display="block"),await this.initializeDashboard(e)):(console.log("No user, showing login form"),r&&(r.style.display="block"),t&&(t.style.display="none"))})}setupEventListeners(){const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async r=>{r.preventDefault();const t=document.getElementById("email").value,n=document.getElementById("password").value;try{await this.authManager.login(t,n)}catch{}});const a=document.getElementById("logoutBtn");a&&a.addEventListener("click",()=>this.authManager.logout())}async initializeDashboard(e){try{this.adminDashboard=new M,await this.adminDashboard.initialize()}catch(a){console.error("Failed to initialize dashboard:",a),this.showError("Failed to initialize dashboard.")}}setupErrorHandling(){window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason),this.showError("An unexpected error occurred.")}),window.addEventListener("error",e=>{console.error("Global error:",e.error),this.showError("An unexpected error occurred.")})}showError(e){const a=document.getElementById("errorBoundary"),r=document.getElementById("errorMessage");a&&r&&(a.style.display="flex",r.textContent=e)}}document.addEventListener("DOMContentLoaded",()=>{new T().initialize()});
