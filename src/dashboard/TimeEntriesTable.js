// TimeEntriesTable.js
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { DOMUtils } from "../../../shared/utils/DOMUtils.js";
import { DateUtils } from "../../../shared/utils/DateUtils.js";

export class TimeEntriesTable {
    constructor(db, role, assignedWorkers) {
        this.db = db;
        this.role = role;
        this.assignedWorkers = assignedWorkers;
        this.entries = [];
        this.isLoading = true;
    }

    async loadEntries() {
        try {
            const q = this.role === "manager"
                ? query(collection(this.db, "timeEntries"), where("workerId", "in", this.assignedWorkers))
                : query(collection(this.db, "timeEntries"));

            const snapshot = await getDocs(q);
            this.entries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            this.isLoading = false;
        } catch (error) {
            console.error("Error loading time entries:", error);
            alert("Failed to load time entries.");
        }
    }

    render(container) {
        if (!container) throw new Error("Container element is required.");

        DOMUtils.removeAllChildren(container);

        if (this.isLoading) {
            const loadingMessage = DOMUtils.createElement("p", {
                text: "Loading time entries...",
                className: "loading-message",
            });
            container.appendChild(loadingMessage);
            return;
        }

        const table = DOMUtils.createElement("table", { className: "time-entries-table" });
        container.appendChild(table);

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
            });
            approveButton.addEventListener("click", () => this.approveEntry(entry.id));

            const rejectButton = DOMUtils.createElement("button", {
                text: "Reject",
                className: "reject-button",
            });
            rejectButton.addEventListener("click", () => this.rejectEntry(entry.id));

            actionsCell.appendChild(approveButton);
            actionsCell.appendChild(rejectButton);
            row.appendChild(actionsCell);

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
    }

    async approveEntry(entryId) {
        try {
            await updateDoc(doc(this.db, "timeEntries", entryId), { status: "approved" });
            alert("Entry approved successfully.");
        } catch (error) {
            console.error("Error approving entry:", error);
            alert("Failed to approve entry.");
        }
    }

    async rejectEntry(entryId) {
        try {
            await updateDoc(doc(this.db, "timeEntries", entryId), { status: "rejected" });
            alert("Entry rejected successfully.");
        } catch (error) {
            console.error("Error rejecting entry:", error);
            alert("Failed to reject entry.");
        }
    }
}