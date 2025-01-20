// TimeEntriesTable.js
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { DOMUtils } from "../../shared/utils/DOMUtils";
import { DateUtils } from "../../shared/utils/DateUtils";

export class TimeEntriesTable {
    constructor(db, role, assignedWorkers) {
        if (!db || !role) throw new Error("Firestore instance and user role are required.");

        this.db = db;
        this.role = role;
        this.assignedWorkers = assignedWorkers;
        this.entries = [];
        this.isLoading = false;
    }

    async fetchEntries() {
        console.log("Fetching time entries...");
        this.isLoading = true;

        const filters = [];
        if (this.role === "manager") {
            filters.push(where("workerId", "in", this.assignedWorkers));
        }

        try {
            const q = query(collection(this.db, "timeEntries"), ...filters);
            const querySnapshot = await getDocs(q);
            this.entries = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log("Fetched entries:", this.entries);
        } catch (error) {
            console.error("Error fetching entries:", error);
            alert("Failed to load time entries. Please try again.");
        } finally {
            this.isLoading = false;
        }
    }

    async approveEntry(entryId) {
        try {
            console.log(`Approving entry: ${entryId}`);
            const entryDoc = doc(this.db, "timeEntries", entryId);
            await updateDoc(entryDoc, { status: "approved" });
            alert("Entry approved successfully!");
            await this.fetchEntries(); // Refresh entries
            this.render();
        } catch (error) {
            console.error("Error approving entry:", error);
            alert("Failed to approve entry. Please try again.");
        }
    }

    async rejectEntry(entryId) {
        try {
            console.log(`Rejecting entry: ${entryId}`);
            const entryDoc = doc(this.db, "timeEntries", entryId);
            await updateDoc(entryDoc, { status: "rejected" });
            alert("Entry rejected successfully!");
            await this.fetchEntries(); // Refresh entries
            this.render();
        } catch (error) {
            console.error("Error rejecting entry:", error);
            alert("Failed to reject entry. Please try again.");
        }
    }

    render(container) {
        if (!container) throw new Error("Container element is required.");
        console.log("Rendering Time Entries Table...");

        // Clear existing content
        DOMUtils.removeAllChildren(container);

        // Show loading state
        if (this.isLoading) {
            const loadingMessage = DOMUtils.createElement("p", {
                text: "Loading time entries...",
                className: "loading-message",
            });
            container.appendChild(loadingMessage);
            return;
        }

        // Render table
        const table = DOMUtils.createElement("table", { className: "time-entries-table" });
        container.appendChild(table);

        // Table header
        const thead = DOMUtils.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>Date</th>
                <th>Worker</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(thead);

        // Table body
        const tbody = DOMUtils.createElement("tbody");
        this.entries.forEach((entry) => {
            const row = DOMUtils.createElement("tr");
            row.innerHTML = `
                <td>${DateUtils.formatDate(new Date(entry.date))}</td>
                <td>${entry.workerId}</td>
                <td>${entry.hours}</td>
                <td>${entry.status || "pending"}</td>
            `;

            const actionsCell = DOMUtils.createElement("td");
            const approveButton = DOMUtils.createElement("button", {
                text: "Approve",
                className: "approve-button",
                attributes: { "data-id": entry.id },
            });
            approveButton.addEventListener("click", () => this.approveEntry(entry.id));

            const rejectButton = DOMUtils.createElement("button", {
                text: "Reject",
                className: "reject-button",
                attributes: { "data-id": entry.id },
            });
            rejectButton.addEventListener("click", () => this.rejectEntry(entry.id));

            actionsCell.appendChild(approveButton);
            actionsCell.appendChild(rejectButton);
            row.appendChild(actionsCell);

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Show no data message if necessary
        if (this.entries.length === 0) {
            const noDataMessage = DOMUtils.createElement("p", {
                text: "No time entries found.",
                className: "no-data-message",
            });
            container.appendChild(noDataMessage);
        }
    }
}