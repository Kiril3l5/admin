// InvoiceGenerator.js
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { DateUtils } from "../../shared/utils/DateUtils";
import { DOMUtils } from "../../shared/utils/DOMUtils";

export class InvoiceGenerator {
    constructor(db, companies) {
        if (!db || !Array.isArray(companies)) {
            throw new Error("Firestore instance and companies list are required.");
        }

        this.db = db;
        this.companies = companies;
        this.generatedInvoices = [];
    }

    async fetchApprovedEntries(companyId, startDate, endDate) {
        console.log("Fetching approved time entries for invoicing...");
        const q = query(
            collection(this.db, "timeEntries"),
            where("companyId", "==", companyId),
            where("status", "==", "approved"),
            where("date", ">=", DateUtils.normalizeDate(startDate).toISOString()),
            where("date", "<=", DateUtils.normalizeDate(endDate).toISOString())
        );

        try {
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => doc.data());
        } catch (error) {
            console.error("Error fetching approved entries:", error);
            alert("Failed to fetch approved entries. Please try again.");
            return [];
        }
    }

    async generateInvoice(companyId, companyName, startDate, endDate) {
        console.log("Generating invoice for company:", companyName);

        try {
            const approvedEntries = await this.fetchApprovedEntries(companyId, startDate, endDate);
            if (approvedEntries.length === 0) {
                alert("No approved time entries found for the selected period.");
                return;
            }

            const totalHours = approvedEntries.reduce((sum, entry) => sum + entry.hours, 0);
            const invoiceData = {
                companyId,
                companyName,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                totalHours,
                generatedAt: serverTimestamp(),
            };

            const invoiceRef = await addDoc(collection(this.db, "invoices"), invoiceData);
            this.generatedInvoices.push({ ...invoiceData, id: invoiceRef.id });

            console.log("Invoice generated successfully:", invoiceData);
            alert(`Invoice generated for ${companyName}: ${totalHours} hours.`);

            this.renderInvoicesList(); // Update UI
        } catch (error) {
            console.error("Error generating invoice:", error);
            alert("Failed to generate invoice. Please try again.");
        }
    }

    render(container) {
        if (!container) throw new Error("Container element is required.");
        console.log("Rendering Invoice Generator...");

        // Clear container
        DOMUtils.removeAllChildren(container);

        // Form for generating invoices
        const form = DOMUtils.createElement("form", { className: "invoice-form" });
        container.appendChild(form);

        // Company selector
        const companySelect = DOMUtils.createElement("select", { className: "company-select" });
        this.companies.forEach((company) => {
            const option = DOMUtils.createElement("option", {
                text: company.name,
                attributes: { value: company.id },
            });
            companySelect.appendChild(option);
        });
        form.appendChild(companySelect);

        // Date pickers
        const startDateInput = DOMUtils.createElement("input", {
            attributes: { type: "date", id: "startDate" },
        });
        form.appendChild(startDateInput);

        const endDateInput = DOMUtils.createElement("input", {
            attributes: { type: "date", id: "endDate" },
        });
        form.appendChild(endDateInput);

        // Generate button
        const generateButton = DOMUtils.createElement("button", {
            text: "Generate Invoice",
            attributes: { type: "submit" },
        });
        form.appendChild(generateButton);

        // Invoices list section
        const invoicesList = DOMUtils.createElement("div", { className: "invoices-list" });
        container.appendChild(invoicesList);

        // Form submission event
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const companyId = companySelect.value;
            const companyName = this.companies.find((c) => c.id === companyId)?.name;
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);

            if (!companyId || isNaN(startDate) || isNaN(endDate)) {
                alert("Please select a company and valid date range.");
                return;
            }

            await this.generateInvoice(companyId, companyName, startDate, endDate);
        });

        // Initial rendering of invoices list
        this.renderInvoicesList(invoicesList);
    }

    renderInvoicesList(container) {
        console.log("Rendering invoices list...");
        DOMUtils.removeAllChildren(container);

        if (this.generatedInvoices.length === 0) {
            container.appendChild(
                DOMUtils.createElement("p", { text: "No invoices generated yet.", className: "no-invoices-message" })
            );
            return;
        }

        const list = DOMUtils.createElement("ul", { className: "invoices-list-items" });
        this.generatedInvoices.forEach((invoice) => {
            const listItem = DOMUtils.createElement("li", {
                text: `${invoice.companyName}: ${invoice.totalHours} hours (${invoice.startDate} - ${invoice.endDate})`,
            });
            list.appendChild(listItem);
        });
        container.appendChild(list);
    }
}