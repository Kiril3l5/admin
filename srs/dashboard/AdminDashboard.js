// AdminDashboard.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { TimeEntriesTable } from "./TimeEntriesTable";
import { InvoiceGenerator } from "./InvoiceGenerator";
import { DOMUtils } from "../../shared/utils/DOMUtils";

export class AdminDashboard {
    constructor(firebaseConfig) {
        if (!firebaseConfig) throw new Error("Firebase configuration is required.");

        this.auth = getAuth();
        this.db = getFirestore();
        this.state = {
            user: null,
            role: null, // 'manager' or 'super-admin'
            assignedWorkers: [], // List of worker IDs (for managers)
            companies: [], // For super-admin access
        };

        this.initializeDashboard();
    }

    initializeDashboard() {
        console.log("Initializing Admin Dashboard...");

        onAuthStateChanged(this.auth, (user) => {
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
            const userDoc = await getDocs(query(collection(this.db, "users"), where("userId", "==", userId)));
            if (!userDoc.empty) {
                const userData = userDoc.docs[0].data();
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
            const companyDocs = await getDocs(collection(this.db, "companies"));
            this.state.companies = companyDocs.docs.map((doc) => doc.data());
            console.log("Companies loaded:", this.state.companies);
        } catch (error) {
            console.error("Error loading companies:", error);
            this.showError("Failed to load company data.");
        }
    }

    render() {
        console.log("Rendering Admin Dashboard...");

        // Clear existing content
        const dashboardContainer = document.getElementById("adminDashboard");
        if (!dashboardContainer) {
            throw new Error("Admin dashboard container not found.");
        }
        DOMUtils.removeAllChildren(dashboardContainer);

        // Add welcome message
        const welcomeMessage = DOMUtils.createElement("h1", {
            text: `Welcome, ${this.state.user.email}`,
            className: "welcome-message",
        });
        dashboardContainer.appendChild(welcomeMessage);

        // Add time entries table
        const timeEntriesSection = DOMUtils.createElement("section", { className: "time-entries-section" });
        dashboardContainer.appendChild(timeEntriesSection);

        const timeEntriesTable = new TimeEntriesTable(this.db, this.state.role, this.state.assignedWorkers);
        timeEntriesTable.render(timeEntriesSection);

        // Add invoice generation section (for super-admins)
        if (this.state.role === "super-admin") {
            const invoiceSection = DOMUtils.createElement("section", { className: "invoice-section" });
            dashboardContainer.appendChild(invoiceSection);

            const invoiceGenerator = new InvoiceGenerator(this.db, this.state.companies);
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