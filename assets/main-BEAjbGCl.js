import{d,a as s,b as h,R as l,U as f,I as y}from"./vendor-components-WfS410Go.js";import{j as g,e as p,o as w,k as E,c as b,q as v,w as A,b as x,l as D}from"./vendor-firebase-Ciht_zlW.js";import{D as n,A as m}from"./vendor-utils-B8p85eXh.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();class L{constructor(){this.dashboardState=d,this.userManagement=null,this.timeEntriesTable=null,this.invoiceGenerator=null}async initialize(){try{const e=s.currentUser;if(!e)throw new Error("No authenticated user");return await this.loadUserData(e.uid),!0}catch(e){throw console.error("Failed to initialize dashboard:",e),e}}async loadUserData(e){try{console.log("Fetching user data for:",e);const t=await g(p(h,"users",e));if(!t.exists()){console.error("No user document found"),this.redirectToLogin();return}const o=t.data();this.dashboardState.setState({user:s.currentUser,role:o.role,assignedWorkers:o.assignedWorkers||[],settings:o.settings||{},isInitialized:!0}),console.log("User role loaded:",o.role),this.renderDashboard()}catch(t){console.error("Error loading user data:",t),this.showError("Failed to load user data. Please refresh the page.")}}renderDashboard(){const e=document.getElementById("adminDashboard");if(!e)throw new Error("Admin dashboard container not found.");n.removeAllChildren(e);const t=n.createElement("main",{className:"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"});e.appendChild(t);const{role:o}=this.dashboardState.getState();if(l.hasAccess(o,["super-admin"])){const r=this.createUserManagementSection(),a=this.createInvoiceSection();t.append(r,a),this.userManagement.render()}}createHeaderContent(){const{user:e}=this.dashboardState.getState(),t=n.createElement("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"}),o=n.createElement("h1",{text:`Welcome, ${e?.email}`,className:"text-3xl font-bold text-gray-900"}),r=n.createElement("button",{text:"Logout",className:"btn-secondary"});return r.addEventListener("click",()=>s.signOut()),t.append(o,r),t}createTimeEntriesSection(){const e=n.createElement("div",{className:"bg-white shadow rounded-lg mb-6"}),t=n.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),o=n.createElement("h2",{text:"Time Entries",className:"text-lg font-medium text-gray-900"});t.appendChild(o),e.appendChild(t);const r=n.createElement("div",{id:"timeEntriesContainer",className:"px-4 py-5 sm:p-6"});return e.appendChild(r),e}createUserManagementSection(){const e=n.createElement("div",{className:"bg-white shadow rounded-lg mb-6"}),t=n.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),o=n.createElement("h2",{text:"User Management",className:"text-lg font-medium text-gray-900"});t.appendChild(o),e.appendChild(t);const r=n.createElement("div",{id:"userManagementContainer",className:"px-4 py-5 sm:p-6"});return e.appendChild(r),this.userManagement=new f("userManagementContainer"),e}createInvoiceSection(){const e=n.createElement("div",{className:"bg-white shadow rounded-lg"}),t=n.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),o=n.createElement("h2",{text:"Invoice Generator",className:"text-lg font-medium text-gray-900"});t.appendChild(o),e.appendChild(t);const r=n.createElement("div",{id:"invoiceGeneratorContainer",className:"px-4 py-5 sm:p-6"});e.appendChild(r);const{companies:a=[]}=this.dashboardState.getState();return this.invoiceGenerator=new y(a),this.invoiceGenerator.render(r),e}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="/"}showError(e){m.showNotification(e,"error")}}class S{constructor(){this.initialized=!1,this.setupAuthListener()}setupAuthListener(){console.log("Setting up auth listener..."),w(s,async e=>{console.log("Auth state changed:",e?"User logged in":"No user");const t=document.getElementById("appLoading"),o=document.getElementById("authContainer"),r=document.getElementById("adminDashboard");if(t&&(t.style.display="none",console.log("Loading screen hidden")),e)try{if(console.log("Loading user data..."),!await this.loadUserData(e))throw new Error("No user data found");o&&(o.classList.remove("active"),o.style.display="none"),r&&(r.style.display="block")}catch(a){console.error("Error loading user data:",a),await this.logout()}else o&&(o.style.display="block",o.classList.add("active")),r&&(r.style.display="none"),console.log("No user, showing login form")})}async login(e,t){try{console.log("Attempting login...");const o=await E(s,e,t);console.log("Firebase Auth successful, loading user data...");const r=await this.loadUserData(o.user);if(!r)throw console.error("No user data found"),new Error("No user data found");if(console.log("Verifying admin access...",r.role),!this.verifyAdminAccess(r.role))throw console.error("User does not have admin access"),await this.logout(),new Error("Unauthorized access. Admin privileges required.");return console.log("Login successful!"),r}catch(o){console.error("Login error:",o);const r=this.getLoginErrorMessage(o);throw m.showNotification(r,"error"),o}}async loadUserData(e){try{let t=null;const o=p(h,"users",e.uid),r=await g(o);if(r.exists())t={id:r.id,...r.data()};else{const a=b(h,"users"),i=v(a,A("email","==",e.email)),u=await x(i);u.empty||(t={id:u.docs[0].id,...u.docs[0].data()})}if(!t)throw new Error("User data not found");return d.updateUserData({user:e,role:t.role,assignedWorkers:t.assignedWorkers||[],settings:t.settings||l.getDefaultPermissions(t.role)}),this.updateUIForAuthenticatedUser(e.email),t}catch(t){throw console.error("Error loading user data:",t),t}}verifyAdminAccess(e){return[l.ROLES.SUPER_ADMIN,l.ROLES.MANAGER].includes(e)}async logout(){try{await D(s),d.reset(),this.redirectToLogin()}catch(e){console.error("Logout error:",e),m.showNotification("Failed to logout. Please try again.","error")}}updateUIForAuthenticatedUser(e){const t=document.getElementById("authContainer"),o=document.getElementById("adminDashboard"),r=document.getElementById("adminEmail");t&&t.classList.remove("active"),o&&(o.style.display="block"),r&&(r.textContent=e)}getLoginErrorMessage(e){switch(e.code){case"auth/invalid-email":return"Invalid email address format.";case"auth/user-disabled":return"This account has been disabled. Please contact support.";case"auth/user-not-found":return"No account found with this email.";case"auth/wrong-password":return"Invalid password.";case"auth/too-many-requests":return"Too many failed attempts. Please try again later.";default:return e.message||"An error occurred during login."}}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="./"}async verifySession(){const e=s.currentUser;if(!e)return!1;try{return await e.getIdToken(!0),!0}catch(t){return console.error("Session verification failed:",t),!1}}getAuthStatus(){const{user:e,role:t,isInitialized:o}=d.getState();return{isAuthenticated:!!e,isAdmin:this.verifyAdminAccess(t),isInitialized:o,user:e}}}if(!d)throw console.error("DashboardState not initialized"),new Error("DashboardState not initialized");class N{constructor(){this.adminDashboard=null,this.authManager=new S}async initialize(){try{console.log("Initializing Admin App..."),this.setupEventListeners(),this.setupAuthStateListener(),this.setupErrorHandling()}catch(e){console.error("Failed to initialize admin app:",e),this.showError("Application initialization failed.")}}setupAuthStateListener(){s.onAuthStateChanged(async e=>{console.log("Auth state changed:",e?"User authenticated":"No user");const t=document.getElementById("appLoading"),o=document.getElementById("authContainer"),r=document.getElementById("adminDashboard");t&&(t.style.display="none"),e?(console.log("User authenticated:",e.email),o&&(o.style.display="none"),r&&(r.style.display="block"),await this.initializeDashboard(e)):(console.log("No user, showing login form"),o&&(o.style.display="block"),r&&(r.style.display="none"))})}setupEventListeners(){const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async o=>{o.preventDefault();const r=document.getElementById("email").value,a=document.getElementById("password").value;try{await this.authManager.login(r,a)}catch{}});const t=document.getElementById("logoutBtn");t&&t.addEventListener("click",()=>this.authManager.logout())}async initializeDashboard(e){try{this.adminDashboard=new L,await this.adminDashboard.initialize()}catch(t){console.error("Failed to initialize dashboard:",t),this.showError("Failed to initialize dashboard.")}}setupErrorHandling(){window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason),this.showError("An unexpected error occurred.")}),window.addEventListener("error",e=>{console.error("Global error:",e.error),this.showError("An unexpected error occurred.")})}showError(e){const t=document.getElementById("errorBoundary"),o=document.getElementById("errorMessage");t&&o&&(t.style.display="flex",o.textContent=e)}}document.addEventListener("DOMContentLoaded",()=>{new N().initialize()});
