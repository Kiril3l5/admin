import{i as _,g as C,a as L,c as f,q as A,w as g,b,T as m,d as v,e as p,u as S,f as T,h as D,s as G}from"./vendor-firebase-q4K5YV9j.js";import{A as d,D as n,a as y}from"./vendor-utils-B8p85eXh.js";const U={apiKey:"AIzaSyB1dlHRhLA71PxCgVLjOieUcUF22DWx6zY",authDomain:"autonomy-heroes.firebaseapp.com",projectId:"autonomy-heroes",storageBucket:"autonomy-heroes.firebasestorage.app",messagingSenderId:"266526530869",appId:"1:266526530869:web:ea95143735be497ca8007c",measurementId:"G-70PG5B4S39"},O=_(U),F=C(O),h=L(O);class c{static ROLES={SUPER_ADMIN:"super-admin",MANAGER:"manager",WORKER:"worker"};static PERMISSIONS=Object.freeze({MANAGE_USERS:"manageUsers",ASSIGN_MANAGERS:"assignManagers",VIEW_ALL_USERS:"viewAllUsers",APPROVE_TIME:"approveTime",VIEW_ALL_ENTRIES:"viewAllEntries",VIEW_TEAM_ENTRIES:"viewTeamEntries",MODIFY_ENTRIES:"modifyEntries",GENERATE_REPORTS:"generateReports",GENERATE_INVOICES:"generateInvoices",VIEW_COMPANY_DATA:"viewCompanyData",MANAGE_SETTINGS:"manageSettings",MANAGE_COMPANY_SETTINGS:"manageCompanySettings"});static getDefaultPermissions(e){switch(e){case this.ROLES.SUPER_ADMIN:return{[this.PERMISSIONS.MANAGE_USERS]:!0,[this.PERMISSIONS.ASSIGN_MANAGERS]:!0,[this.PERMISSIONS.VIEW_ALL_USERS]:!0,[this.PERMISSIONS.APPROVE_TIME]:!0,[this.PERMISSIONS.VIEW_ALL_ENTRIES]:!0,[this.PERMISSIONS.VIEW_TEAM_ENTRIES]:!0,[this.PERMISSIONS.MODIFY_ENTRIES]:!0,[this.PERMISSIONS.GENERATE_REPORTS]:!0,[this.PERMISSIONS.GENERATE_INVOICES]:!0,[this.PERMISSIONS.VIEW_COMPANY_DATA]:!0,[this.PERMISSIONS.MANAGE_SETTINGS]:!0,[this.PERMISSIONS.MANAGE_COMPANY_SETTINGS]:!0};case this.ROLES.MANAGER:return{[this.PERMISSIONS.VIEW_ALL_USERS]:!1,[this.PERMISSIONS.ASSIGN_MANAGERS]:!1,[this.PERMISSIONS.MANAGE_USERS]:!1,[this.PERMISSIONS.APPROVE_TIME]:!0,[this.PERMISSIONS.VIEW_ALL_ENTRIES]:!1,[this.PERMISSIONS.VIEW_TEAM_ENTRIES]:!0,[this.PERMISSIONS.MODIFY_ENTRIES]:!1,[this.PERMISSIONS.GENERATE_REPORTS]:!0,[this.PERMISSIONS.GENERATE_INVOICES]:!1,[this.PERMISSIONS.VIEW_COMPANY_DATA]:!1,[this.PERMISSIONS.MANAGE_SETTINGS]:!1,[this.PERMISSIONS.MANAGE_COMPANY_SETTINGS]:!1};case this.ROLES.WORKER:return{[this.PERMISSIONS.VIEW_ALL_USERS]:!1,[this.PERMISSIONS.ASSIGN_MANAGERS]:!1,[this.PERMISSIONS.MANAGE_USERS]:!1,[this.PERMISSIONS.APPROVE_TIME]:!1,[this.PERMISSIONS.VIEW_ALL_ENTRIES]:!1,[this.PERMISSIONS.VIEW_TEAM_ENTRIES]:!1,[this.PERMISSIONS.MODIFY_ENTRIES]:!1,[this.PERMISSIONS.GENERATE_REPORTS]:!1,[this.PERMISSIONS.GENERATE_INVOICES]:!1,[this.PERMISSIONS.VIEW_COMPANY_DATA]:!1,[this.PERMISSIONS.MANAGE_SETTINGS]:!1,[this.PERMISSIONS.MANAGE_COMPANY_SETTINGS]:!1};default:return{}}}static hasAccess(e,t){return!e||!Array.isArray(t)?!1:t.includes(e)}static hasPermission(e,t){return!e||!t?!1:e[t]||!1}static canManageWorker(e,t=[],s){return!s||!e?!1:e===this.ROLES.SUPER_ADMIN?!0:e===this.ROLES.MANAGER?t.includes(s):!1}static canChangeRole(e,t,s){return e===this.ROLES.SUPER_ADMIN?!0:(e===this.ROLES.MANAGER,!1)}static getAvailableActions(e){const t=this.getDefaultPermissions(e),s=[];return t[this.PERMISSIONS.APPROVE_TIME]&&s.push("approveTime"),t[this.PERMISSIONS.GENERATE_REPORTS]&&s.push("generateReports"),t[this.PERMISSIONS.GENERATE_INVOICES]&&s.push("generateInvoices"),t[this.PERMISSIONS.MANAGE_USERS]&&s.push("manageUsers"),s}static validatePermissions(e,t){return Array.isArray(t)||(t=[t]),t.every(s=>this.hasPermission(e,s))}static getRoleLevel(e){switch(e){case this.ROLES.SUPER_ADMIN:return 3;case this.ROLES.MANAGER:return 2;case this.ROLES.WORKER:return 1;default:return 0}}}class W{constructor(){this.modalElement=null,this.onClose=null,this.onCreate=null}show(e,t){this.onClose=e,this.onCreate=t,this.render()}hide(){this.modalElement&&(this.modalElement.remove(),this.modalElement=null)}async checkEmailExists(e){const t=f(h,"users"),s=A(t,g("email","==",e));return!(await b(s)).empty}async handleSubmit(e){e.preventDefault();const t=e.target,s=t.email.value,a=t.role.value,r=t.password.value,l=t.confirmPassword.value;try{if(!d.isValidEmail(s))throw new Error("Please enter a valid email address");if(r.length<8)throw new Error("Password must be at least 8 characters long");if(r!==l)throw new Error("Passwords do not match");if(await this.checkEmailExists(s))throw new Error("A user with this email already exists");const o={email:s,role:a,active:!0,createdAt:m.now(),settings:c.getDefaultPermissions(a),assignedWorkers:[],managerId:null},u=await v(f(h,"users"),o);d.showNotification("User created successfully","success"),this.onCreate&&this.onCreate({id:u.id,...o}),this.hide()}catch(i){console.error("Error creating user:",i),d.showNotification(i.message,"error")}}render(){this.modalElement=n.createElement("div",{className:"fixed inset-0 z-50 overflow-y-auto"});const e=n.createElement("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"}),t=n.createElement("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"}),s=n.createElement("div",{className:"relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"}),a=n.createElement("button",{className:"absolute top-4 right-4 text-gray-400 hover:text-gray-500",text:"×"});a.addEventListener("click",()=>{this.onClose&&this.onClose(),this.hide()});const r=n.createElement("form",{className:"space-y-6"});r.addEventListener("submit",this.handleSubmit.bind(this));const l=n.createElement("h3",{className:"text-lg font-semibold leading-6 text-gray-900 mb-4",text:"Add New User"}),i=this.createFormGroup("Email","email","email","Enter user email",!0),o=this.createFormGroup("Password","password","password","Enter password",!0),u=this.createFormGroup("Confirm Password","confirmPassword","password","Confirm password",!0),N=this.createRoleSelect(),R=n.createElement("button",{className:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",text:"Create User",attributes:{type:"submit"}});r.append(l,i,o,u,N,R),s.append(a,r),t.appendChild(s),this.modalElement.append(e,t),document.body.appendChild(this.modalElement)}createFormGroup(e,t,s,a,r=!1){const l=n.createElement("div",{className:"space-y-1"}),i=n.createElement("label",{className:"block text-sm font-medium text-gray-700",text:e,attributes:{for:t}}),o=n.createElement("input",{className:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",attributes:{type:s,name:t,id:t,placeholder:a,required:r}});return l.append(i,o),l}createRoleSelect(){const e=n.createElement("div",{className:"space-y-1"}),t=n.createElement("label",{className:"block text-sm font-medium text-gray-700",text:"Role",attributes:{for:"role"}}),s=n.createElement("select",{className:"mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md",attributes:{name:"role",id:"role",required:!0}});return[{value:c.ROLES.WORKER,text:"Worker"},{value:c.ROLES.MANAGER,text:"Manager"}].forEach(r=>{const l=n.createElement("option",{text:r.text,attributes:{value:r.value}});s.appendChild(l)}),e.append(t,s),e}destroy(){this.hide(),this.onClose=null,this.onCreate=null}}class I{constructor(){if(I.instance)return I.instance;I.instance=this,this._state={user:null,role:null,assignedWorkers:[],settings:{},isInitialized:!1,companies:[],selectedCompany:null,loading:!1,currentView:"timeEntries",selectedDate:new Date,filters:{status:"all",dateRange:{startDate:null,endDate:null},searchTerm:""},pagination:{currentPage:1,pageSize:20,totalPages:1}},this.subscribers=new Map}setState(e){const t={...this._state};this._state={...this._state,...e},JSON.stringify(t)!==JSON.stringify(this._state)&&this.notifySubscribers()}getState(){return{...this._state}}reset(){this._state={user:null,role:null,assignedWorkers:[],settings:{},isInitialized:!1,companies:[],selectedCompany:null,loading:!1,currentView:"timeEntries",selectedDate:new Date,filters:{status:"all",dateRange:{startDate:null,endDate:null},searchTerm:""},pagination:{currentPage:1,pageSize:20,totalPages:1}},this.notifySubscribers()}subscribe(e,t){if(typeof t!="function")throw new Error("Callback must be a function");this.subscribers.set(e,t),t(this.getState())}unsubscribe(e){this.subscribers.delete(e)}setState(e){const t={...this.state};this.state={...this.state,...e},JSON.stringify(t)!==JSON.stringify(this.state)&&this.notifySubscribers()}getState(){return{...this.state}}hasPermission(e){return c.hasPermission(this.state.settings,e)}updateUserData(e){this.setState({user:e.user,role:e.role,assignedWorkers:e.assignedWorkers||[],settings:e.settings||{},isInitialized:!0})}updateFilters(e){this.setState({filters:{...this.state.filters,...e}})}updatePagination(e){this.setState({pagination:{...this.state.pagination,...e}})}setLoading(e){if(typeof e!="boolean")throw new Error("Loading state must be boolean");this.setState({loading:e})}getFilteredData(e){const{filters:t,pagination:s}=this.state;let a=[...e];if(t.status!=="all"&&(a=a.filter(i=>i.status===t.status)),t.dateRange.startDate&&t.dateRange.endDate&&(a=a.filter(i=>{const o=new Date(i.date);return o>=t.dateRange.startDate&&o<=t.dateRange.endDate})),t.searchTerm){const i=t.searchTerm.toLowerCase();a=a.filter(o=>o.workerId?.toLowerCase().includes(i)||o.notes?.toLowerCase().includes(i))}const r=(s.currentPage-1)*s.pageSize;return{data:a.slice(r,r+s.pageSize),totalItems:a.length,totalPages:Math.ceil(a.length/s.pageSize)}}notifySubscribers(){this.subscribers.forEach(e=>e(this.getState()))}reset(){this.state={user:null,role:null,assignedWorkers:[],settings:{},isInitialized:!1,companies:[],selectedCompany:null,loading:!1,currentView:"timeEntries",selectedDate:new Date,filters:{status:"all",dateRange:{startDate:null,endDate:null},searchTerm:""},pagination:{currentPage:1,pageSize:20,totalPages:1}},this.notifySubscribers()}}const E=new I;Object.freeze(Object.getPrototypeOf(E));class z{constructor(e){this.container=e,this.users=[],this.managers=[],E.subscribe("userManagement",this.handleStateChange.bind(this))}handleStateChange(e){e.role&&e.isInitialized&&this.render()}async fetchUsers(){try{E.setLoading(!0);const{role:e,assignedWorkers:t}=E.getState();let s;e===c.ROLES.SUPER_ADMIN?s=A(f(h,"users")):e===c.ROLES.MANAGER&&(s=A(f(h,"users"),g("userId","in",t)));const a=await b(s);this.users=a.docs.map(r=>({id:r.id,...r.data()})),this.managers=this.users.filter(r=>r.role===c.ROLES.MANAGER||r.role===c.ROLES.SUPER_ADMIN)}catch(e){console.error("Error fetching users:",e),d.showNotification("Failed to fetch users","error")}finally{E.setLoading(!1)}}async render(){try{if(!this.container)throw new Error("Container not found");await this.fetchUsers(),n.removeAllChildren(this.container);const{role:e,settings:t}=E.getState();if(e===c.ROLES.SUPER_ADMIN){const a=this.createAddUserButton();container.appendChild(a)}const s=this.createUsersTable();container.appendChild(s)}catch(e){console.error("Error rendering User Management:",e),d.showNotification("Failed to render user management","error")}}createAddUserButton(){const e=n.createElement("div",{className:"mb-4 flex justify-end"}),t=n.createElement("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center",text:"Add New User"});return t.addEventListener("click",()=>this.showAddUserModal()),e.appendChild(t),e}createUsersTable(){const e=n.createElement("table",{className:"min-w-full divide-y divide-gray-200"}),t=this.createTableHeader();e.appendChild(t);const s=n.createElement("tbody",{className:"bg-white divide-y divide-gray-200"});return this.users.forEach(a=>{const r=this.createUserRow(a);s.appendChild(r)}),e.appendChild(s),e}createTableHeader(){const e=n.createElement("thead",{className:"bg-gray-50"}),t=n.createElement("tr");return["Email","Role","Assigned Manager","Status","Actions"].forEach(a=>{const r=n.createElement("th",{text:a,className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"});t.appendChild(r)}),e.appendChild(t),e}createUserRow(e){const t=n.createElement("tr",{className:"hover:bg-gray-50"}),s=n.createElement("td",{className:"px-6 py-4 whitespace-nowrap",text:e.email}),a=n.createElement("td",{className:"px-6 py-4 whitespace-nowrap"}),r=n.createElement("span",{className:`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getRoleBadgeClass(e.role)}`,text:e.role||c.ROLES.WORKER});a.appendChild(r);const l=this.createManagerCell(e),i=this.createStatusCell(e),o=this.createActionsCell(e);return t.append(s,a,l,i,o),t}createManagerCell(e){const t=n.createElement("td",{className:"px-6 py-4 whitespace-nowrap"}),{role:s}=E.getState();if(e.role!==c.ROLES.MANAGER&&e.role!==c.ROLES.SUPER_ADMIN&&s===c.ROLES.SUPER_ADMIN){const a=this.createManagerSelect(e);t.appendChild(a)}else t.textContent="N/A";return t}createManagerSelect(e){const t=n.createElement("select",{className:"block w-full px-3 py-2 border border-gray-300 rounded-md"}),s=n.createElement("option",{text:"Select a manager",value:""});return t.appendChild(s),this.managers.forEach(a=>{if(a.id!==e.id){const r=n.createElement("option",{text:a.email,value:a.id,attributes:{selected:e.managerId===a.id}});t.appendChild(r)}}),t.addEventListener("change",async a=>{try{await this.assignManager(e.id,a.target.value),d.showNotification(`Manager updated for ${e.email}`,"success")}catch{d.showNotification("Failed to assign manager","error")}}),t}createStatusCell(e){const t=n.createElement("td",{className:"px-6 py-4 whitespace-nowrap"}),s=n.createElement("span",{className:`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${e.active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,text:e.active?"Active":"Inactive"});return t.appendChild(s),t}createActionsCell(e){const t=n.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium"}),{role:s}=E.getState();if(s===c.ROLES.SUPER_ADMIN){if(e.role!==c.ROLES.SUPER_ADMIN){const r=n.createElement("button",{className:"text-blue-600 hover:text-blue-900 mr-4",text:e.role===c.ROLES.MANAGER?"Make Worker":"Make Manager"});r.addEventListener("click",()=>this.toggleUserRole(e)),t.appendChild(r)}const a=n.createElement("button",{className:`text-${e.active?"red":"green"}-600 hover:text-${e.active?"red":"green"}-900`,text:e.active?"Deactivate":"Activate"});a.addEventListener("click",()=>this.toggleUserActive(e)),t.appendChild(a)}return t}async assignManager(e,t){try{const s=this.users.find(r=>r.id===e);if(s.managerId){const r=p(h,"users",s.managerId);await S(r,{assignedWorkers:T(e),updatedAt:m.now()})}const a=p(h,"users",e);if(await S(a,{managerId:t||null,updatedAt:m.now()}),t){const r=p(h,"users",t);await S(r,{assignedWorkers:D(e),updatedAt:m.now()})}await this.render()}catch(s){throw console.error("Error assigning manager:",s),s}}async toggleUserRole(e){try{const t=e.role===c.ROLES.MANAGER?c.ROLES.WORKER:c.ROLES.MANAGER,s=p(h,"users",e.id);if(await S(s,{role:t,settings:c.getDefaultPermissions(t),updatedAt:m.now()}),t===c.ROLES.WORKER){const a=e.assignedWorkers||[];for(const r of a){const l=p(h,"users",r);await S(l,{managerId:null,updatedAt:m.now()})}await S(s,{assignedWorkers:[]})}await this.render(),d.showNotification(`User role updated to ${t}`,"success")}catch(t){console.error("Error updating role:",t),d.showNotification("Failed to update user role","error")}}async toggleUserActive(e){try{const t=p(h,"users",e.id);await S(t,{active:!e.active,updatedAt:m.now()}),await this.render(),d.showNotification(`User ${e.active?"deactivated":"activated"} successfully`,"success")}catch(t){console.error("Error toggling user active status:",t),d.showNotification("Failed to update user status","error")}}getRoleBadgeClass(e){switch(e){case c.ROLES.SUPER_ADMIN:return"bg-purple-100 text-purple-800";case c.ROLES.MANAGER:return"bg-blue-100 text-blue-800";default:return"bg-gray-100 text-gray-800"}}async showAddUserModal(){new W().show(()=>{console.log("Modal closed")},async t=>{console.log("New user created:",t),await this.render()})}}class P{constructor(e){if(!Array.isArray(e))throw d.showNotification("Invalid companies data provided","error"),new Error("A valid companies array is required.");this.companies=e,this.generatedInvoices=[]}async fetchApprovedEntries(e,t,s){try{const a=y.normalizeDate(t).toISOString(),r=y.normalizeDate(s).toISOString(),l=A(f(h,"timeEntries"),g("companyId","==",e),g("status","==","approved"),g("date",">=",a),g("date","<=",r));return(await b(l)).docs.map(o=>({id:o.id,...o.data()}))}catch(a){return console.error("Failed to fetch approved entries:",a),d.showNotification("Failed to fetch time entries","error"),[]}}async generateInvoice(e,t,s,a){try{E.setLoading(!0);const r=await this.fetchApprovedEntries(e,s,a);if(!r.length){d.showNotification("No approved time entries found for this period","warning");return}const l=r.reduce((u,N)=>u+N.hours,0),i={companyId:e,companyName:t,startDate:s.toISOString(),endDate:a.toISOString(),totalHours:l,generatedAt:G(),entries:r.map(u=>u.id)},o=await v(f(h,"invoices"),i);this.generatedInvoices.push({...i,id:o.id}),this.renderInvoicesList(),d.showNotification(`Invoice for ${t} generated successfully`,"success")}catch(r){console.error("Error generating invoice:",r),d.showNotification("Failed to generate invoice. Please try again.","error")}finally{E.setLoading(!1)}}render(e){try{if(!e)throw new Error("A valid container is required.");E.setLoading(!0),n.removeAllChildren(e);const t=n.createElement("div",{className:"mb-6 p-4 bg-white rounded-lg shadow"}),s=n.createElement("select",{className:"w-full p-2 mb-4 border rounded"}),a=n.createElement("option",{text:"Select Company",value:"",attributes:{disabled:!0,selected:!0}});s.appendChild(a),this.companies.forEach(o=>{const u=n.createElement("option",{text:o.name,value:o.id});s.appendChild(u)});const r=n.createElement("input",{className:"w-full p-2 mb-4 border rounded",attributes:{type:"date",required:!0}}),l=n.createElement("input",{className:"w-full p-2 mb-4 border rounded",attributes:{type:"date",required:!0}}),i=n.createElement("button",{className:"w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600",text:"Generate Invoice"});t.append(s,r,l,i),t.addEventListener("submit",async o=>{o.preventDefault();const u=s.value,N=this.companies.find(x=>x.id===u)?.name,R=new Date(r.value),w=new Date(l.value);if(!u||!R||!w){d.showNotification("Please fill in all required fields","error");return}if(R>w){d.showNotification("Start date cannot be after end date","error");return}await this.generateInvoice(u,N,R,w)}),e.appendChild(t),this.renderInvoicesList(e)}catch(t){console.error("Error rendering invoice generator:",t),d.showNotification("Failed to render invoice generator","error")}finally{E.setLoading(!1)}}createInvoiceSection(){const e=n.createElement("div",{className:"bg-white shadow rounded-lg"}),t=n.createElement("div",{className:"px-4 py-5 sm:p-6"});e.appendChild(t);const{companies:s=[]}=this.dashboardState.getState();this.invoiceGenerator=new P(s);try{this.invoiceGenerator.render(t)}catch(a){console.error("Failed to render invoice generator:",a),t.innerHTML="<p>Failed to load invoice generator</p>"}return e}renderInvoicesList(e){try{if(!this.generatedInvoices.length){const r=n.createElement("div",{className:"text-center p-4 text-gray-500",text:"No invoices generated yet"});e.appendChild(r);return}const t=n.createElement("div",{className:"mt-6 bg-white rounded-lg shadow"}),s=n.createElement("h3",{className:"p-4 border-b text-lg font-medium",text:"Generated Invoices"}),a=n.createElement("ul",{className:"divide-y divide-gray-200"});this.generatedInvoices.forEach(r=>{const l=n.createElement("li",{className:"p-4 hover:bg-gray-50"}),i=n.createElement("div",{text:`${r.companyName}: ${r.totalHours} hrs (${new Date(r.startDate).toLocaleDateString()} - ${new Date(r.endDate).toLocaleDateString()})`});l.appendChild(i),a.appendChild(l)}),t.append(s,a),e.appendChild(t)}catch(t){console.error("Error rendering invoices list:",t),d.showNotification("Failed to display invoices list","error")}}}export{P as I,c as R,z as U,h as a,F as b,E as d};
