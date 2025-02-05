import{d as u,a as E,R as h,b as f,U as k,I as L}from"./vendor-components-CVJ8IrUm.js";import{c as v,w as b,o as I,q as x,b as N,e as C,T as S,h as R,u as T,j as A,k as H,l as B,m as M}from"./vendor-firebase-q4K5YV9j.js";import{a as g,A as p,D as s}from"./vendor-utils-lm0uXl8i.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();class O{constructor(e){if(!e)throw new Error("Container element is required");this.container=e,this.entries=[],this.initialized=!1,this.init()}async init(){try{this.updateLoadingState(!0),await this.loadEntries(),u.subscribe("timeEntriesTable",e=>{this.handleStateChange(e)}),this.render(),this.initialized=!0}catch(e){console.error("Failed to initialize time entries table:",e),this.showError("Failed to load time entries")}finally{this.updateLoadingState(!1)}}handleStateChange(e){const t=JSON.stringify({filters:e.filters,role:e.role});t!==this.lastStateKey&&(console.log("Filters changed:",e.filters),this.lastStateKey=t,this.currentFilters=e.filters,this.currentRole=e.role,this.loadEntries())}shouldReload(e){return e.filters!==this.currentFilters||e.role!==this.currentRole}async loadEntries(){try{const{role:e,filters:t}=u.getState();console.log("Current filters:",t);let a=v(E,"timeEntries");const r=[];if(t.status&&t.status.toLowerCase()!=="all"){const l=t.status.toLowerCase();console.log("Adding status filter:",l),r.push(b("status","==",l))}if(t.dateRange.startDate&&t.dateRange.endDate){const l=g.formatDate(new Date(t.dateRange.startDate)),c=g.formatDate(new Date(t.dateRange.endDate));r.push(b("date",">=",l)),r.push(b("date","<=",c))}r.push(I("date","desc"));const o=x(a,...r),n=await N(o);console.log("Query returned entries:",n.size);let i=n.docs.map(l=>({id:l.id,...l.data()}));if(i.length>0){const l=[...new Set(i.map(d=>d.userId))],c={};for(let d=0;d<l.length;d+=10){const m=l.slice(d,d+10),w=x(v(E,"users"),b("__name__","in",m));(await N(w)).forEach(D=>{c[D.id]=D.data().email})}i=i.map(d=>({...d,workerEmail:c[d.userId]||"Unknown"}))}this.entries=i,this.render()}catch(e){console.error("Failed to load time entries:",e),p.showNotification("Failed to load time entries","error")}finally{u.setLoading(!1),this.updateLoadingState(!1)}}async render(){if(!this.container)throw new Error("Container not found");if(s.removeAllChildren(this.container),this.container.appendChild(this.createDashboardSummary()),this.container.appendChild(this.createFiltersSection()),console.log("Number of entries to render:",this.entries.length),this.entries.length===0){const a=s.createElement("div",{className:"text-center p-8 bg-white rounded-lg shadow",text:"No time entries found for the selected filters."});this.container.appendChild(a);return}const e=this.groupEntriesByWeekAndUser();if(console.log("Weekly data to render:",e),e.length===0){const a=s.createElement("div",{className:"text-center p-8 bg-white rounded-lg shadow",text:"No entries grouped by week found."});this.container.appendChild(a);return}const t=this.createWeeklySummary(e);this.container.appendChild(t)}createTableHeader(){const e=s.createElement("tr");return["Date","Worker","Hours","Type","Status","Actions"].forEach(a=>{const r=s.createElement("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",text:a});e.appendChild(r)}),e}createFiltersSection(){const{filters:e}=u.getState();console.log("Current filter state:",e);const t=s.createElement("div",{className:"mb-6 p-4 bg-white rounded-lg shadow"}),a=s.createElement("select",{className:"mr-4 px-3 py-2 border rounded"});[{value:"all",text:"All"},{value:"pending",text:"Pending"},{value:"approved",text:"Approved"},{value:"rejected",text:"Rejected"}].forEach(({value:l,text:c})=>{const d=s.createElement("option",{text:c,value:l,attributes:{selected:e.status?.toLowerCase()===l}});a.appendChild(d)});const r=s.createElement("div",{className:"flex items-center space-x-4"}),o=s.createElement("input",{className:"px-3 py-2 border rounded",attributes:{type:"date",value:e.dateRange.startDate?new Date(e.dateRange.startDate).toISOString().split("T")[0]:""}}),n=s.createElement("input",{className:"px-3 py-2 border rounded",attributes:{type:"date",value:e.dateRange.endDate?new Date(e.dateRange.endDate).toISOString().split("T")[0]:""}}),i=s.createElement("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",text:"Apply Filters"});return i.addEventListener("click",()=>{const l={status:a.value.toLowerCase(),dateRange:{startDate:o.value?new Date(o.value):null,endDate:n.value?new Date(n.value):null}};console.log("Applying new filters:",l),u.updateFilters(l)}),r.append(o,n),t.append(a,r,i),t}renderEntries(){const e=this.container.querySelector("tbody");if(!e)return;s.removeAllChildren(e);const{user:t,settings:a}=u.getState();this.entries.forEach(r=>{const o=this.createEntryRow(r,t,a);e.appendChild(o)})}createEntryRow(e,t,a){console.log("Creating row with settings:",a);const r=s.createElement("tr",{className:"hover:bg-gray-50"});r.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:g.formatDate(new Date(e.date))})),r.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.workerEmail||e.userId})),r.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.hours.toString()})),r.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.type||"Regular"}));const o=s.createElement("td",{className:"px-6 py-4 whitespace-nowrap"}),n=s.createElement("span",{className:`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getStatusBadgeClass(e.status)}`,text:e.status?e.status.charAt(0).toUpperCase()+e.status.slice(1):"Pending"});o.appendChild(n),r.appendChild(o);const i=s.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium"}),l=h.hasPermission(a,h.PERMISSIONS.APPROVE_TIME);if(console.log("Permission check:",{hasPermission:l,settings:a,permission:h.PERMISSIONS.APPROVE_TIME,status:e.status}),l&&(!e.status||e.status==="pending")){const c=s.createElement("button",{className:"text-green-600 hover:text-green-900 mr-4",text:"Approve"});c.addEventListener("click",()=>this.updateStatus(e.id,"approved"));const d=s.createElement("button",{className:"text-red-600 hover:text-red-900",text:"Reject"});d.addEventListener("click",()=>this.updateStatus(e.id,"rejected")),i.append(c,d)}return r.appendChild(i),r}async updateStatus(e,t){try{const{user:a}=u.getState(),r=C(E,"timeEntries",e),o={status:t,updatedAt:S.now(),updatedBy:a.uid,history:R({status:t,timestamp:S.now(),userId:a.uid})};await T(r,o),await this.loadEntries(),p.showNotification(`Time entry ${t} successfully`,"success")}catch(a){console.error("Error updating status:",a),p.showNotification("Failed to update status","error")}}getStatusBadgeClass(e){switch(e?.toLowerCase()){case"approved":return"bg-green-100 text-green-800";case"pending":return"bg-yellow-100 text-yellow-800";case"rejected":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}}updateLoadingState(e){if(!this.container)return;const t=this.container.querySelector(".loading-overlay");if(e&&!t){const a=s.createElement("div",{className:"loading-overlay"}),r=s.createElement("div",{className:"spinner"});a.appendChild(r),this.container.appendChild(a)}else!e&&t&&t.remove()}groupEntriesByWeek(e){const t=new Map;return e.forEach(a=>{const r=new Date(a.date),o=g.formatDate(g.getWeekStart(r));t.has(o)||t.set(o,{entries:[],totals:{regularHours:0,overtimeHours:0,ptoHours:0,pending:0,approved:0,rejected:0}});const n=t.get(o);if(n.entries.push(a),n.totals[a.status]=(n.totals[a.status]||0)+1,a.isTimeOff)a.timeOffType==="paid"&&(n.totals.ptoHours+=a.hours||0);else{const i=a.hours||0;i>8?(n.totals.regularHours+=8,n.totals.overtimeHours+=i-8):n.totals.regularHours+=i}}),t}createWeekContainer(e,t){const a=s.createElement("div",{className:"bg-white rounded-lg shadow overflow-hidden"}),{week:r,year:o}=this.getWeekNumber(new Date(e)),n=s.createElement("div",{className:"p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50"}),i=s.createElement("h3",{className:"text-lg font-medium text-gray-900",text:`Week ${r}, ${o}`}),l=s.createElement("div",{className:"text-sm text-gray-600",text:`Regular: ${t.totals.regularHours}h | OT: ${t.totals.overtimeHours}h | PTO: ${t.totals.ptoHours}h`});n.append(i,l),a.appendChild(n);const c=this.createWeekTable(t.entries);return a.appendChild(c),a}createWeekTable(e){const t=s.createElement("div",{className:"overflow-x-auto"}),a=s.createElement("table",{className:"min-w-full divide-y divide-gray-200 table-fixed"}),r=s.createElement("thead",{className:"bg-gray-50"});r.appendChild(this.createTableHeader()),a.appendChild(r);const o=s.createElement("tbody",{className:"bg-white divide-y divide-gray-200"});return[...e].sort((i,l)=>new Date(l.date)-new Date(i.date)).forEach(i=>{const l=this.createEntryRow(i,u.getState().user,u.getState().settings);o.appendChild(l)}),a.appendChild(o),t.appendChild(a),t}getWeekNumber(e){const t=new Date(e);t.setHours(0,0,0,0);const a=new Date(t.getFullYear(),0,1),r=new Date(a);if(r.setDate(a.getDate()+(7-a.getDay())%7),t<r)return{week:1,year:t.getFullYear()};const o=Math.floor((t-r)/(24*60*60*1e3));return{week:Math.floor(o/7)+2,year:t.getFullYear()}}createDashboardSummary(){const e=s.createElement("div",{className:"grid grid-cols-4 gap-4 mb-6"}),t={pending:this.entries.filter(r=>r.status==="pending").length,approved:this.entries.filter(r=>r.status==="approved").length,rejected:this.entries.filter(r=>r.status==="rejected").length,total:this.entries.length};return[{title:"Pending Approval",value:t.pending,color:"yellow",urgent:t.pending>0},{title:"Approved",value:t.approved,color:"green"},{title:"Rejected",value:t.rejected,color:"red"},{title:"Total Entries",value:t.total,color:"blue"}].forEach(r=>{const o=s.createElement("div",{className:`p-4 bg-white rounded-lg border-l-4 border-${r.color}-500 shadow`}),n=s.createElement("h3",{className:"text-sm font-medium text-gray-500",text:r.title}),i=s.createElement("p",{className:`mt-1 text-3xl font-semibold ${r.urgent?"text-red-600":"text-gray-900"}`,text:r.value.toString()});o.append(n,i),e.appendChild(o)}),e}createWeeklySummary(e){console.log("Creating weekly summary for data:",e);const t=s.createElement("div",{className:"space-y-6"});return e.forEach(a=>{const r=s.createElement("div",{className:"bg-white rounded-lg shadow-lg overflow-hidden"}),o=s.createElement("div",{className:"p-6 bg-gray-50 border-b border-gray-200"}),n=s.createElement("div",{className:"flex justify-between items-center"}),i=s.createElement("div",{});i.appendChild(s.createElement("h3",{className:"text-xl font-bold text-gray-900",text:`Week of ${g.formatDate(a.weekStart)}`}));const l=s.createElement("div",{className:"flex gap-4"});[{label:"Regular",value:a.totals.regularHours,color:"blue"},{label:"OT",value:a.totals.overtimeHours,color:"orange"},{label:"PTO",value:a.totals.ptoHours,color:"green"}].forEach(m=>{const w=s.createElement("div",{className:"text-center"});w.append(s.createElement("div",{className:`text-lg font-bold text-${m.color}-600`,text:`${m.value}h`}),s.createElement("div",{className:"text-sm text-gray-500",text:m.label})),l.appendChild(w)}),n.append(i,l),o.appendChild(n),r.appendChild(o);const d=s.createElement("div",{className:"divide-y divide-gray-200"});a.users.forEach(m=>{const w=this.createUserSummaryRow(m);d.appendChild(w)}),r.appendChild(d),t.appendChild(r)}),t}createUserSummaryRow(e){const t=s.createElement("div",{className:"hover:bg-gray-50 transition-colors duration-150 cursor-pointer"}),a=s.createElement("div",{className:"p-6 flex items-center justify-between gap-4"}),r=s.createElement("div",{className:"flex-1"}),o=s.createElement("div",{className:"flex items-center gap-3 mb-2"});o.append(s.createElement("h4",{className:"text-lg font-semibold text-gray-900",text:e.workerEmail}),s.createElement("span",{className:`px-3 py-1 rounded-full text-sm font-medium ${this.getStatusBadgeClass(e.status)}`,text:e.status||"pending"}));const n=s.createElement("div",{className:"flex gap-6 text-sm text-gray-600"});[{label:"Regular",value:e.totals.regularHours},{label:"Overtime",value:e.totals.overtimeHours},{label:"PTO",value:e.totals.ptoHours}].forEach(({label:c,value:d})=>{n.appendChild(s.createElement("span",{text:`${c}: ${d}h`}))}),r.append(o,n);const i=s.createElement("div",{className:"flex items-center gap-3"});if(e.status==="pending"){const c=s.createElement("button",{className:"inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",text:"Approve"});c.addEventListener("click",m=>{m.stopPropagation(),this.approveWeek(e)});const d=s.createElement("button",{className:"inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",text:"Reject"});d.addEventListener("click",m=>{m.stopPropagation(),this.rejectWeek(e)}),i.append(c,d)}const l=s.createElement("button",{className:"inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",text:"View Details"});return l.addEventListener("click",c=>{c.stopPropagation(),this.showDetailedView(e)}),i.appendChild(l),a.append(r,i),t.appendChild(a),t}getStatusBadgeClass(e){switch(e?.toLowerCase()){case"approved":return"bg-green-100 text-green-800";case"pending":return"bg-yellow-100 text-yellow-800";case"rejected":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}}showDetailedView(e){const t=this.createDetailedView({...e,weekStart:g.getWeekStart(new Date(e.entries[0].date))});document.body.appendChild(t)}createActionCell(e){const t=s.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium"}),{settings:a}=u.getState();if(h.hasPermission(a,h.PERMISSIONS.APPROVE_TIME)&&(!e.status||e.status==="pending")){const o=s.createElement("button",{className:"text-green-600 hover:text-green-900 mr-4",text:"Approve"});o.addEventListener("click",()=>this.updateStatus(e.id,"approved"));const n=s.createElement("button",{className:"text-red-600 hover:text-red-900",text:"Reject"});n.addEventListener("click",()=>this.updateStatus(e.id,"rejected")),t.append(o,n)}return t}createDetailedView(e){return s.createElement("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",id:"detailedView"},[s.createElement("div",{className:"relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white"},[s.createElement("div",{className:"flex justify-between items-center mb-4"},[s.createElement("h3",{className:"text-lg font-medium",text:`${e.workerEmail} - Week of ${g.formatDate(e.weekStart)}`}),s.createElement("button",{className:"text-gray-500 hover:text-gray-700",onClick:()=>this.closeDetailedView(),text:"×"})]),this.createDailyEntriesTable(e.entries),s.createElement("div",{className:"mt-4 flex justify-end space-x-3"},[s.createElement("button",{className:"px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600",onClick:()=>this.approveWeek(e),text:"Approve All"}),s.createElement("button",{className:"px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",onClick:()=>this.rejectWeek(e),text:"Reject All"})])])])}groupEntriesByWeekAndUser(){console.log("Starting to group entries:",this.entries.length);const e=new Map;this.entries.forEach(a=>{const r=g.getWeekStart(new Date(a.date)),o=g.formatDate(r),n=a.userId;e.has(o)||e.set(o,{weekStart:r,users:new Map,totals:{regularHours:0,overtimeHours:0,ptoHours:0,unpaidHours:0}});const i=e.get(o);i.users.has(n)||i.users.set(n,{userId:n,workerEmail:a.workerEmail,weekStart:r,entries:[],totals:{regularHours:0,overtimeHours:0,ptoHours:0,unpaidHours:0},status:a.status||"pending"});const l=i.users.get(n);if(l.entries.push(a),a.isTimeOff)a.timeOffType==="paid"?(l.totals.ptoHours+=a.hours||0,i.totals.ptoHours+=a.hours||0):(l.totals.unpaidHours+=a.hours||0,i.totals.unpaidHours+=a.hours||0);else{const c=Math.min(a.hours||0,8),d=Math.max((a.hours||0)-8,0);l.totals.regularHours+=c,l.totals.overtimeHours+=d,i.totals.regularHours+=c,i.totals.overtimeHours+=d}a.status==="rejected"?l.status="rejected":a.status==="pending"&&l.status!=="rejected"?l.status="pending":a.status==="approved"&&l.status!=="rejected"&&l.status!=="pending"&&(l.status="approved")});const t=Array.from(e.entries()).map(([a,r])=>({...r,users:Array.from(r.users.values()).sort((o,n)=>n.weekStart-o.weekStart)})).sort((a,r)=>r.weekStart-a.weekStart);return console.log("Grouped data:",t),t}createDailyEntriesTable(e){const t=s.createElement("table",{className:"min-w-full divide-y divide-gray-200"}),a=s.createElement("thead",{className:"bg-gray-50"});a.appendChild(s.createElement("tr",{},["Date","Hours","Type","Status","Actions"].map(o=>s.createElement("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",text:o}))));const r=s.createElement("tbody",{className:"bg-white divide-y divide-gray-200"});return e.sort((o,n)=>new Date(o.date)-new Date(n.date)).forEach(o=>{const n=s.createElement("tr",{className:"hover:bg-gray-50"});n.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:g.formatDate(new Date(o.date))})),n.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:this.formatHours(o)})),n.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:this.getEntryType(o)})),n.appendChild(s.createElement("td",{className:"px-6 py-4 whitespace-nowrap"},[s.createElement("span",{className:`px-2 py-1 text-sm rounded-full ${this.getStatusBadgeClass(o.status)}`,text:o.status||"pending"})])),n.appendChild(this.createActionCell(o)),r.appendChild(n)}),t.append(a,r),t}formatHours(e){if(e.isTimeOff)return`${e.hours}h (${e.timeOffType})`;const t=Math.min(e.hours||0,8),a=Math.max((e.hours||0)-8,0);return a>0?`${t}h + ${a}h OT`:`${t}h`}getEntryType(e){return e.isTimeOff?`Time Off (${e.timeOffType})`:e.overtimeHours>0?"Regular + OT":"Regular"}async approveWeek(e){try{await Promise.all(e.entries.filter(t=>t.status==="pending").map(t=>this.updateStatus(t.id,"approved"))),this.closeDetailedView(),p.showNotification("Week approved successfully","success")}catch(t){console.error("Error approving week:",t),p.showNotification("Failed to approve week","error")}}async rejectWeek(e){try{await Promise.all(e.entries.filter(t=>t.status==="pending").map(t=>this.updateStatus(t.id,"rejected"))),this.closeDetailedView(),p.showNotification("Week rejected successfully","success")}catch(t){console.error("Error rejecting week:",t),p.showNotification("Failed to reject week","error")}}closeDetailedView(){const e=document.getElementById("detailedView");e&&e.remove()}destroy(){u.unsubscribe("timeEntriesTable"),this.container=null,this.initialized=!1}}class U{constructor(){this.dashboardState=u,this.components={userManagement:null,timeEntriesTable:null,invoiceGenerator:null},this.initialize=this.initialize.bind(this),this.loadUserData=this.loadUserData.bind(this),this.renderDashboard=this.renderDashboard.bind(this)}async initialize(){try{console.log("Initializing AdminDashboard...");const e=f.currentUser;if(!e)throw console.error("No authenticated user"),new Error("No authenticated user");return await this.loadUserData(e.uid),await this.renderDashboard(),!0}catch(e){throw console.error("Failed to initialize dashboard:",e),e}}async loadUserData(e){try{console.log("Fetching user data for:",e);const t=await A(C(E,"users",e));if(!t.exists())throw console.error("No user document found"),new Error("User document not found");const a=t.data(),r=a.permissions||h.getDefaultPermissions(a.role);this.dashboardState.setState({user:f.currentUser,role:a.role,assignedWorkers:a.assignedWorkers||[],settings:r,isInitialized:!0}),console.log("User role and settings loaded:",{role:a.role,settings:r})}catch(t){throw console.error("Error loading user data:",t),p.showNotification("Failed to load user data","error"),t}}async renderDashboard(){console.log("Rendering dashboard...");const e=document.getElementById("adminDashboard");if(!e)throw new Error("Admin dashboard container not found");e.style.display="block",s.removeAllChildren(e);const t=this.createHeader(),a=s.createElement("main",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"});e.appendChild(t),e.appendChild(a);const{role:r}=this.dashboardState.getState();console.log("Current user role:",r),h.hasAccess(r,[h.ROLES.SUPER_ADMIN,h.ROLES.MANAGER])&&await this.renderAdminSections(a)}createHeader(){const e=s.createElement("header",{className:"bg-white shadow mb-6"}),{user:t}=this.dashboardState.getState(),a=s.createElement("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"}),r=s.createElement("h1",{text:`Welcome, ${t?.email}`,className:"text-3xl font-bold text-gray-900"}),o=s.createElement("button",{text:"Logout",className:"px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"});return o.addEventListener("click",async()=>{try{await f.signOut(),window.location.reload()}catch(n){console.error("Error signing out:",n),p.showNotification("Failed to sign out","error")}}),a.append(r,o),e.appendChild(a),e}async renderAdminSections(e){try{console.log("Rendering admin sections...");const t=this.createSection("User Management","userManagementContent"),a=t.querySelector('[id="userManagementContent"]');a&&(this.components.userManagement=new k(a)),e.appendChild(t);const r=this.createSection("Time Entries","timeEntriesContent"),o=r.querySelector('[id="timeEntriesContent"]');o&&(this.components.timeEntriesTable=new O(o)),e.appendChild(r);const n=this.createSection("Invoice Generator","invoiceGeneratorContent"),i=n.querySelector('[id="invoiceGeneratorContent"]');if(i){const{companies:l=[]}=this.dashboardState.getState();this.components.invoiceGenerator=new L(l),this.components.invoiceGenerator.render(i)}e.appendChild(n)}catch(t){console.error("Error rendering admin sections:",t),p.showNotification("Failed to render dashboard sections","error")}}createSection(e,t){console.log(`Creating section: ${e}`);const a=s.createElement("div",{className:"bg-white shadow rounded-lg mb-6"}),r=s.createElement("div",{className:"px-4 py-5 border-b border-gray-200 sm:px-6"}),o=s.createElement("h2",{text:e,className:"text-lg font-medium text-gray-900"}),n=s.createElement("div",{attributes:{id:t},className:"px-4 py-5 sm:p-6 section-content"});return r.appendChild(o),a.appendChild(r),a.appendChild(n),a}getContentElements(e){return{userManagementContent:document.getElementById("userManagementContent"),timeEntriesContent:document.getElementById("timeEntriesContent"),invoiceGeneratorContent:document.getElementById("invoiceGeneratorContent")}}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="/"}showError(e){p.showNotification(e,"error")}}class j{constructor(){this.initialized=!1,this.setupAuthListener()}setupAuthListener(){H(f,async e=>{console.log("Auth: ",e?"User authenticated":"No user");const t=document.getElementById("appLoading"),a=document.getElementById("authContainer"),r=document.getElementById("adminDashboard");if(t&&(t.style.display="none",console.log("Loading screen hidden")),e)try{if(console.log("Loading user data..."),!await this.loadUserData(e))throw new Error("No user data found");a&&(a.classList.remove("active"),a.style.display="none"),r&&(r.style.display="block")}catch(o){console.error("Error loading user data:",o),await this.logout()}else a&&(a.style.display="block",a.classList.add("active")),r&&(r.style.display="none"),console.log("No user, showing login form")})}async login(e,t){try{console.log("Attempting login...");const a=await B(f,e,t);console.log("Firebase Auth successful, loading user data...");const r=await this.loadUserData(a.user);if(!r)throw console.error("No user data found"),new Error("No user data found");if(console.log("Verifying admin access...",r.role),!this.verifyAdminAccess(r.role))throw console.error("User does not have admin access"),await this.logout(),new Error("Unauthorized access. Admin privileges required.");return console.log("Login successful!"),r}catch(a){console.error("Login error:",a);const r=this.getLoginErrorMessage(a);throw p.showNotification(r,"error"),a}}async loadUserData(e){try{let t=null;const a=C(E,"users",e.uid),r=await A(a);if(r.exists())t={id:r.id,...r.data()};else{const o=v(E,"users"),n=x(o,b("email","==",e.email)),i=await N(n);i.empty||(t={id:i.docs[0].id,...i.docs[0].data()})}if(!t)throw new Error("User data not found");return u.updateUserData({user:e,role:t.role,assignedWorkers:t.assignedWorkers||[],settings:t.settings||h.getDefaultPermissions(t.role)}),this.updateUIForAuthenticatedUser(e.email),t}catch(t){throw console.error("Error loading user data:",t),t}}verifyAdminAccess(e){return[h.ROLES.SUPER_ADMIN,h.ROLES.MANAGER].includes(e)}async logout(){try{await M(f),u.reset(),this.redirectToLogin()}catch(e){console.error("Logout error:",e),p.showNotification("Failed to logout. Please try again.","error")}}updateUIForAuthenticatedUser(e){const t=document.getElementById("authContainer"),a=document.getElementById("adminDashboard"),r=document.getElementById("adminEmail");t&&t.classList.remove("active"),a&&(a.style.display="block"),r&&(r.textContent=e)}getLoginErrorMessage(e){switch(e.code){case"auth/invalid-email":return"Invalid email address format.";case"auth/user-disabled":return"This account has been disabled. Please contact support.";case"auth/user-not-found":return"No account found with this email.";case"auth/wrong-password":return"Invalid password.";case"auth/too-many-requests":return"Too many failed attempts. Please try again later.";default:return e.message||"An error occurred during login."}}redirectToLogin(){console.warn("Redirecting to login..."),window.location.href="./"}async verifySession(){const e=f.currentUser;if(!e)return!1;try{return await e.getIdToken(!0),!0}catch(t){return console.error("Session verification failed:",t),!1}}getAuthStatus(){const{user:e,role:t,isInitialized:a}=u.getState();return{isAuthenticated:!!e,isAdmin:this.verifyAdminAccess(t),isInitialized:a,user:e}}}if(!u)throw console.error("DashboardState not initialized"),new Error("DashboardState not initialized");class P{constructor(){this.adminDashboard=null,this.authManager=new j}async initialize(){try{console.log("Initializing Admin App..."),this.setupEventListeners(),this.setupAuthStateListener(),this.setupErrorHandling()}catch(e){console.error("Failed to initialize admin app:",e),this.showError("Application initialization failed.")}}setupAuthStateListener(){f.onAuthStateChanged(async e=>{console.log("Auth state changed:",e?"User authenticated":"No user");const t=document.getElementById("appLoading"),a=document.getElementById("authContainer"),r=document.getElementById("adminDashboard");t&&(t.style.display="none"),e?(console.log("User authenticated:",e.email),a&&(a.style.display="none"),r&&(r.style.display="block"),await this.initializeDashboard(e)):(console.log("No user, showing login form"),a&&(a.style.display="block"),r&&(r.style.display="none"))})}setupEventListeners(){const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async a=>{a.preventDefault();const r=document.getElementById("email").value,o=document.getElementById("password").value;try{await this.authManager.login(r,o)}catch{}});const t=document.getElementById("logoutBtn");t&&t.addEventListener("click",()=>this.authManager.logout())}async initializeDashboard(e){try{this.adminDashboard=new U,await this.adminDashboard.initialize()}catch(t){console.error("Failed to initialize dashboard:",t),this.showError("Failed to initialize dashboard.")}}setupErrorHandling(){window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason),this.showError("An unexpected error occurred.")}),window.addEventListener("error",e=>{console.error("Global error:",e.error),this.showError("An unexpected error occurred.")})}showError(e){const t=document.getElementById("errorBoundary"),a=document.getElementById("errorMessage");t&&a&&(t.style.display="flex",a.textContent=e)}}document.addEventListener("DOMContentLoaded",()=>{new P().initialize()});
