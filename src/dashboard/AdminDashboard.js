// AdminDashboard.js
import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { TimeEntriesTable } from "./TimeEntriesTable.js";
import { InvoiceGenerator } from "./InvoiceGenerator.js";
import { DOMUtils } from "../../../shared/utils/DOMUtils.js";

export class AdminDashboard {
    constructor() {
        this.state = {
            user: null,
            role: null, // 'manager' or 'super-admin'
            assignedWorkers: [],
            companies: [],
        };

        this.initializeDashboard();
    }

    initializeDashboard() {
        console.log("Initializing Admin Dashboard...");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.state.user = user;
                this.loadUserRole(user.uid);
            } else {
                this.redirectToLogin();
            }
        });
    }

    async loadUserRole(userId) {
        try {
            const userDocs = await getDocs(query(collection(db, "users"), where("userId", "==", userId)));
            if (!userDocs.empty) {
                const userData = userDocs.docs[0].data();
                this.state.role = userData.role;
                this.state.assignedWorkers = userData.assignedWorkers || [];
                console.log("User role loaded:", userData.role);

                if (this.state.role === "super-admin") {
                    await this.loadCompanies();
                }

                this.render();
            } else {
                console.error("User data not found.");
                this.redirectToLogin();
            }
        } catch (error) {
            console.error("Error loading user role:", error);
            this.showError("Failed to load user data. Please refresh the page.");
        }
    }

    async loadCompanies() {
        try {
            const companyDocs = await getDocs(collection(db, "companies"));
            this.state.companies = companyDocs.docs.map((doc) => doc.data());
            console.log("Companies loaded:", this.state.companies);
        } catch (error) {
            console.error("Error loading companies:", error);
            this.showError("Failed to load company data.");
        }
    }

    render() {
        const dashboardContainer = document.getElementById("adminDashboard");
        if (!dashboardContainer) {
            throw new Error("Admin dashboard container not found.");
        }

        DOMUtils.removeAllChildren(dashboardContainer);

        const welcomeMessage = DOMUtils.createElement("h1", {
            text: `Welcome, ${this.state.user.email}`,
            className: "welcome-message",
        });
        dashboardContainer.appendChild(welcomeMessage);

        const timeEntriesSection = DOMUtils.createElement("section", { className: "time-entries-section" });
        dashboardContainer.appendChild(timeEntriesSection);

        const timeEntriesTable = new TimeEntriesTable(db, this.state.role, this.state.assignedWorkers);
        timeEntriesTable.render(timeEntriesSection);

        if (this.state.role === "super-admin") {
            const invoiceSection = DOMUtils.createElement("section", { className: "invoice-section" });
            dashboardContainer.appendChild(invoiceSection);

            const invoiceGenerator = new InvoiceGenerator(db, this.state.companies);
            invoiceGenerator.render(invoiceSection);
        }
    }

    redirectToLogin() {
        console.warn("Redirecting to login...");
        window.location.href = "/login";
    }

    showError(message) {
        console.error("Admin Dashboard Error:", message);
        alert(message);
    }
}