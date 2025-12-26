import { Invoice } from "@/models/invoice";

export default function InvoicePrint({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.items.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0
  );

  const tax = (subtotal * invoice.taxRate) / 100;
  const total =
    subtotal + tax + invoice.dispensingFee - invoice.discount;

  return (
    <div id="invoice-print" className="bg-white p-6 border print:border-none">
      <header className="mb-6">
        <h2 className="text-xl font-bold">My Pharmacy</h2>
        <p className="text-sm">123 Health St, City</p>
      </header>

      <section className="mb-6">
        <p><strong>Invoice:</strong> {invoice.invoiceNo}</p>
        <p><strong>Date:</strong> {invoice.issuedAt.split("T")[0]}</p>
        <p><strong>Customer:</strong> {invoice.customerName}</p>
        <p><strong>Pharmacist:</strong> {invoice.pharmacistName}</p>
      </section>

      <table className="w-full text-sm border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Item</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2 text-center">{item.quantity}</td>
              <td className="border p-2 text-right">${item.unitPrice.toFixed(2)}</td>
              <td className="border p-2 text-right">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right space-y-1">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Dispensing Fee: ${invoice.dispensingFee.toFixed(2)}</p>
        <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
